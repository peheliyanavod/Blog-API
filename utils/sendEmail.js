const nodemailer = require("nodemailer");

const sendEmail = async ({emailTo, subject, code, content}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use STARTTLS, not direct SSL/TLS
        auth: {
            user: "hwpeheliya@gmail.com",
            pass: "bslsoarpggewshra"
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    const message = {
        from: 'Blog app <hwpeheliya@gmail.com>',
        to: emailTo,
        subject,
        html:`
            <div>
                <h3>Use this below code to ${content}</h3>
                <p><strong>Code: </strong>${code}</p>
            </div>
        `
    };

    // try {
    //     await transporter.sendMail(message);
    //     console.log('Email sent successfully');
    // } catch (error) {
    //     console.error('Error sending email:', error);
    //     throw new Error('Email could not be sent');
    // }

    transporter.sendMail(message, (err) => {
        if (err) {
          console.log("Error occurred. " + err.message);
        }
      });
}

module.exports = sendEmail;
