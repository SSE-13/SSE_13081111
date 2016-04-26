module ui {

    var eventCore: events.EventCore = events.EventCore.getInstance();

    export class Button extends render.DisplayObjectContainer {

        public onClick: Function;
        public get text(): string {
            return this._text;
        }

        public set text(value: string) {
            this._text = value;
            this.label.text = value;
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this.background.width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this.background.height = value;
        }


        private background: render.Rect;
        private label: render.TextField;
        private _text: string = "label";



        constructor() {

            super();
            this.background = new render.Rect();
            this.background.width = this.width;
            this.background.height = this.height;
            this.background.color = "#383838"
            this.label = new render.TextField();
            this.label.width = this.width;
            this.label.height = this.height;
            this.label.textAlign = "center";
            this.label.text = this.text;
            this.label.fontColor = "#EEEEEE";
            this.addChild(this.background);
            this.addChild(this.label);

            eventCore.register(this, events.displayObjectRectHitTest, () => {
                if (this.onClick) {
                    this.onClick();
                }
            });


        }




    }

    export class DisplayBlock extends render.DisplayObjectContainer {
          private label:render.TextField;
          public data:render.TextField;
          private _data:number;
          
          constructor(_label:string){
              super();
              this.label = new render.TextField();
              this.label.text = _label;
              this.label.fontColor = "#090909";
              this.addChild(this.label);
            
              this.data = new render.TextField();
              this.data.x = 30 + 5;
              this.data.text = "-";
              this.data.fontColor = "#FFFFFF"
              this.addChild(this.data);
          }

          public dataToString(){
              var S_data = String(this._data);
              this.data.text = S_data;
          }

          public setData(data:string){
              this.data.text = data;
          }
    }


}