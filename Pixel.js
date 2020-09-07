module.exports=class Pixel{
    constructor(x, y){
        this.x=x;
        this.y=y;
    }

    getX(){
        // console.log(this.x);
        return this.x;
    }

    getY(){
        // console.log(this.y);
        return this.y;
    }

    getVerticalDistance(px2){
        return Math.abs(this.y-px2.y);
    }
    getHorizontalDistance(px2){
        return Math.abs(this.x-px2.x);
    }

    getStartingX(px2){
        if(this.getX()<px2.getX()){
            return this.getX();
        }

        return px2.getX();
    }
    getStartingY(px2){
        if(this.getY()>px2.getY()){
            return this.getY();
        }

        return px2.getY();
    }

    getStartingPixel(px2){
        return new Pixel(this.getStartingX(px2), this.getStartingY(px2));
    }

}


