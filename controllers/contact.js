const PASSWORD = process.env.PASSWORD;
const nodemailer = require('nodemailer');

const contactController = () => { };

const fromEmail = process.env.fromEmail;
const toEmail = process.env.toEmail;

const transporter = nodemailer.createTransport({
  service: 'AOL',
  auth: {
    user: fromEmail,
    pass: PASSWORD
  }
});

contactController.sendEmail = (req, res, next) => {

	res.set({
      'Access-Control-Allow-Origin': '*'
    })
    req.headers['Access-Control-Allow-Origin'] = '*'

    let email = req.body.email;
    let phone = req.body.phone;
    let name = req.body.name;
    let message = req.body.message;
    let subject = `Message from ${name} at Bakhu Website`;
    // console.log(req)
    let body = `From ${name} \nEmail: ${email} \nPhone: ${phone}\n\n${message}`;

    // const from = name && email ? `${name} <${email}>` : `${name || email}`
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: body
    };
    // console.log(mailOptions)
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({
                success: false,
                response: error
            });
            // res.redirect('back');
        }else{
            console.log('Message sent: ' + info.response);
            res.json({
                success: true,
                response: info.response
            });
            // res.redirect('back');
        };
    });

};


module.exports = contactController;