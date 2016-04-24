
import * as fs from 'fs';



function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}

function changMap(rows,clows,changecolor){
    var mapDate = readFile;
    mapData[clows][rows] = changecolor;  
    return mapData
}

function saveMap() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path,"utf-8");
    var obj = JSON.parse(content);
    obj.map = mapData;
    var objS = JSON.stringify(obj);
    fs.writeFileSync(map_path,objS,"utf-8");
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
    
    var Btn_save = new render.Bitmap();
    Btn_save.source = "Resource/Btn_Save.png";
    Btn_save.x = 0;
    Btn_save.y = 200;
    renderCore.start(Btn_save,["Resource/Btn_Save.png"]);
    
    world.addChild(Btn_save);
    
    return world;

}



function onTileClick(tile: editor.Tile) {
   //0 == red 1==blue
    
    var changeXnum = 0, changeYnum = 0;
    changeXnum = tile.x / 50;
    changeYnum = tile.y / 50;
    
    //检测之前的颜色
    if(mapData[changeYnum][changeXnum]==1){
            var targetColor = 0;
    }else{
            var targetColor = 1;
    }

   
    //change map
    changMap(changeXnum, changeYnum, targetColor);
    //save map
    saveMap();
   
    console.log(editor.isDirty);
    editor.isDirty = false;
    console.log(editor.isDirty);
   // console.log(mapData[changeXnum][changeYnum]);
    //console.log(tile);
    
    //{"map":[[0,1,0,0],[1,0,0,1],[1,0,0,0],[1,0,0,0]]}
    //{"map":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]}
}


var mapData = readFile();


var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();


var editor = createMapEditor();
renderCore.start(editor);

var Btn_save = new render.Bitmap();
Btn_save.source = "Resource/Btn_Save.png";
Btn_save.x = 0;
Btn_save.y = 0;
