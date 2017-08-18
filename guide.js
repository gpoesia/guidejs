var __guidejsGuide = [];
var __guidejsStep = null;
var __guidejsGuideId = null;

function guidejsBeginGuide(id) {
  __guidejsGuide = [];

  for (var i = 0; ; i++) {
    var stepElements = document.getElementsByClassName("guidejs-" + id + "-step" + i);
    if (stepElements.length == 0) {
      break;
    }
    var tooltipElements = document.getElementsByClassName("guidejs-" + id + "-step" + i + "-tooltip");
    if (stepElements.length != 1 || tooltipElements.length != 1) {
      console.error("guidejs: guide " + id + " step " + i + " must have exactly one element and tooltip.");
      return;
    }
    __guidejsGuide.push([stepElements[0], tooltipElements[0]]);
  }

  if (__guidejsGuide.length == 0) {
    console.error("guidejs: empty guide " + id);
    return;
  }

  document.getElementById("guidejs-overlay").className = "guidejs-on";

  __guidejsStep = -1;
  __guidejsGuideId = id;
  guidejsAdvance();
}

function guidejsFinish() {
  var bg = document.getElementById("guidejs-bg");
  bg.style = "";
  bg.className = "";

  document.getElementById("guidejs-overlay").className = "";

  for (var i = 0; i < __guidejsGuide.length; i++) {
    __guidejsGuide[i][0].classList.remove("guidejs-highlighted-element");
    __guidejsGuide[i][1].classList.remove("guidejs-highlighted-tooltip");
    __guidejsGuide[i][1].classList.add("guidejs-tooltip");
  }

  __guidejsGuideId = null;
  __guidejsGuide = [];
}

function guidejsAdvance() {
  if (__guidejsGuideId == null) {
    return;
  }

  var bg = document.getElementById("guidejs-bg");

  if (__guidejsStep != -1) {
    var prevElement = __guidejsGuide[__guidejsStep][0];
    var prevTooltip = __guidejsGuide[__guidejsStep][1];

    prevElement.classList.remove("guidejs-highlighted-element");
    prevTooltip.classList.remove("guidejs-highlighted-tooltip");
    prevTooltip.classList.add("guidejs-tooltip");
    bg.style = "";
  }

  __guidejsStep += 1;

  if (__guidejsStep == __guidejsGuide.length) {
    return guidejsFinish();
  }

  var element = __guidejsGuide[__guidejsStep][0];
  var tooltip = __guidejsGuide[__guidejsStep][1];

  element.classList.add("guidejs-highlighted-element");

  // Position background
  bg.className = "guidejs-on";
  bg.style = ("left: "   + (element.offsetLeft - 10)   + "px;" +
              "top: "    + (element.offsetTop - 10)    + "px;" +
              "width: "  + (element.offsetWidth + 20) + "px;" +
              "height: " + (element.offsetHeight + 20) + "px;");

  // Position tooltip.
  tooltip.classList.remove("guidejs-tooltip");
  tooltip.classList.add("guidejs-highlighted-tooltip");

  if (tooltip.getAttribute("guidejs-position") == "above") {
    tooltip.style = ("left: " + element.offsetLeft + "px;" +
                     "top: " + (element.offsetTop -
                                tooltip.offsetHeight - 10) + "px;");
  } else {
    tooltip.style = ("left: " + element.offsetLeft + "px;" +
                     "top: " + (element.offsetTop +
                                element.offsetHeight + 10) + "px;");
  }
}
