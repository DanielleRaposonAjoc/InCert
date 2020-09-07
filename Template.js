const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const Page = require('./Page.js');
const Pixel = require('./Pixel.js');
const Font = require('./Font.js');
const Align = require('./Align.js');

const ContentBox = require('./ContentBox.js');

var fs = require('fs');
class Template{
    constructor(file){
        this.file=file;
        this.numPages= file.getPages().length;
        this.fonts={};

    }

    getFont(name){
        // console.log(this.fonts[name]);
        return this.fonts[name];
    }
    getNumPages(){
        return this.numPages;
    }

    getPage(pageNum){
        if(pageNum<0 || pageNum>=this.getNumPages()){
            return;
        }
        return this.file.getPages()[pageNum];
    }

    getPageWidth(page){
        return page.getSize().width;
    }

    getPageHeight(page){
        return page.getSize().height;
    }

    async addFont(name,font){
        // console.log("TEXT HEIGHT AT SIZE: "+embeddedFont.heightAtSize(12));
        this.fonts[name]=await this.file.embedFont(font);
        // console.log("TEXT HEIGHT AT SIZE: "+this.getFont(name).heightAtSize(12));
    }

    async publishTemplate(){
        const pdfBytes = await this.file.save()

        fs.writeFileSync('./finishedCertificates/'+'testRun'+'.pdf', pdfBytes);
    }

    
}



async function trial(){
    const existingPdfBytes = fs.readFileSync('certificate.pdf');
    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    pdf = new Template(pdfDoc);
    await pdf.addFont("timesNewRoman", StandardFonts.TimesRoman);



    var page=new Page(pdf.getPage(0));
    // console.log("width"+page.getWidth());
    // console.log("height"+page.getHeight());
    var font= await pdf.getFont("timesNewRoman");
    var text ="howdeedoo young maiden I am the grock of the south";
    var charLength=30;
    // await console.log(font);
    var align= new Align("center", "center");
    var cb=await new ContentBox(page,new Pixel(100,100), new Pixel(300,300), new Font(font), align, text, charLength);
    await cb.setAlignVerticalCenter();
    await cb.setAlignHorizontalCenter();
    // console.log("content box width: "+cb.getContentBoxWidth());
    // console.log("content box height: "+cb.getContentBoxHeight());



    // console.log("NUMBER OF CHARS VERTICALLY: "+cb.getNumberOfLines());
    // console.log("NUMBER OF CHARS HORIZONTALLY: "+cb.getCharLenghtPerLine());


    page.addContentBox(cb);

    page.drawAllBoxMargins();
    page.drawAllContentBoxes();

    pdf.publishTemplate();

}

trial();

// pdf = new Template(pdfDoc);
// console.log("num of pages: "+pdf.getNumPages());
// page=pdf.getPage(0);
// console.log("width of first page: "+pdf.getPageWidth(page));
// console.log("height of first page: "+pdf.getPageHeight(page));