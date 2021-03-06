module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;
    
    //速度
    const v = 10;
    //单位
    const x= GRID_PIXEL_HEIGHT; 

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
            
            

        }

        render(context: CanvasRenderingContext2D) {
            
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if(this.grid.getNode(i,j).walkable == false){
                        context.fillStyle = '#000000';
                        context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.stroke(); 
                    }
                    if (this.grid.getNode(i,j).walkable){
                        context.fillStyle = '#0000FF';
                        context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.stroke();
                    } 
                  
                }
            }
            context.closePath();

        }

    }

    export class BoyShape extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {

        public route;
        public i = 0;;//当前移动点
        public length;
        public target;
        public targetY;

        public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            this.route = path;
            this.length = path.length;
            console.log(path);
            console.log(grid.toString());
        }

        public onTicker(duringTime) {
         if(this.i <= this.length){
             
          this.target = this.route[this.i];           
      
           if(this.x  < this.target.x *x){
              if(this.x + v*duringTime < this.target.x*x){
                    this.x +=duringTime * v ;    
              }else{
                  this.x = this.target.x*x;
              }
           }
           
           if(this.y < this.target.y*x){
              if(this.y + v*duringTime < this.target.y*x){
                    this.y +=duringTime * v ;   
              }else{
                  this.y = this.target.y*x;
              }
           }
           
           if(this.x == this.target.x*x && this.y == this.target.y*x){
               this.i++;
           }
           
           console.log(this.x + " "+this.y + "   |  "+this.target.x +" " +this.target.y+ "\\"+this.i);
          
          }
        }
        
        
    }
}




var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);


var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);