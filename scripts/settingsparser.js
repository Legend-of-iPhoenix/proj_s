const PRODUCTION = false;

var data = {};

var settings = {};

var menuHTML = "";
var contentHTML = "";

var first = true;
var first_first = true;
var _;

function load() {
	var file = document.getElementById('importJSON').files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		try {
			settings = JSON.parse(event.target.result);
			document.getElementById('editor').style.display = "block";
			document.getElementById('import').style.display = "none";
			parse(settings);
		} catch (e) {
			alert("Improperly formatted JSON file.");
		}
	}
	reader.readAsText(file);
}

function parse(jsonData) {
	var resultHTML = document.getElementById("html_result");
	var resultJSON = document.getElementById("json_result");
	resultJSON.value = JSON.stringify(settings);
	document.getElementById("icon").value = jsonData.logosrc;
	document.getElementById("title").value = jsonData.title;

	if (first) {
		document.getElementById("menu").innerHTML = "";
		document.getElementById("pages").innerHTML = "";
		first_first = true;
	}

	function parseMenuItem(data, index, n) {
		if (data.hasChildren) {
			if (first) {
				if (first_first && n) {
					first_first = false;
					document.getElementById("menu").innerHTML += "<p> More... </p>";
				}
				var _c = n ? 40 : 20;
				var path = 'menu/' + index + '/'
				document.getElementById("menu").innerHTML += '<p style="margin-left: ' + (_c-20) + 'px;"><input name="' + path + 'text" placeholder="text" value="' + data.text + '" oninput="input(this)"><input type="button" class="toggle" onclick="toggleChildren('+index+','+(n?_:false)+',this)" value="Submenu"></p>'
				document.getElementById("menu").innerHTML += data.children.map((c, i, a) => {
					if (n) {
						var path = 'menu/' + _ + '/children/' + index + '/children/' + i + '/';
					} else {
						var path = 'menu/' + index + '/children/' + i + '/';
					}
					return '<p style="margin-left: ' + _c + 'px"><input name="' + path + 'href" placeholder="link" value="' + c.href + '" oninput="input(this)"><input name="' + path + 'text" placeholder="text" value="' + c.text + '" oninput="input(this)"><input type="button" class="delete" onclick="deleteChild('+index+','+i+','+(n?_:false)+')" value="-">' + (i==a.length-1 ? '<input type="button" class="new" onclick="addMenuItem('+index+','+(n?_:false)+')" value="+">' : '') + '</p>'
				}).join('\n');

			}

			var childrenHTML = data.children.map(child => '<p><a href="' + child.href + '">' + cleanse(child.text) + '</a></p>').join('\n');
			var optionHTML = '<span class="navbar_option_container" id="' + data.id + '">\n<p class="option_text_navbar">' + cleanse(data.text) + '</p>\n<span id="' + data.id + '_menu" class="navbar_menu">\n' + childrenHTML + '\n</span>\n<p class="option_text_collapsed">' + cleanse(data.text) + '</p>\n</span>';
			return optionHTML;
		} else {
			if (first) {
				var path = 'menu/' + index + '/'
				document.getElementById("menu").innerHTML += '<p><input name="' + path + 'href" placeholder="link" value="' + data.href + '" oninput="input(this)"><input name="' + path + 'text" placeholder="text" value="' + data.text + '" oninput="input(this)"><input type="button" class="toggle" onclick="toggleChildren('+index+','+(n?_:false)+',this)" value="Link"></p>'
			}
			return '<p id="' + data.id + '"><a href="' + data.href + '">' + cleanse(data.text) + '</a></p>'
		}
	}

	options = '<div id="options">\n<span id="spacer"></span>\n' + jsonData.menu.map((data, index) => {
		if (data.isEnd) {
			_ = index;
			return '<span class="navbar_option_container" id="options_end">\n<span id="dragons"><p> Here be Dragons. </p></span>\n<a href="javascript:void(0);" onclick="toggleMenu()" id="navbar_menu_text"> More... </a>\n<span id="options_end_menu" class="navbar_menu">\n<span id="options_toosmall"></span>' + data.children.map(parseMenuItem).join('\n') + '\n</span>\n</span>'
		} else {
			return parseMenuItem(data, index, false)
		}
	}).join('\n') + '\n</div>';
	menuHTML = '<nav id="navbar">\n<div id="logo_container">\n<img src="' + jsonData.logosrc + '" class="logo" id="navbar_logo">\n</div>\n' + options + '\n</nav>'
	contentHTML = '<div id="content">\n' + jsonData.pages.map((page, pageindex) => {
		var styleData = styles[page.style];

		var pageHTML = '<div class="' + styleData.classes + '" id="page' + (pageindex + 1) + '">\n';
		var template = styleData.template;
		var editingHTML = ''
		if (first) {
			document.getElementById("pages").innerHTML += '<br />\n<input type="button" class="delete" onclick="deletepage(' + pageindex + ')" value="x" title="Delete this page"><h3 class="pagetitle"> page' + (pageindex + 1) + " (" + page.style + ')</h3>\n<h4>Page information:</h4>\n<ul>' + styles[page.style].type.split(' ').map(type=>identifiers2[type]).join('\n') + "</ul>\n<h4>Images:</h4>"
		}
		page.imgs.map((img, index) => {
			if (first) {
				document.getElementById("pages").innerHTML += "<p>Image URL " + (index + 1) + ': <input type="text" name="pages/' + pageindex + '/imgs/' + index + '" value="' + img + '"></p>'
			}
			template = template.replace("@" + (index + 1), img);
		});
		if (first) {
			document.getElementById("pages").innerHTML += "<h4>Text:</h4>"
		}
		page.text.map((text, index) => {
			if (first) {
				if (text[1] === "heading") {
					document.getElementById("pages").innerHTML += '<p>Heading: <input type="text" value="' + text[0] + '" name="pages/' + pageindex + '/text/' + index + '/0" oninput="input(this)"></p>'
				} else {
					document.getElementById("pages").innerHTML += '<textarea name="pages/' + pageindex + '/text/' + index + '/0" onkeydown="input(this)">' + text[0] + '</textarea>'
				}
			}
			template = template.replace("|" + (index + 1), text[0]);
		});
		pageHTML += template + '\n</div>';
		return pageHTML;
	}).join('\n<div class="notes"></div>\n') + '\n' + footerData + '\n</div>'
	if (first) {
		var types = {};
		Object.keys(styles).map(key => {
			var data = styles[key].type;
			data.split(' ').map(type => {
				if (types[type]) {
					types[type].push(key)
				} else {
					types[type] = [key];
				}
			});
		});

		var newpageHTML = '<h2> Add page: </h2>\n<select id="newpage">\n' + Object.keys(types).map(type =>'<optgroup label="' + identifiers[type] + '">\n' + types[type].map(page => "<option>" + page + "</option>").join('\n') + '\n</optgroup>').join('\n') + '</select>\n<input type="button" class="new" onclick="newpage()" value="+">';
		document.getElementById("pages").innerHTML += '<hr>\n'+newpageHTML;
	}

	resultHTML.value = ('<!DOCTYPE html>\n<html>\n<head>\n<title>' + jsonData.title + '</title>\n<meta charset="utf-8">\n<link rel=stylesheet href="styles/styles.css">\n<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">\n<script type="text/javascript" src="scripts/scripts.js"></script>\n</head>\n<body id="body">\n' + menuHTML + '\n' + contentHTML + '</body></html>').replace(/\n/g,PRODUCTION?'':'\n');
	first = false;
}

