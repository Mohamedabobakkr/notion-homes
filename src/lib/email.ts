import nodemailer from 'nodemailer';

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async (data: EmailPayload) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: data.to,
        subject: data.subject,
        html: data.html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
