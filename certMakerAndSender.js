const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const csv = require('csv-parser');
const fontkit = require('@pdf-lib/fontkit');
var fs = require('fs');
var nodemailer = require('nodemailer');


async function modifyTemplate(name) {
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
const text = name
const textSize = 45
const textWidth = customFont.widthOfTextAtSize(text, textSize)
const textHeight = customFont.heightAtSize(textSize)

  // Draw a string of text diagonally across the first page
  console.log('width of page is', width);
  console.log('height of page is', height);
  console.log('width of text is', textWidth);
  console.log('height of text is', textHeight);

  firstPage.drawText(text, {
    x: (width-textWidth)/2,
    y: (height-textHeight)/2+90,
    size: textSize,
    font: customFont,
    color: rgb(0.95, 0.1, 0.1),
  })


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  fs.writeFileSync('./finishedCertificates/'+name+'.pdf', pdfBytes);

};

function csvToCert(fileLocation){
  fs.createReadStream(fileLocation)
  .pipe(csv())
  .on('data', function (data){ 
    modifyTemplate(data.NAME)
    sendCSVToMail(data.EMAIL, "laonglaan17", "mgabagongrizal19@gmail.com",data.NAME+".pdf")
  })
  .on('end', () => {
    console.log('done');
  });
}

function sendCSVToMail(to, pass, from, filename){
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
         service: 'gmail',
         auth: {
           user: from,
           pass: pass
         },
         tls: {
           rejectUnauthorized: false
       }
       });
       var mailOptions = {
        from: from,
        to: to,
        subject: 'MBR 2019 Webinar Certificate',
        text: 'Thank you for participating in the Agapay: Makabagong Gabay para as Modernong Pilipino webinar series.',
        attachments: [
          {   // file on disk as an attachment
              filename: filename,
              path: __dirname+'/finishedCertificates/'+filename// stream this file
          }
      ]
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


csvToCert('MentalHealth.csv');
