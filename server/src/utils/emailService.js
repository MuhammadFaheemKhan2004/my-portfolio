import nodemailer from 'nodemailer';

let transporter = null;

const getTransporter = () => {
    if (!transporter) {
        console.log('📧 Email Config:', {
            user: process.env.EMAIL_USER,
            passwordSet: !!process.env.EMAIL_PASSWORD
        });

        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    return transporter;
};

export const verifyEmailService = () => {
    getTransporter().verify((error, success) => {
        if (error) {
            console.error('❌ Email transporter error:', error.message);
        } else {
            console.log('✅ Email service ready');
        }
    });
};

export const sendEmail = async (to, subject, html) => {
    try {
        console.log(`📤 Sending email to: ${to}, Subject: ${subject}`);
        const info = await getTransporter().sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
        console.log('✅ Email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Email error:', error.message);
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
