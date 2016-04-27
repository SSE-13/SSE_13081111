

function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}

function changMD(rows, clows, changecolor) {
    var mapDate = readFile;
    mapData[clows][rows] = changecolor;

    //更新editor信息
    rowDisplayData.text = String(rows + 1);
    colDisplayData.text = String(clows + 1);
    if (mapData[clows][rows] == 1) {
        isAbleDisplayData.text = "是";
    } else {
        isAbleDisplayData.text = "否";
    }

    return mapData
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
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);

            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}



function onTileClick(tile: editor.Tile) {
    //0 == red 1==blue
    var changeX = 0, changeY = 0;
    changeX = tile.x / 50;
    changeY = tile.y / 50;

    //检测之前的颜色
    if (mapData[changeY][changeX] == 1) {
        tile.color = "#FF0000";
        var targetColor = 0;
    }
    else {
        tile.color = "#0000FF";
        var targetColor = 1;
    }
    //change map & data
    changMD(changeX, changeY, targetColor);
    //redoHistroy
    redoHistroy.push([changeX, changeY, targetColor]);

}

function colorChange(tile: editor.Tile, changeX: number, changeY: number) {
    if (mapData[changeY][changeX] == 1) {
        tile.color = "#FF0000";
        var targetColor = 0;
    }
    else {
        tile.color = "#0000FF";
        var targetColor = 1;
    }
}


function onBtnSaveClick() {
    saveMap();
    console.log("Save");
}

function _Color(color:number) {
    if(color == 1){
        return 0;
    }else if (color == 0){
        return 1;
    }
}

function onBtnRedo() {


    if (redoHistroy.length > 0) {
        var redoStep = new Array();
        redoStep = redoHistroy.pop();
        var col = redoStep[0];
        var row = redoStep[1];
        var color = redoStep[2];

        var tile = new editor.Tile();
        tile.setWalkable(_Color(color));
        tile.x = col * editor.GRID_PIXEL_WIDTH;
        tile.y = row * editor.GRID_PIXEL_HEIGHT
        tile.ownedCol = col;
        tile.ownedRow = row;
        tile.width = editor.GRID_PIXEL_WIDTH;
        tile.height = editor.GRID_PIXEL_HEIGHT;
        stage.addChild(tile);


        eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }

    
    /*
    console.log(stage.children[0])
    var worldmap = new render.DisplayObjectContainer();
    worldmap = stage.children;

    console.log(worldmap.);
    */
    
    //
    if (redoHistroy.length == 0) {
        alert("无撤销步骤");
    }

 //   console.log(redoStep);
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

var redoHistroy = new Array();
var redoLimit: number = 1;

for (var k = 0; k < redoLimit; k++) {
    redoHistroy[k] = new Array();
}

//redoHistroy.push([0,0,0]);

console.log(redoHistroy);

/**
 * 编写界面
 */

//panel settings
var panel = new editor.Block("Edtior", 200, 365);
panel.x = 450;
panel.y = 0;

var rowDisplay = new ui.DisplayBlock("行:");
var rowDisplayData = new render.TextField();
rowDisplayData.text = "--";
rowDisplayData.x = 45;
rowDisplay.x = 10;
rowDisplay.y = 40;
rowDisplay.addChild(rowDisplayData);
panel.addChild(rowDisplay);

var colDisplay = new ui.DisplayBlock("列:");
var colDisplayData = new render.TextField();
colDisplayData.text = "--";
colDisplayData.x = 45;
colDisplay.x = 80;
colDisplay.y = 40;
colDisplay.addChild(colDisplayData);
panel.addChild(colDisplay);

var isAbleDisplay = new ui.DisplayBlock("是否可以走:");
var isAbleDisplayData = new render.TextField();
isAbleDisplayData.text = "--";
isAbleDisplayData.x = 115;
isAbleDisplay.x = 10;
isAbleDisplay.y = 80;
isAbleDisplay.addChild(isAbleDisplayData);
panel.addChild(isAbleDisplay);

var btnSave = new ui.Button();
btnSave.text = "保存";
btnSave.x = 10;
btnSave.y = 120;
btnSave.width = 100;
btnSave.height = 35;
btnSave.onClick = () => {
    onBtnSaveClick();
}
panel.addChild(btnSave);

var btnRedo = new ui.Button();
btnRedo.text = "撤销";
btnRedo.x = 10;
btnRedo.y = 160;
btnRedo.width = 100;
btnRedo.height = 35;
btnRedo.onClick = () => {
    onBtnRedo();
}
panel.addChild(btnRedo);

var materialBox = new editor.Block("Material Box", 650, 200);
materialBox.x = 0;
materialBox.y = 350;

stage.addChild(panel);
stage.addChild(materialBox);
renderCore.start(stage);

