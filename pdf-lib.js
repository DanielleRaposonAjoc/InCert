const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
var fs = require('fs');

async function modifyPdf() {
  const fontBytes = fs.readFileSync('Alesandra.ttf');
  const existingPdfBytes = fs.readFileSync('certificate.pdf');

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  // Register the `fontkit` instance
  pdfDoc.registerFontkit(fontkit)

  // Embed our custom font in the document
  const customFont = await pdfDoc.embedFont(fontBytes)

  // Get the first page of the document
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize()

  // Create a string of text and measure its width and height in our custom font
const text = 'Danenosaurus Rex'
const textSize = 50
const textWidth = customFont.widthOfTextAtSize(text, textSize)
const textHeight = customFont.heightAtSize(textSize)

  // Draw a string of text diagonally across the first page
  console.log('width of page is', width);
  console.log('height of page is', height);
  console.log('width of text is', textWidth);
  console.log('height of text is', textHeight);

  firstPage.drawText(text, {
    x: (width-textWidth)/2,
    y: (height-textHeight)/2+60,
    size: textSize,
    font: customFont,
    color: rgb(0.95, 0.1, 0.1),
  })


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  fs.writeFileSync('editedDoc.pdf', pdfBytes);

};

modifyPdf();

