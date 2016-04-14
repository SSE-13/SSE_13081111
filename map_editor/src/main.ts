
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
    mapData[rows][clows] = changecolor;  
    return mapData
}

function saveMap() {
    var map_path = __dirname + "/map.json";
    var obj = JSON.stringify(mapData);
    var namedobj = "{" + "map"+":"+obj+"}";
    fs.writeFileSync(map_path,namedobj,"utf-8");
    
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
    var changeXnum=0,changeYnum=0;     
    //0 == red
    var targetColor = 1;
     
    changeXnum = tile.x /50; 
    changeYnum = tile.y /50;
    
    //change map
    changMap(changeXnum,changeYnum,targetColor);
    //save map
   // saveMap();
   
   console.log(editor.isDirty);
    editor.isDirty = false;
    
    
    console.log(mapData[changeXnum][changeYnum]);
    
    console.log(tile);
}


var mapData = readFile();


var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();


var editor = createMapEditor();
renderCore.start(editor);
