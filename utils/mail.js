var nodemailer = require('nodemailer');

var mailerhbs = require('nodemailer-express-handlebars');

const path = require('path');


// point to the template folder
const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve('./templates/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./templates/'),
};


exports.mailCmd  = (to , subject , nom , lienCmd , idComande ) => {
  var transporter=nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mailerdii16@gmail.com",
      pass: "layelaye",
    },
  });
      var mailOptions = {
        from: '"Atimex" <mailerdii16@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject,
        template: 'email', // the name of the template file i.e email.handlebars
        context:{
            numeroCmd : subject ,
            lienCmd : lienCmd ,
            idComande : idComande,
            name: nom, // replace {{name}} with Adebola
            company: 'Atimex' // replace {{company}} with My Company
        }
      };

      transporter.use('compile', mailerhbs(handlebarOptions))
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}