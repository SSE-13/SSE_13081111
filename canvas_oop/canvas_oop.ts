/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
    
    color = '#FFFFFF';

    render(context: CanvasRenderingContext2D) {
        context.font = "20px Arial";
        context.fillStyle = this.color;
        context.fillText('Homework2_13081111', 0, 20);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");

var X = 'Resource/';

var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 200;
rect2.y = 200;
rect2.rotation = Math.PI / 8;
rect2.color = '#00FFFF'

var text = new TextField();
text.x = 116;
text.y = 300;
text.color = '#DDDDDD'

var bitmap = new Bitmap();
bitmap.source =X+'DS_BG.jpg';
bitmap.x = 0;
bitmap.y = 0;

var RB1 = new Bitmap();
RB1.source =  X+'RB1.jpg';
RB1.x = 1083;
RB1.y = 286;

var RB2 = new Bitmap();
RB2.source = X+'RB2.jpg';
RB2.x = 1086;
RB2.y = 362;

var RB3 = new Bitmap();
RB3.source = X+'RB3.jpg';
RB3.x = 1086;
RB3.y = 422;

var RB4 = new Bitmap();
RB4.source = X+'RB4.jpg';
RB4.x = 1083;
RB4.y = 481;

var RB5 = new Bitmap();
RB5.source = X+'RB5.jpg';
RB5.x = 1101;
RB5.y = 636;

var RB6 = new Bitmap();
RB6.source = X+'RB6.jpg';
RB6.x = 1101;
RB6.y = 682;



//渲染队列
var renderQueue =[bitmap,text,RB1,RB2,RB3,RB4,RB5,RB6];
//资源加载列表
var imageList = ['Resource/DS_BG.jpg','Resource/RB1.jpg',
                 'Resource/RB2.jpg','Resource/RB3.jpg','Resource/RB4.jpg','Resource/RB5.jpg','Resource/RB6.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


