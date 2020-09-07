var nodemailer = require('nodemailer');

var emails=[
    "jarrod.frami@ethereal.email",
    "missouri.runolfsson77@ethereal.email",
    "dereck46@ethereal.email"
]

var transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
  service: 'gmail',
  auth: {
    user: 'elleinadkwah@gmail.com',
    pass: 'nuggets2016'
  },
  tls: {
    rejectUnauthorized: false
}
});

emails.forEach((email,index)=>{
    var mailOptions = {
        from: 'elleinadkwah@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        attachments: [
          {   // file on disk as an attachment
              filename: 'certificate.pdf',
              path: __dirname+'/certificate.pdf' // stream this file
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

    console.log((index+1)+"/"+email.length);
});
