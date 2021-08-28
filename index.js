function display(idOne, idTwo, styleOne, styleTwo) {
  $(idOne).css("display", styleOne);
  $(idTwo).css("display", styleTwo);
}

function showDocumentation() {
  display("#artwork", "#documentation", "none", "flex");
}

function showArt() {
  display("#artwork", "#documentation", "block", "none");
}

function changeSpeed(value) {
  const bladeStyles = getComputedStyle($("#blades")[0]);
  const currentDuration = convertTimeToNumber(bladeStyles.animationDuration);

  if (currentDuration + value < 1) {
    $(".controller-buttons").children().last().css("background-color", "red");
    return;
  } else if (currentDuration + value > 10) {
    $(".controller-buttons").children().first().css("background-color", "red");
    return;
  } else {
    $(".controller-buttons").children().first().removeAttr("style");
    $(".controller-buttons").children().last().removeAttr("style");
  }
  const newDuration = currentDuration + value;

  $("#blades").css("animation-duration", `${newDuration}s`);
  $("#currentSpeed").html(`${newDuration}`);
}

function convertTimeToNumber(string) {
  console.log(Number.parseInt(string.split("s")[0]));
  return Number.parseInt(string.split("s")[0]);
}

let isSVG = true;
function swapArt() {
  if (isSVG) {
    display("#SVG-WindMill", "#canvas", "none", "block");
  } else {
    display("#SVG-WindMill", "#canvas", "block", "none");
  }
  isSVG = !isSVG;
}

(function drawWindMill() {
  const canvas = $("#canvas")[0];
  // canvas.width = window.innerWidth;
  // canvas.height = 200;
  const ctx = canvas.getContext("2d");
  drawCircle(ctx, canvas.width / 2, 50, 5, 2, "black");
})();

function drawCircle(ctx, x1, y1, radius, arc, color) {
  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, arc * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
