$(function() {
    //笔刷
    $('.penBar img').click(function() {
        $('#myCanvas').css('cursor', 'url(' + $(this).attr('src') + '),default')
    })
    $('.size div').each(function(index) {
            $(this).click(function() {
                context.lineWidth = 1 + 5 * index
            })
        })
        //颜料盘
    $('.colorBar div').click(function() {
        context.fillStyle = $(this).css('background-color')
        context.strokeStyle = $(this).css('background-color')
    })
    var reg = /^#[0-9a-fA-F]{6}$/
    $('.color input').blur(function() {
            if (reg.test($(this).val())) {
                context.fillStyle = $(this).val()
                context.strokeStyle = $(this).val()
                $('.color span').css('display', 'none')
            } else {
                $('.color span').css('display', 'block')
            }
        })
        //图形板
    $('.graph img').click(function() {
        tintImage(this, "#000")
    })

    function tintImage(imgElement, tintColor) {
        //创建隐藏的myCanvas(使用图像尺寸)
        // var myCanvas = document.createElement("canvas");
        // myCanvas.width = imgElement.offsetWidth;
        // myCanvas.height = imgElement.offsetHeight;

        // var context = myCanvas.getContext("2d");
        context.drawImage(imgElement, 0, 0);

        var map = context.getImageData(0, 0, 320, 240);
        var imdata = map.data;

        //将图像转换为灰度
        var r, g, b, avg;
        for (var p = 0, len = imdata.length; p < len; p += 4) {
            r = imdata[p]
            g = imdata[p + 1]
            b = imdata[p + 2];
            //忽略Alpha通道(p + 3)

            avg = Math.floor((r + g + b) / 3);

            imdata[p] = imdata[p + 1] = imdata[p + 2] = avg;
        }

        context.putImageData(map, 0, 0);

        //使用较轻的组合覆盖填充矩形
        // context.globalCompositeOperation = "lighter";
        // context.globalAlpha = 0.5;
        // context.fillStyle = tintColor;
        context.fillRect(0, 0, imgElement.width, imgElement.height);

        //用画布数据替换图像源
        // imgElement.src = myCanvas.toDataURL();
    }
})