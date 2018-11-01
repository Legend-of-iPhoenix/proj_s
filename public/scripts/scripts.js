var optionsShown = 4;
var totalOptions = 4;

var movingElements = [
  {
    element: "#notes",
    startX: 0,
    endX: 1,
    from: 'left',
    startMove: .33,
    endMove: .66,
    classes: ['notes', 'notes moving']
  },
  {
    element: "#move1",
    startX: 0.8,
    endX: 1,
    from: 'right',
    startMove: .66,
    endMove: 1,
    classes: /* don't mind me, I'm just an */ ['unimportant moving_img', 'unimportant moving_img']
  },
  {
    element: "#move2",
    startX: 0.75,
    endX: 1,
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

    var height = window.innerHeight;
    var width = window.innerWidth;
    movingElements.forEach(function(data) {
      var startMove = data.startMove * height;
      var endMove = data.endMove * height;
      var startX = data.startX * width;
      var endX = data.endX * width;
      var element = document.querySelector(data.element);
      var pos = element.getBoundingClientRect()["top"];
      if (pos <= endMove && pos >= startMove) {
        element.style[data.from] = startX + (pos - startMove) * ((endX - startX) / (endMove - startMove)) + "px";
        element.classList = data.classes[0];
      } else {
        if (pos >= endMove) {
          element.style[data.from] = endX + 'px';
          element.classList = data.classes[0];
        } else {
          element.style[data.from] = startX + 'px';
          element.classList = data.classes[1];
        }
      }
    });
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
        var height = window.innerHeight;
        var width = window.innerWidth;
        movingElements.forEach(function(data) {
          var startMove = data.startMove * height;
          var endMove = data.endMove * height;
          var startX = data.startX * width;
          var endX = data.endX * width;
          var element = document.querySelector(data.element);
          var pos = element.getBoundingClientRect()["top"];
          if (pos <= endMove && pos >= startMove) {
            element.style[data.from] = startX + (pos - startMove) * ((endX - startX) / (endMove - startMove)) + "px";
            element.classList = data.classes[0];
          } else {
            if (pos >= endMove) {
              element.style[data.from] = endX + 'px';
              element.classList = data.classes[0];
            } else {
              element.style[data.from] = startX + 'px';
              element.classList = data.classes[1];
            }
          }
        });
      }
      document.body.classList = "";
      document.getElementById("content").onscroll(); // reset navbar classes
    }
    if (1 + Math.min(totalOptions, Math.max(Math.floor(.7*width/128) - 1, 0)) != optionsShown) {
      optionsShown = 1 + Math.min(totalOptions, Math.max(Math.floor(.7*width/128) - 1, 0));
      for (var i = 1; i <= totalOptions; i++) {
        document.getElementById("options").insertBefore(document.getElementById("option"+i), document.getElementById("options_end"));
      }
      if (optionsShown != totalOptions) {
        for (var i = optionsShown; i <= totalOptions; i++) {
          document.getElementById("options_toosmall").appendChild(document.getElementById("option"+i));
        }
      }
    }
  }
  window.onresize();
}