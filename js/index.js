var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var WIDTH = document.body.clientWidth * 0.75,
    HEIGHT = 500;
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
canvas.style.width = WIDTH + "px";
canvas.style.Height = HEIGHT + "px";

function drawLine(ctx, x, y, s, t) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(s, t);
    ctx.stroke();
}

function mousePosition(ev) {
    var ev = event || window.event;
    return { x: ev.clientX, y: ev.clientY };
}
window.onresize = function() {
    var WIDTH = document.body.clientWidth * 0.75;
    canvas.setAttribute("width", WIDTH);
    canvas.style.width = WIDTH + "px";
}
window.onload = function() {
    context.lineWidth = 1;
    context.fillStyle = "black";
    context.strokeStyle = "black";
    var left = canvas.offsetLeft;
    var top = canvas.offsetTop;
    var flag = 0;
    var x, y, s, t;
    canvas.onmousedown = function(event) {
        flag = 1;
        x = mousePosition(event).x - left;
        y = mousePosition(event).y - top + 32;
    }
    canvas.onmousemove = function(event) {
        if (flag) {
            s = mousePosition(event).x - left;
            t = mousePosition(event).y - top + 32;
            console.log(x, y, s, t)
            drawLine(context, x, y, s, t);
            x = s;
            y = t;
        }
    }
    canvas.onmouseup = function() {
        flag = 0;
    }
}