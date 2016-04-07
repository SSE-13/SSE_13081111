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
var weapon = new render.Bitmap();
head.source = R + "/Head.png";
body.source = R + "/Body.png";
leftArm.source = R + "/LeftArm.png";
leftLeg.source = R + "/LeftLeg.png";
rightArm.source = R + "/RightArm.png";
rightLeg.source = R + "/RightLeg.png";
weapon.source = R + "/Weapon.png";
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
renderCore.start(humanContainer, [R + "/Weapon.png", R + "/Head.png", R + "/Body.png", R + "/LeftArm.png", R + "/RightArm.png", R + "/LeftLeg.png", R + "/RightLeg.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        //加速度
        var a = 0;
        var a2 = 20;
        this.x += this.vx * duringTime + a * duringTime;
        this.y += this.vy * duringTime;
        this.rotation += Math.PI * duringTime + a2 * duringTime;
        a += 10;
        a2 += 20;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var warrior = new HumanBody(humanContainer);
warrior.vx = 10;
warrior.y = 200;
ticker.start([warrior]);
//# sourceMappingURL=game.js.map