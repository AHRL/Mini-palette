var curStyle = 'pencil';
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
    //图形板
var aGraphImg = document.querySelector('.graph').querySelectorAll('img')
var curGraph = []
var graphFlag = 0
for (var i = 0, len = aGraphImg.length; i < len; i++) {
    aGraphImg[i].onclick = function() {
        curStyle = i = 0 ? 'circle' : curStyle;
        curStyle = i = 1 ? 'rectangle' : curStyle;
        curStyle = i = 2 ? 'square' : curStyle;
        var obj = context.drawImage(this, 100, 100)
            // obj.disX = 0;
            // obj.disY = 0;
        console.log('a')
        console.log(obj)
        curGraph.push({ obj: obj, x: 100, y: 100 })
    }
}
//橡皮擦
var aEraser = document.querySelector('.eraser').querySelectorAll('img')
for (var i = 0, len = aEraser.length; i < len; i++) {
    aEraser[i].index = i
    aEraser[i].onclick = function() {
        canvas.style.cursor = 'url(./img/Square_' + (32 + this.index * 16) + 'px.ico),default'
    }
}
//撤销
var cancelList = []
var cancelIndex = 0
document.querySelector('.cancel').onclick = function() {
        curStyle = 'cancel'
        cancelIndex++
        //    context.clearRect(0, 0, canvas.width, canvas.height)
        var image = new Image();
        console.log(image)
        image.src = cancelList[cancelList.length - 1 - cancelIndex]
            //    console.log(image)
        image.onload = function() {
                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.weight);
            }
            //    console.log(cancelList.length)

    }
    //保存历史记录
function saveImgHistory() {
    cancelIndex = 0;
    //    console.log(canvas)
    var dataUrl = canvas.toDataURL();
    //    console.log(canvas.toDataURL())
    cancelList.push(cancelList);
}
//清空
var clear = document.querySelector('.clear')
clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}