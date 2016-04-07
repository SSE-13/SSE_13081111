var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var R = "Resource";
var head = new render.Bitmap();
var body = new render.Bitmap();
var leftArm = new render.Bitmap();
var rightArm = new render.Bitmap();
var leftLeg = new render.Bitmap();
var rightLeg = new render.Bitmap();
var Weapon = new render.Bitmap();
head.source = R + "/Head.png";
body.source = R + "/Body.png";
leftArm.source = R + "/LeftArm.png";
leftLeg.source = R + "/RightArm.png";
rightArm.source = R + "/LeftLeg.png";
rightLeg.source = R + "/RightLeg.png";
Weapon.source = R + "/Weapon.png";
humanContainer.addChild(head);
humanContainer.addChild(body);
humanContainer.addChild(leftArm);
humanContainer.addChild(leftLeg);
humanContainer.addChild(rightArm);
humanContainer.addChild(rightLeg);
humanContainer.addChild(Weapon);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, [R + "/Head.png", R + "/Body.png", R + "/LeftArm.png", R + "/RightArm.png",
    R + "/LeftLeg.png", R + "/RightLeg.png", R + "/Weapon.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        //this.y +=  
        this.rotation += Math.PI * duringTime;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var warrior = new HumanBody(humanContainer);
warrior.vx = 3;
warrior.y = 200;
ticker.start([body]);
//# sourceMappingURL=game.js.map