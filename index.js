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

  drawWindMill(-value);
}

function convertTimeToNumber(string) {
  console.log(Number.parseInt(string.split("s")[0]));
  return Number.parseInt(string.split("s")[0]);
}

let isSVG = true;
function swapArt() {
  if (isSVG) {
    display("#SVG-WindMill", "#canvas", "none", "block");
    $("#currentArtHeader").html("Canvas-WindMill Mk 1");
    $("#currentArt").html("svg");
    const bladeStyles = getComputedStyle($("#blades")[0]);
    const currentDuration = convertTimeToNumber(bladeStyles.animationDuration);
    currentSpeed = 0.25 * currentDuration;
    drawWindMill(1);
  } else {
    display("#SVG-WindMill", "#canvas", "block", "none");
    $("#currentArtHeader").html("SVG-WindMill Mk 1");
    $("#currentArt").html("canvas");
  }
  isSVG = !isSVG;
}

let currentSpeed = 1;
function drawWindMill(speed) {
  const canvas = $("#canvas")[0];
  const ctx = canvas.getContext("2d");
  currentSpeed += 0.25 * speed;
  animateWindMill(ctx, canvas, 1, currentSpeed);
}

function animateWindMill(ctx, canvas, angle, speed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.lineWidth = 3.25;

  const toRad = (num) => (num * Math.PI) / 180;

  const x1 = Math.cos(toRad(angle));
  const y1 = Math.sin(toRad(angle));

  const x2 = Math.cos(toRad(angle + 50));
  const y2 = Math.sin(toRad(angle + 50));

  const x3 = Math.cos(toRad(angle + 120));
  const y3 = Math.sin(toRad(angle + 120));

  ctx.lineWidth = 3.25;
  // Draw blades
  drawLine(ctx, 10 * x1, 10 * y1, 50 * x1, 50 * y1, "black");
  drawLine(ctx, -10 * x2, -10 * y2, -50 * x2, -50 * y2, "black");
  drawLine(ctx, 10 * x3, 10 * y3, 50 * x3, 50 * y3, "black");
  //draw center
  drawCircle(ctx, 0, 0, 5, "black");
  // Draw base
  drawLine(ctx, 0, 10, 0, 100, "#C4C4C4");

  drawTriangle(ctx, 0, 60, "#C4C4C4");

  ctx.restore();

  window.requestAnimationFrame(() => {
    animateWindMill(ctx, canvas, (angle + 0.5 * speed) % 360, speed);
  });
}
function drawCircle(ctx, x1, y1, radius, color) {
  ctx.beginPath();
  ctx.translate(0.5, 0.5);
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawLine(ctx, x1, y1, x2, y2, color) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}

function drawTriangle(ctx, x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x, y);
  ctx.lineTo(17.5 + x, 15 + y);
  ctx.lineTo(-17.5 + x, 15 + y);
  ctx.fill();
  ctx.closePath();
}
