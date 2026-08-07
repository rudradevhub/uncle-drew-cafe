import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Create the mail transporter using your Gmail environment variables
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // <-- FIXED: changed from smlp to smtp
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // <-- FIXED: changed from EMATI_USER to EMAIL_USER
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sends the message to your own email
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
  }
}