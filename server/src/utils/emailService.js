import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
        return true;
    } catch (error) {
        console.error('Email error:', error);
        return false;
    }
};

export const sendContactConfirmation = async (email, name) => {
    const html = `
    <h2>Thank you for reaching out!</h2>
    <p>Hi ${name},</p>
    <p>I've received your message and will get back to you as soon as possible.</p>
    <p>Best regards,<br>Muhammad Faheem Khan</p>
  `;

    return sendEmail(email, 'Message Received - Portfolio', html);
};

export const sendContactNotification = async (name, email, subject, message) => {
    const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;

    return sendEmail(process.env.EMAIL_USER, `New Message: ${subject}`, html);
};
