const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
//import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
var fs = require('fs');
// var download = require('download');

// async function modifyPdf() {
// }

async function modifyPdf() {

const existingPdfBytes = fs.readFileSync('certificate.pdf');
 
// Load a PDFDocument from the existing PDF bytes
const pdfDoc = await PDFDocument.load(existingPdfBytes)
 
// Embed the Helvetica font
const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
 
// Get the first page of the document
const pages = pdfDoc.getPages()
const firstPage = pages[0]
 
// Get the width and height of the first page
const { width, height } = firstPage.getSize()
 
// Draw a string of text diagonally across the first page
firstPage.drawText('This text was added with JavaScript!', {
  x: 5,
  y: height / 2,
  size: 50,
  font: helveticaFont,
  color: rgb(0.95, 0.1, 0.1),
})
 
 
// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

fs.writeFileSync('editedDoc.pdf', pdfBytes);

};

modifyPdf();

//module.exports = modifyPdf;

//width of name subtracted by the width divided by two


//express 
