const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.submitContactForm = async (req, res) => {
    // 1. Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, message } = req.body;

    try {
        // 2. Email sent to Uncle Drew Cafe (You)
        const mailToOwner = {
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Sent via your authenticated email
            replyTo: email, // If you hit "Reply", it goes to the customer
            to: process.env.EMAIL_USER, // Your receiving email
            subject: 'New Contact Form Submission | Uncle Drew Cafe',
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`
        };

        // 3. Auto-reply sent to the Visitor
        const mailToVisitor = {
            from: `"Uncle Drew Cafe" <${process.env.EMAIL_USER}>`,
            to: email, // Send to the customer's email
            subject: 'We received your message | Uncle Drew Cafe',
            text: `Hi ${name},\n\nThank you for contacting Uncle Drew Cafe.\n\nWe've received your message and will get back to you as soon as possible.\n\nHave a great day!\n\n— Uncle Drew Cafe`
        };

        // 4. Send both emails concurrently
        await Promise.all([
            transporter.sendMail(mailToOwner),
            transporter.sendMail(mailToVisitor)
        ]);

        // 5. Send success response to frontend
        res.status(200).json({ message: 'Message sent successfully.' });

    } catch (error) {
        console.error('Nodemailer Error:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
};