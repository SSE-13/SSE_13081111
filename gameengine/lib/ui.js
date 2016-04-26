var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var eventCore = events.EventCore.getInstance();
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = this;
            _super.call(this);
            this._text = "label";
            this.background = new render.Rect();
            this.background.width = this.width;
            this.background.height = this.height;
            this.background.color = "#383838";
            this.label = new render.TextField();
            this.label.width = this.width;
            this.label.height = this.height;
            this.label.textAlign = "center";
            this.label.text = this.text;
            this.label.fontColor = "#EEEEEE";
            this.addChild(this.background);
            this.addChild(this.label);
            eventCore.register(this, events.displayObjectRectHitTest, function () {
                if (_this.onClick) {
                    _this.onClick();
                }
            });
        }
        Object.defineProperty(Button.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                this.label.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.background.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.background.height = value;
            },
            enumerable: true,
            configurable: true
        });
        return Button;
    }(render.DisplayObjectContainer));
    ui.Button = Button;
    var DisplayBlock = (function (_super) {
        __extends(DisplayBlock, _super);
        function DisplayBlock(_label) {
            _super.call(this);
            this.label = new render.TextField();
            this.label.text = _label;
            this.label.fontColor = "#090909";
            this.addChild(this.label);
            this.data = new render.TextField();
            this.data.x = 30 + 5;
            this.data.text = "-";
            this.data.fontColor = "#FFFFFF";
            this.addChild(this.data);
        }
        DisplayBlock.prototype.dataToString = function () {
            var S_data = String(this._data);
            this.data.text = S_data;
        };
        DisplayBlock.prototype.setData = function (data) {
            this.data.text = data;
        };
        return DisplayBlock;
    }(render.DisplayObjectContainer));
    ui.DisplayBlock = DisplayBlock;
})(ui || (ui = {}));
