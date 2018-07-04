var curStyle = 'pencil';
var eraserSize;
//笔刷
function getstyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]; //通过三木运算符来获取当前style的属性  
}
var aImg = document.querySelector('.penBar').querySelectorAll('img')
for (var i = 0, len = aImg.length; i < len; i++) {
    aImg[i].index = i;
    aImg[i].onclick = function() {
        canvas.style.cursor = 'url(' + this.getAttribute('src') + '),default'
        curStyle = this.index == 0 ? 'pencil' : curStyle;
        // curStyle = this.index == 1 ? 'brush' : curStyle;
        curStyle = this.index == 1 ? 'dye' : curStyle;
    }
}
var aSizeDiv = document.querySelector('.size').querySelectorAll('div')
for (var i = 0, len = aSizeDiv.length; i < len; i++) {
    aSizeDiv[i].index = i
    aSizeDiv[i].onclick = function() {
        context.lineWidth = 1 + 5 * this.index
    }
}
// 颜料盘
var aColorDiv = document.querySelector('.colorBar').querySelectorAll('div')

for (var i = 0, len = aColorDiv.length; i < len; i++) {
    aColorDiv[i].onclick = function() {
        context.fillStyle = getstyle(this, 'background-color')
        context.strokeStyle = getstyle(this, 'background-color')
    }
}
var reg = /^#[0-9a-fA-F]{6}$/
var oColorInput = document.querySelector('.color').querySelector('input')
var oColorSpan = document.querySelector('.color').querySelector('span')
oColorInput.onblur = function() {
    var val = this.value
    if (reg.test(val)) {
        context.fillStyle = val
        context.strokeStyle = val
        oColorSpan.style.display = 'none'
    } else {
        oColorSpan.style.display = 'block'
    }
}

//橡皮擦
var aEraser = document.querySelector('.eraser').querySelectorAll('img')
for (var i = 0, len = aEraser.length; i < len; i++) {
    aEraser[i].index = i
    aEraser[i].onclick = function() {
        curStyle = 'cancel'
        eraserSize = 32 + this.index * 16
        canvas.style.cursor = 'url(./img/Square_' + (32 + this.index * 16) + 'px.ico),default'
    }
}
//撤销
var cancelList = []
var cancelIndex = 0
document.querySelector('.cancel').onclick = function() {
        cancelIndex++
        context.clearRect(0, 0, canvas.width, canvas.height)
        var image = new Image();
        console.log(canvas.width)
        image.src = cancelList[cancelList.length - 1 - cancelIndex]
        console.log(cancelList.length - 1 - cancelIndex)
        image.onload = function() {
            console.log(image.width)
            context.drawImage(image, 0, 0)
        }

    }
    //保存历史记录
function saveImgHistory() {
    cancelIndex = 0;
    var dataUrl = canvas.toDataURL();
    cancelList.push(dataUrl);
}
//清空
var clear = document.querySelector('.clear')
clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}