var styles = {
	"left_1": {
		"type": "pagefull pageleft",
		"classes": "page",
		"template": '<h1 class="left">|1</h1>\n<div class="text left">\n|2\n</div>\n<img class="right" src="@1">',
		"text": ["heading", "text"]
	},
	"right_2": {
		"type": "pagesmall pageright",
		"classes": "page pagesmall",
		"template": '<div class="text right">\n<h1 class="right">|1</h1>\n|2\n</div>\n<img src="@1" class="move1 unimportant">\n<img src="@2" class="move2 unimportant">',
		"text": ["heading", "text"]
	},
	"right_parallax": {
		"type": "pagesmall pageright",
		"classes": "page pagesmall",
		"template": '<div class="text full">\n<div class="center_right">\n<h1 class="right">|1</h1>\n|2\n</div>\n<div class="unimportant parallaxContainer">\n<img class="parallaxLayer parallaxLayer1" src="@1">\n<img class="parallaxLayer parallaxLayer2" src="@2">\n<img class="parallaxLayer parallaxLayer3" src="@3">\n</div>\n</div>',
		"text": ["heading", "text"]
	},
	"blank_small": {
		"type": "pagesmall pageblank",
		"classes": "page pagesmall",
		"template": '',
		"text": []
	},
	"blank": {
		"type": "pagefull pageblank",
		"classes": "page",
		"template": '',
		"text": []
	}
}

