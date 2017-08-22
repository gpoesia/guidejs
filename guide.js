var __guidejsGuide = [];
var __guidejsStep = null;
var __guidejsGuideId = null;

function guidejsBeginGuide(id) {
  __guidejsGuide = [];

  for (var i = 0; ; i++) {
    var tooltipElements = document.getElementsByClassName("guidejs-" + id + "-step" + i + "-tooltip");

    if (tooltipElements.length == 0) {
      break;
    }

    if (tooltipElements.length > 1) {
      console.error("guidejs: guide " + id + " step " + i + " must have exactly one tooltip.");
      return;
    }

    var stepElements = document.getElementsByClassName("guidejs-" + id + "-step" + i);
    __guidejsGuide.push([stepElements, tooltipElements[0]]);
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
    var elements = __guidejsGuide[i][0];
    for (var j = 0; j < elements.length; j++) {
      elements[j].classList.remove("guidejs-highlighted-element");
    }
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
    var prevElements = __guidejsGuide[__guidejsStep][0];
    var prevTooltip = __guidejsGuide[__guidejsStep][1];

    for (var i = 0; i < prevElements.length; i++) {
      prevElements[i].classList.remove("guidejs-highlighted-element");
    }

    prevTooltip.classList.remove("guidejs-highlighted-tooltip");
    prevTooltip.classList.add("guidejs-tooltip");
    bg.style = "";
  }

  __guidejsStep += 1;

  if (__guidejsStep == __guidejsGuide.length) {
    return guidejsFinish();
  }

  var elements = __guidejsGuide[__guidejsStep][0];
  var reference = elements.length == 1 ? elements[0] : null;

  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("guidejs-" + __guidejsGuideId + "-step" + __guidejsStep + "-reference")) {
      reference = elements[i];
    }
    elements[i].classList.add("guidejs-highlighted-element");
  }

  var tooltip = __guidejsGuide[__guidejsStep][1];

  // Show tooltip
  tooltip.classList.remove("guidejs-tooltip");
  tooltip.classList.add("guidejs-highlighted-tooltip");

  // Position tooltip.
  if (!!reference) {

    // Position background
    bg.className = "guidejs-on";
    bg.style = ("left: "   + (reference.offsetLeft - 10)   + "px;" +
                "top: "    + (reference.offsetTop - 10)    + "px;" +
                "width: "  + (reference.offsetWidth + 20) + "px;" +
                "height: " + (reference.offsetHeight + 20) + "px;");

    if (tooltip.getAttribute("guidejs-position") == "above") {
      tooltip.style = ("left: " + reference.offsetLeft + "px;" +
                       "top: " + (reference.offsetTop -
                                  tooltip.offsetHeight - 10) + "px;");
    } else {
      tooltip.style = ("left: " + reference.offsetLeft + "px;" +
                       "top: " + (reference.offsetTop +
                                  reference.offsetHeight + 10) + "px;");
    }
  } else {
    tooltip.style = ("left: " + (0.5 * (document.body.offsetWidth - tooltip.offsetWidth)  + "px;") +
                     "top: " + (0.5 * (document.body.offsetHeight - tooltip.offsetHeight) + "px;"));
  }
}
