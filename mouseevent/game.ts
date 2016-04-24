




var humanContainer = new render.DisplayObjectContainer();

var R = "Resource";

var head = new render.Bitmap();
var body = new render.Bitmap();
var leftArm = new render.Bitmap();
var rightArm = new render.Bitmap();
var leftLeg = new render.Bitmap();
var rightLeg = new render.Bitmap();
var weapon = new render.Bitmap();

head.source = R+"/Head.png";
body.source = R+"/Body.png";
leftArm.source = R+"/LeftArm.png";
leftLeg.source = R+"/LeftLeg.png";
rightArm.source = R+"/RightArm.png";
rightLeg.source = R+"/RightLeg.png";
weapon.source = R+"/Weapon.png";

humanContainer.addChild(head);
humanContainer.addChild(body);
humanContainer.addChild(leftArm);
humanContainer.addChild(leftLeg);
humanContainer.addChild(rightArm);
humanContainer.addChild(rightLeg);
humanContainer.addChild(weapon);

humanContainer.x = 100;
humanContainer.y = 100;
head.x = 5;
head.y = -34;
body.x = 10;
body.y = 10;

leftArm.x = -11;
leftArm.y = 28;
rightArm.x = 80;
rightArm.y = 22;

leftLeg.x = 11;
leftLeg.y = 87;
rightLeg.x = 55;
rightLeg.y = 89;

weapon.x = 90;
weapon.y = -37;

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, [R+"/Weapon.png",R+"/Head.png",R+"/Body.png",R+"/LeftArm.png",R+"/RightArm.png",R+"/LeftLeg.png", R+"/RightLeg.png"]);

//加速度
var SpeedA = 0;
var SpeedB = 2;
var Forzero = 1; 

var stop = false;
var rotationDir = 1;// -1反向

class HumanBody extends Body {

    onTicker(duringTime: number) {


         this.x += (this.vx*duringTime + SpeedA*duringTime) * Forzero;
         this.y += this.vy*duringTime; 
         this.rotation += (Math.PI*duringTime + SpeedB*duringTime)*rotationDir*Forzero;
         
         if(stop){
             this.rotation = 0;
         }
         

    }
}

var ticker = new Ticker();
var warrior = new HumanBody(humanContainer);
warrior.vx = 10;
warrior.y =200;
ticker.start([warrior]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    if(localPoint.x > displayObject.x && localPoint.x < displayObject.x + 88){
         if(localPoint.y > displayObject.y && localPoint.y < displayObject.y + 54){
             return true;
         }
    }
    else {
        return false;
    }
}

var legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    if(localPoint.x > displayObject.x - 55 && localPoint.x < displayObject.x ){
         if(localPoint.y > displayObject.y - 89 && localPoint.y < displayObject.y){
             return true;
         }
    }
    else {
        return false;
    }
}


var headOnClick = () => {
    //修改 HumanBody 的速度，使其反向移动
    if(rotationDir == -1){
        rotationDir = 1;
    } 
    else if (rotationDir == 1){
        rotationDir = -1;
    }
    
    if(stop){
        stop = false;
        Forzero = 1;
    }
}

var legOnClick = () =>{
    console.log("hit");
    if(!stop){
        Forzero = 0;
        stop = true;
    }
}

eventCore.register(head,headHitTest,headOnClick);
eventCore.register(leftLeg,legHitTest,legOnClick);
eventCore.register(rightLeg,legHitTest,legOnClick);









