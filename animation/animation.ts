/**
 * 重力加速度
 */
const GRAVITY = 9.8;

const BOUNDS_BOTTOM = 400;

const BOUNDS_LEFT = 0;

const BOUNDS_RIGHT = 400;

const BOUNCE = 0.95;

const friction_floor = 0.8;

var sleepX = false;
var sleepY = false;

//画框设置
const Frame = 10;
var frameColor = '#BBB222'

/**
 * 计时器系统
 */
class Ticker {

    bodyQueue = [];

    lastTime;

    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    start(bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    }

    onTicker() {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function(body) {
            body.onTicker(duringTime / 100)
        });
    }
}


class Body {

    vx = 0;
    vy = 0;
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    displayObject;

    constructor(displayObject: DisplayObject) {
        this.displayObject = displayObject;
    }

    public onTicker(duringTime) {
        //速度过小则停止
        if(sleepX){
            this.vx = 0;
        }
        this.x += duringTime * this.vx;
        
        
        if(sleepY){
            this.vy = 0;
            
        }else{
              this.vy += duringTime * GRAVITY;
        }
        this.y += duringTime * this.vy;


        //反弹
        if(!sleepY){
            if (this.y + this.height > BOUNDS_BOTTOM) {
                this.y = BOUNDS_BOTTOM - this.width; 
                this.vy = -(BOUNCE * this.vy);
             }
        }
        //TODO： 左右越界反弹
        if(!sleepX){
             if(this.x + this.width > BOUNDS_RIGHT){
                 this.x =  BOUNDS_RIGHT - this.width;
                 this.vx = -friction_floor * this.vx;
             }
        
             if(this.x < BOUNDS_LEFT){
                 this.x = 0;
                   this.vx = -friction_floor * this.vx;
             }
        }
        
        //静摩擦
        if(sleepY){
             this.vx = friction_floor * this.vx;
        }
        
       if(Math.abs(this.vx) < 0.00001){
                sleepX = true;
       }
       
        if(Math.abs(this.vy) < 1 && this.y >= BOUNDS_BOTTOM - this.width){ 
                    sleepY = true;
        }
      
     console.log(this.vx," | ",this.vy,sleepX,sleepY);


        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;

    }
}


var rect = new Rect();
rect.width = 100;
rect.height = 100;
rect.color = '#FF0000';

/**
 * 创建一个物体，其显示内容为一个长方形，受重力做平抛运动
 */
var body = new Body(rect);
body.width = rect.width;
body.height = rect.height;
body.vx = 500;//需要保证 vx 在 0-50的范围内行为正常
body.vy = 0;//需要保证 vy 在 0-50的范围内行为正常

/**
 * 创建画框
 */
var frame_B = new Rect();
frame_B.width = BOUNDS_RIGHT;
frame_B.height = Frame;
frame_B.x = 0;
frame_B.y = BOUNDS_BOTTOM;
frame_B.color = frameColor;

var frame_R = new Rect();
frame_R.width = Frame;
frame_R.height = BOUNDS_BOTTOM +10;
frame_R.x = BOUNDS_RIGHT;
frame_R.y = 0;
frame_R.color = frameColor;

var frame_L = new Rect();
frame_L.width = 10;
frame_L.height = 410;
frame_L.x = -10;
frame_L.y = 0;
frame_L.color = frameColor;


var renderCore = new RenderCore();
var ticker = new Ticker();

renderCore.start([rect,frame_B,frame_L,frame_R]);
ticker.start([body]);


