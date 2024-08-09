const nodemailer = require("nodemailer");
const { senderEmail, emailPassword } = require("../config/keys");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: senderEmail,
        pass: emailPassword,
      },
    });

    const message = {
      from: senderEmail, // Include the sender email address
      to: emailTo,
      subject,
      html: `<div>
          <h3>Use the code below to ${content}</h3>
          <p><strong>Code:</strong> ${code}</p>
        </div>`,
    };

    await transporter.sendMail(message);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
