var fs = require('fs');
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const Pixel = require('./Pixel.js');
const Align = require('./Align.js');
const Box = require('./Box.js');
const wrap = require('./wrap.js');


module.exports=class ContentBox {
    //uses weird axis thing where y is starting at the lowest so i did a subtract thing
    constructor(page,p1,p2,font, align, text, charLength) {
        this.text=wrap(text, charLength);
        // this.text=["LLLLLLLLLLL", "but joke onlyyyy", "hehehehheheh", "got you"];

        this.page=page;
        this.align=align;
        this.box= new Box(p1,p2,this.page);
        this.font = font;


        // this.charLengthPerLine = this.box.getBoxWidth/(this.font.getFont().widthOfTextAtSize("W", this.font.getFontSize()));
        // this.numberOfLines = this.box.getBoxHeight/this.font.getFont().heightAtSize(this.font.getFontSize());

    }


    setAlignVerticalTop(){
        this.align.setAlignVerticalTop();
    }
    setAlignVerticalCenter(){
        this.align.setAlignVerticalCenter();
    }
    setAlignVerticalBottom(){
        this.align.setAlignVerticalBottom();
    }
    setAlignHorizontalLeft(){
        this.align.setAlignHorizontalLeft();
    }
    setAlignHorizontalCenter(){
        this.align.setAlignHorizontalCenter();
    }
    setAlignHorizontalRight(){
        this.align.setAlignHorizontalRight();
    }
    setFont(font){
        this.font=font;
        this.setCharLengths();
    }
    setFontSize(size){
        this.getfontSize()= size;
        this.setCharLengths();
    }


    getStartingPixel(){
        return this.box.getStartingPixel();
    }
    getContentBoxWidth() {
        return this.box.getBoxWidth();
    }

    getContentBoxHeight() {
        return this.box.getBoxHeight();
    }
    getSpacing(){
        return this.box.getBoxSpacing();
    }

    getNumberOfLines(){
        return this.numberOfLines;
    }

    getCharLenghtPerLine(){
        return this.charLengthPerLine;
    }

    async drawContentBox(page) {
        

        var totalVerticalHeight = ((this.font.getFontHeight())*this.text.length)+(this.getSpacing()*(this.text.length-1));

        var startDrawingPixelY = this.align.getStartDrawingPixelY(this,totalVerticalHeight);

        var fh=await this.font.getFontHeight();
        var lineHeight= fh;

        for(var i=0; i<this.text.length ; i++){
            
            console.log("lineheight1");
            console.log(lineHeight);
            const currText=this.text[i];
            const currTextLength=this.font.getFont().widthOfTextAtSize(currText, this.font.getFontSize());
            var startDrawingPixelX = this.align.getStartDrawingPixelX(this,currTextLength);

            console.log("X");
            console.log(startDrawingPixelX);
            console.log("Y");
            console.log(startDrawingPixelY);


            
            page.drawText(
                currText, {
                    x: startDrawingPixelX,
                    y: startDrawingPixelY-lineHeight,
                    size: this.font.getFontSize(),
                    font: this.font.getFont(),
                    color: this.font.getFontColor(),
                }
            );

            lineHeight= (lineHeight+fh+this.getSpacing());
        }

    }


    drawBoxMargins(page){
        page.drawRectangle({
            x: this.getStartingPixel().getX(),
            y: this.getStartingPixel().getY(),
            width: this.box.getBoxWidth(),
            height: -(this.box.getBoxHeight()),
            borderColor: rgb(1, 0, 0),
            borderWidth: 1,
        });
    }




}
