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
var eventCore = new events.EventCore();
eventCore.init();
var headHitTest = function (localPoint, displayObject) {
    alert("\u70B9\u51FB\u4F4D\u7F6E\u4E3A" + localPoint.x + "," + localPoint.y);
    return true;
};
var headOnClick = function () {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
};
var Leg;
eventCore.register(head, headHitTest, headOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBRXpELElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUVuQixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVqQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBQyxXQUFXLENBQUM7QUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUMsV0FBVyxDQUFDO0FBQzVCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFDLGNBQWMsQ0FBQztBQUNsQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBQyxjQUFjLENBQUM7QUFDbEMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUMsZUFBZSxDQUFDO0FBQ3BDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFDLGVBQWUsQ0FBQztBQUNwQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBQyxhQUFhLENBQUM7QUFFaEMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztB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