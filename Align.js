const Pixel = require('./Pixel.js');
module.exports=class Align{
    constructor(vertical, horizontal){
        this.alignVertical=vertical;
        this.alignHorizontal=horizontal;
    }
    setAlignVerticalTop(){
        this.alignVertical="top";
    }
    setAlignVerticalCenter(){
        this.alignVertical="center";
    }
    setAlignVerticalBottom(){
        this.alignVertical="bottom";
    }
    setAlignHorizontalLeft(){
        this.alignHorizontal="left";
    }
    setAlignHorizontalCenter(){
        this.alignHorizontal="center";
    }
    setAlignHorizontalRight(){
        this.alignHorizontal="right";
    }
    getStartDrawingPixel(contentBox, textWidth, totalVerticalHeight){
        var x= this.getStartDrawingPixelX(contentBox,totalVerticalHeight);
        // console.log(x);
        var y = this.getStartDrawingPixelY(contentBox, textWidth);
        // console.log("y");
        
        var pixel = new Pixel(x,y)
        // console.log(pixel);
        return pixel;
    }
    getStartDrawingPixelY(contentBox,totalVerticalHeight){
        var height= contentBox.getContentBoxHeight();

        var contentBoxUpperLeftPixel = contentBox.getStartingPixel().getY();
        if(this.alignVertical=="top"){

            return contentBoxUpperLeftPixel;
        }
        else if(this.alignVertical=="center"){
            return contentBoxUpperLeftPixel-((height-totalVerticalHeight)/2);
        }
        else if (this.alignVertical=="bottom"){
            return contentBoxUpperLeftPixel-(height-totalVerticalHeight);
        }
    }
    getStartDrawingPixelX(contentBox, textWidth){
        var width= contentBox.getContentBoxWidth();
        
        var contentBoxUpperLeftPixel = contentBox.getStartingPixel().getX();
        // console.log("STARTING X IS: "+contentBoxUpperLeftPixel);
        // console.log("box width IS: "+width);
        // console.log("text width IS: "+textWidth);
        if(this.alignHorizontal=="left"){

            return contentBoxUpperLeftPixel;
        }
        else if(this.alignHorizontal=="center"){
            
            return contentBoxUpperLeftPixel+((width-textWidth)/2);
        }
        else if (this.alignHorizontal=="right"){
            // console.log("ACTUAL STARTING X IS: "+(contentBoxUpperLeftPixel+(width-textWidth)));
            return contentBoxUpperLeftPixel+(width-textWidth);
        }
    }
}