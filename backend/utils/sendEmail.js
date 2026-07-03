const nodemailer = require("nodemailer");

const sendEmail = async(to,subject, text) =>{
    try{
        const transporter = nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            }
        });
        const mailOptions ={
            from:process.env.EMAIL_USER,
            to,
            subject,
            html:text
        }
        await transporter.sendMail(mailOptions)
    }catch(error){
        console.error("Enail Error:",error.message);
        throw new Error(error.message);
    }
}

module.exports = sendEmail;