var identifiers = {
	"pagefull": "Full Pages",
	"pagesmall": "Small Pages",
	"pageblank": "Blank Pages",
	"pageleft": "Text on the Left",
	"pageright": "Text on the Right"
}

var identifiers2 = {
	"pagefull": '<li title="Page takes up all of the screen">Full page</li>',
	"pagesmall": '<li title="Page only takes up about two thirds of the screen">Small page</li>',
	"pageblank": '<li title="Page does not contain any images or text">Blank</li>',
	"pageleft": '<li title="The text on this page is on the left side of the screen">Text on the left</li>',
	"pageright": '<li title="The text on this page is on the right side of the screen">Text on the right</li>'
}

function newpage() {
	var type = document.getElementById("newpage").value;
	var template = styles[type].template;
	var text = template.match(/\|\d+/g) ? new Array(template.match(/\|\d+/g).length).fill('text').map((text, index) => [text + (index + 1), styles[type].text[index]]) : [];
	var imgs = template.match(/\@\d+/g) ? new Array(template.match(/\@\d+/g).length).fill('https://dummyimage.com/128x128/ffffff/000000.png&text=img').map((url, index) => url + (index + 1)) : [];


	settings.pages.push({
		"style": type,
		"text": text,
		"imgs": imgs
	});

	first = true;
	parse(settings);
}

function deletepage(pageID) {
	settings.pages.splice(pageID, 1);

	first = true;
	parse(settings);
}

function input(target) {
	setDescendantProp(settings, target.name, target.value)
	parse(settings);
}

function setDescendantProp(obj, desc, value) {
	var arr = desc.split('/');
	while (arr.length > 1) {
		obj = obj[arr.shift()];
	}
	return obj[arr[0]] = cleanse2(value);
}

var footerData = '<div id="footer">\n<span id="footerLeft">\n<p> Site &copy; _iPhoenix_ </p>\n<p> Icons by <a target="_blank" href="https://octicons.github.com/">Github Octicons</a>.</p>\n</span>\n<span id="footerRight">\n<span id="links"><a id="github" target="_blank" href="https://github.com/Legend-of-iPhoenix"><svg class="octicon octicon-mark-github" viewBox="-4 -4 24 24" version="1.1" aria-hidden="true"><path fill-rule="evenodd" fill="#000" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a><a id="website" target="_blank" href="https://legend-of-iphoenix.github.io"><svg class="octicon octicon-link" viewBox="-4 -4 24 24" fill="#000" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a></span>\n</span>\n</div>\n</div>'

function cleanse(text) {
	var element = document.createElement('p');
	element.innerText = text;
	return element.innerHTML
}

function cleanse2(text) {
	return text.replace(/"/g, '\\"').replace(/'/g, "\\'");
}

function addMenuItem(index, n) {
	if (n === false) {
		settings.menu[index].children.push({
			"text": "text",
			"href": "#nowhere"
		});
	} else {
		settings.menu[n].children[index].children.push({
			"text": "text",
			"href": "#nowhere"
		});
	}
	first = true;
	parse(settings);
}

function deleteChild(index, index2, n) { // this is a legal abortion, I assure you.
	if (n === false) {
		settings.menu[index].children.splice(index2, 1);
	} else {
		settings.menu[n].children[index].children.splice(index2, 1);
	}
	first = true;
	parse(settings);
}

function toggleChildren(index, n) {
	if (n === false) {
		settings.menu[index].hasChildren = !settings.menu[index].hasChildren;
		this.value = settings.menu[index].hasChildren ? 'Submenu' : 'Link';
		if (!settings.menu[index].href && !settings.menu[index].hasChildren) {
			settings.menu[index].href = "#page"
		}
		if (!settings.menu[index].children && settings.menu[index].hasChildren) {
			settings.menu[index].children = [{
				"text": "text",
				"href": "#page"
			}]
		}
	} else {
		settings.menu[n].children[index].hasChildren = !settings.menu[n].children[index].hasChildren;
		this.value = settings.menu[n].children[index].hasChildren ? 'Submenu' : 'Link';
		if (!settings.menu[n].children[index].href && !settings.menu[n].children[index].hasChildren) {
			settings.menu[n].children[index].href = "#page"
		}
		if (!settings.menu[n].children[index].children && settings.menu[index].hasChildren) {
			settings.menu[n].children[index].children = [{
				"text": "text",
				"href": "#page"
			}]
		}
	}
	first = true;
	parse(settings);
}

function downloadJSON() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(settings)));
  element.setAttribute('download', 'settings');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}