import nodemailer from 'nodemailer';
import { logger } from './logger';

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports (587, 2525)
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
        logger.info('Email sent successfully', {
            messageId: info.messageId,
        });
        return true;
    } catch (error) {
        logger.error('Failed to send email', error);
        return false;
    }
};
