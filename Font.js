const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
var fs = require('fs');

module.exports=class Font{
    constructor(font){
        this.font=font;
        this.fontSize=12;
        this.fontColor=rgb(0.95, 0.1, 0.1);
        this.fontHeight = this.font.heightAtSize(12);
    }
    getFont(){
        return this.font;
    }
    getFontSize(){
        return this.fontSize;
    }
    getFontColor(){
        return this.fontColor;
    }
    getFontHeight(){
        return this.fontHeight;
    }
}