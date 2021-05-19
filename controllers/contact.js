const PASSWORD = process.env.PASSWORD;
const nodemailer = require('nodemailer');

const contactController = () => { };

const fromEmail = process.env.fromEmail;
const toEmail = process.env.toEmail;
const toEmailBCC = process.env.toEmailBCC;

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
    let jobTitle = req.body.jobTitle;
    let company = req.body.company;
    let liquidity = req.body.liquidity;
    let subject = `Message from ${name} at Bakhu Website`;
    // console.log(req)
    let body = `From ${name} \nEmail: ${email} \nPhone: ${phone} \nJob Title: ${jobTitle} \nCompany: ${company} \nLiquidity: ${liquidity}\n\n${message}`;

    // const from = name && email ? `${name} <${email}>` : `${name || email}`
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        bcc: toEmailBCC,
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