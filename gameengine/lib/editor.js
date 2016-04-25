var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 50;
    editor.GRID_PIXEL_HEIGHT = 50;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this);
        }
        Tile.prototype.setWalkable = function (value) {
            this.color = value ? "#0000FF" : "#FF0000";
        };
        return Tile;
    }(render.Rect));
    editor.Tile = Tile;
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block(b_name, b_width, b_height) {
            _super.call(this);
            //block UI 背景绘制
            this.BG_up = new render.Rect();
            this.BG_up.width = b_width;
            this.BG_up.height = 35;
            this.BG_up.color = "#252525";
            this.BG_down = new render.Rect();
            this.BG_down.width = b_width;
            this.BG_down.height = b_height - 15;
            this.BG_down.color = "#797979";
            this.title = new render.TextField();
            this.title.text = b_name;
            this.title.x = 5;
            this.title.fontColor = "#EEEEEE";
            this.addChild(this.BG_down);
            this.addChild(this.BG_up);
            this.addChild(this.title);
            /*
            var button = new ui.Button();
            button.text = "Hello";
            button.width = 100;
            button.height = 50;
            this.addChild(button);
            button.onClick = ()=> {
                alert(111);
            }
            */
        }
        return Block;
    }(render.DisplayObjectContainer));
    editor.Block = Block;
})(editor || (editor = {}));
