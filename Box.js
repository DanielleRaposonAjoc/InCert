const Pixel = require('./Pixel.js');
const Page = require('./Page.js');

module.exports=class Box{
    constructor(p1,p2,page){
        
        this.page=page;

        
        this.boxWidth = p1.getHorizontalDistance(p2);
        this.boxHeight = p1.getVerticalDistance(p2);
        this.startingPixel = this.setStartingPixel(p1,p2);

        this.spacing=5;
    }

    setStartingPixel(p1,p2){
        
        var pixel1 = new Pixel(p1.getX(), this.page.getHeight()-p1.getY());
        var pixel2 = new Pixel(p2.getX(), this.page.getHeight()-p2.getY());
        return pixel1.getStartingPixel(pixel2);
    }

    getBoxHeight(){
        return this.boxHeight;
    }

    getBoxWidth(){
        return this.boxWidth;
    }

    getBoxSpacing(){
        return this.spacing;
    }

    getStartingPixel(){
        return this.startingPixel;
    }
}