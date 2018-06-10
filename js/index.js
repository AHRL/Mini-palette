var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var WIDTH = document.body.clientWidth * 0.75,
    HEIGHT = 500;
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
canvas.style.width = WIDTH + "px";
canvas.style.Height = HEIGHT + "px";
var r = 1;
var timer = null;

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
//画圆
function drawCircle(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill(); //画实心圆
    ctx.closePath();
}
//获取随机数
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//获取圆内的点
function getPoint(x, y, r) {
    var pointX = x + randomNum(-r, r);
    var pointY = y + randomNum(-r, r);
    return Math.sqrt(Math.pow(pointX - x, 2) + Math.pow(pointY - y, 2)) <= r ? { x: pointX, y: pointY } : getPoint(x, y, r);
}
window.onload = function() {
    context.lineWidth = 1;
    context.fillStyle = "black";
    context.strokeStyle = "black";
    var left = canvas.offsetLeft;
    var top = canvas.offsetTop;
    var flag = 0;
    var x, y, s, t;
    canvas.addEventListener('mousedown', function(event) {
        flag = 1;
        x = mousePosition(event).x - left;
        y = mousePosition(event).y - top + 32 + document.documentElement.scrollTop;
        switch (curStyle) {
            case 'dye':
                console.log('a')
                    // clearInterval(timer)
                timer = setInterval(function() {
                    var point = getPoint(x, y, 10);
                    drawCircle(context, point.x, point.y)
                    console.log('a')
                }, 0)
                break;
            case 'circle':
                break;
            case 'rectangle':
                break;
            case 'square':
                break;
            case 'cancel':
                context.clearRect(x, y - eraserSize, eraserSize, eraserSize)
                break;
            default:
                break;
        }
    }, false)
    canvas.addEventListener('mousemove', function(event) {
        if (flag) {
            s = mousePosition(event).x - left;
            t = mousePosition(event).y - top + 32 + document.documentElement.scrollTop;
            switch (curStyle) {
                case 'pencil':
                    drawLine(context, x, y, s, t);
                    x = s;
                    y = t;
                    break;
                case 'dye':
                    clearInterval(timer)
                    timer = setInterval(function() {
                        var point = getPoint(s, t, 10);
                        drawCircle(context, point.x, point.y)
                    }, 0)
                    break;
                case 'circle':
                    break;
                case 'rectangle':
                    break;
                case 'square':
                    break;
                case 'cancel':
                    context.clearRect(s, t - eraserSize, eraserSize, eraserSize)
                    break;
                default:
                    break;
            }
        }

    }, false)
    canvas.addEventListener('mouseup', function() {
        flag = 0;
        clearInterval(timer)
        saveImgHistory()
    }, false)

}