function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function changMap(rows, clows, changecolor) {
    var mapDate = readFile;
    mapData[clows][rows] = changecolor;
    return mapData;
}
function saveMap() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    obj.map = mapData;
    var objS = JSON.stringify(obj);
    fs.writeFileSync(map_path, objS, "utf-8");
    console.log("savemap");
}
function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    // 网格以外的图元创建
    var Btn_save = new render.Bitmap();
    Btn_save.source = "Resource/Btn_Save.png";
    Btn_save.x = 0;
    Btn_save.y = 220;
    renderCore.start(Btn_save, ["Resource/Btn_Save.png"]);
    eventCore.register(Btn_save, events.displayObjectRectHitTest, onBtnSaveClick);
    world.addChild(Btn_save);
    return world;
}
function onTileClick(tile) {
    console.log(tile);
    //0 == red 1==blue
    var changeXnum = 0, changeYnum = 0;
    changeXnum = tile.x / 50;
    changeYnum = tile.y / 50;
    //检测之前的颜色
    if (mapData[changeYnum][changeXnum] == 1) {
        tile.color = "#FF0000";
        var targetColor = 0;
    }
    else {
        tile.color = "#0000FF";
        var targetColor = 1;
    }
    //change map
    changMap(changeXnum, changeYnum, targetColor);
}
function onBtnSaveClick() {
    saveMap();
    console.log("Hit");
}
var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var mapEditor = createMapEditor();
var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);
var panel = new editor.ControlPanel();
panel.x = 300;
stage.addChild(panel);
renderCore.start(stage);
