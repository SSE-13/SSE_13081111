module game {


}

var humanContainer = new render.DisplayObjectContainer();

var R = "Resource";

var head = new render.Bitmap();
var body = new render.Bitmap();
var leftArm = new render.Bitmap();
var rightArm = new render.Bitmap();
var leftLeg = new render.Bitmap();
var rightLeg = new render.Bitmap();
var Weapon = new render.Bitmap();


head.source = R+"/Head.png";
body.source = R+"/Body.png";
leftArm.source = R+"/LeftArm.png";
leftLeg.source = R+"/RightArm.png";
rightArm.source = R+"/LeftLeg.png";
rightLeg.source = R+"/RightLeg.png";
Weapon.source = R+"/Weapon.png";

humanContainer.addChild(head);
humanContainer.addChild(body);
humanContainer.addChild(leftArm);
humanContainer.addChild(leftLeg);
humanContainer.addChild(rightArm);
humanContainer.addChild(rightLeg);
humanContainer.addChild(Weapon);

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, [R+"/Head.png",R+"/Body.png",R+"/LeftArm.png",R+"/RightArm.png",
                                   R+"/LeftLeg.png", R+"/RightLeg.png",R+"/Weapon.png"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x += this.vx*duringTime;
         //this.y +=  
         this.rotation += Math.PI*duringTime;

    }
}

var ticker = new Ticker();
var warrior = new HumanBody(humanContainer);
warrior.vx = 3;
warrior.y = 200;
ticker.start([body]);











