function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function changMD(rows, clows, changecolor) {
    var mapDate = readFile;
    mapData[clows][rows] = changecolor;
    rowDisplay.data = rows + 1;
    rowDisplay.setData(String(rows + 1));
    console.log(rowDisplay.data + "|");
    colDisplay.data = clows + 1;
    colDisplay.dataToString();
    if (mapData[clows][rows] == 1) {
        isAbleDisplay.setData("是");
    }
    else {
        isAbleDisplay.setData("否");
    }
    mapEditor.isDirty = false;
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
    //————Btn
    var Btn_save = new render.Bitmap();
    Btn_save.source = "Resource/Btn_Save.png";
    Btn_save.x = 0;
    Btn_save.y = 50 * cols + 20;
    renderCore.start(Btn_save, ["Resource/Btn_Save.png"]);
    eventCore.register(Btn_save, events.displayObjectRectHitTest, onBtnSaveClick);
    //————Background
    /*
    var background = new render.Rect();
    background.x = 50 * rows + 20;
    background.width = 300;
    background.height = 500;
    background.color = "#797979";
    
   
    world.addChild(Btn_save);
    world.addChild(background);*/
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
    //change map & data
    changMD(changeXnum, changeYnum, targetColor);
}
function onBtnSaveClick() {
    saveMap();
    console.log("Save");
}
function onBtnRedo() {
    console.log("Redo");
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
//panel settings
var panel = new editor.Block("Edtior", 200, 365);
panel.x = 450;
panel.y = 0;
var rowDisplay = new ui.DisplayBlock("行:");
rowDisplay.x = 10;
rowDisplay.y = 40;
panel.addChild(rowDisplay);
var colDisplay = new ui.DisplayBlock("列:");
colDisplay.x = 80;
colDisplay.y = 40;
panel.addChild(colDisplay);
var isAbleDisplay = new ui.DisplayBlock("是否可以走:");
isAbleDisplay.x = 10;
isAbleDisplay.y = 80;
isAbleDisplay.data.x = 120;
//isAbleDisplay.data.fontSize = 14;
panel.addChild(isAbleDisplay);
var btnSave = new ui.Button();
btnSave.text = "保存";
btnSave.x = 10;
btnSave.y = 120;
btnSave.width = 100;
btnSave.height = 35;
btnSave.onClick = function () {
    onBtnSaveClick();
};
panel.addChild(btnSave);
var btnRedo = new ui.Button();
btnRedo.text = "撤销";
btnRedo.x = 10;
btnRedo.y = 160;
btnRedo.width = 100;
btnRedo.height = 35;
btnRedo.onClick = function () {
    onBtnRedo();
};
panel.addChild(btnRedo);
var materialBox = new editor.Block("Material Box", 650, 200);
materialBox.x = 0;
materialBox.y = 350;
stage.addChild(panel);
stage.addChild(materialBox);
renderCore.start(stage);
