var totalOptions = 4;
var showingOptions = true;

var movingElements = [
  {
    selector: ".notes",
    start: 0,
    end: 1,
    from: 'left',
    startMove: .33,
    endMove: .66,
    classes: ['notes', 'notes moving']
  },
  {
    selector: "#move1",
    start: 0.8,
    end: 1,
    from: 'right',
    startMove: .66,
    endMove: 1,
    classes: /* don't mind me, I'm just an */ ['unimportant moving_img', 'unimportant moving_img']
  },
  {
    selector: "#move2",
    start: 0.75,
    end: 1,
    from: 'right',
    startMove: .66,
    endMove: 1,
    classes: ['unimportant moving_img', 'unimportant moving_img']
  }
];
window.onload = function () {
  document.getElementById("content").onscroll = function () {
    var navbar = document.getElementById("navbar");
    var content = document.getElementById("content");
    if (content.scrollTop != 0 || document.body.classList[0] == "toosmall" || document.body.classList[0] == "waytoosmall") {
      navbar.classList = 'navbar scrolled';
    } else {
      navbar.classList = "navbar";
    }

    moveMovingElements();
  }

  window.onresize = function () {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log("resized: w=" + window.innerWidth + ' h='+ window.innerHeight);
    if (.7*width < 128 * (totalOptions + 1)) {
      document.body.classList = "toosmall";
      document.getElementById("navbar").classList = 'navbar scrolled';
      if (width < 600) {
        document.body.classList = "waytoosmall toosmall"
      }
    } else {
      if (document.body.classList[0]) {
        moveMovingElements();
      }
      document.body.classList = "";
      document.getElementById("content").onscroll(); // reset navbar classes
    }
    if (.7 * width < (totalOptions + 1) * 128) {
      if (showingOptions) {
        showingOptions = false;
        for (var i = 1; i <= totalOptions; i++) {
          document.getElementById("options_toosmall").appendChild(document.getElementById("option"+i));
        }
      }
    } else {
      if (!showingOptions) {
        showingOptions = true;
        for (var i = 1; i <= totalOptions; i++) {
          document.getElementById("options").insertBefore(document.getElementById("option"+i), document.getElementById("options_end"));
        }
      }
    }
  }
  window.onresize();
}

function toggleMenu() {
  if (!showingOptions && Array.from(document.getElementById("options_end").classList).indexOf("open") == -1) {
    document.getElementById("options_end").classList = "navbar_option_container open";
    document.body.style.marginRight = "15em";
    document.body.style.marginLeft = "-15em";
  } else {
    document.getElementById("options_end").classList = "navbar_option_container";
    document.body.style.marginRight = "0em";
    document.body.style.marginLeft = "0em";
  }
}

function moveMovingElements() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  movingElements.forEach(function(data) {
    var startMove = data.startMove * height;
    var endMove = data.endMove * height;
    var start = data.start * width;
    var end = data.end * width;
    var elements = document.querySelectorAll(data.selector);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var pos = element.getBoundingClientRect()["top"];
      if (pos <= endMove && pos >= startMove) {
        element.style[data.from] = start + (pos - startMove) * ((end - start) / (endMove - startMove)) + "px";
        element.classList = data.classes[0];
      } else {
        if (pos >= endMove) {
          element.style[data.from] = end + 'px';
          element.classList = data.classes[0];
        } else {
          element.style[data.from] = start + 'px';
          element.classList = data.classes[1];
        }
      }
    }
  });
}