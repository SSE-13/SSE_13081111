
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }


    export class Tile extends render.Rect {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
        }

        public setWalkable(value) {
            this.color = value ? "#0000FF" : "#FF0000";
        }
    }
    
    
    export class Block extends render.DisplayObjectContainer {
        
        private BG_up :render.Rect;
        private BG_down :render.Rect;
        private title : render.TextField;
    
   
    
        
        constructor(b_name:string,b_width:number,b_height:number){
            super();
            //block UI 背景绘制
            this.BG_up = new render.Rect();
            this.BG_up.width =b_width;
            this.BG_up.height = 35;
            this.BG_up.color = "#252525";
            
            this.BG_down = new render.Rect();
            this.BG_down.width =b_width;
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
        
    }
}
