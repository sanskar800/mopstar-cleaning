import express from 'express';
import nodemailer from 'nodemailer';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';

const contactRouter = express.Router();

// CORS configuration
contactRouter.use(
  cors({
    origin: ['http://localhost:3000', 'https://www.mopstarcleaning.com'],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // For legacy browsers
  })
);

// Rate limiting for contact form - 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Configure Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASS
    },
    debug: true, // Enable debug output
    logger: true
  });
};

// Validate input data
const validateContactData = (name, email, message) => {
  const errors = [];

  // Name validation
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.trim().length > 50) {
    errors.push('Name must be less than 50 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email.trim())) {
    errors.push('Please enter a valid email address');
  }

  // Message validation
  if (!message || message.trim().length === 0) {
    errors.push('Message is required');
  } else if (message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (message.trim().length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  return errors;
};

// Sanitize input to prevent basic XSS
const sanitizeInput = (input) => {
  return input.replace(/<[^>]*>/g, '').trim();
};

// Contact form submission
contactRouter.post('/', contactLimiter, async (req, res) => {
  try {
    console.log('Received contact form data:', req.body);
    const { name, email, message, service } = req.body;

    // Validate input
    const validationErrors = validateContactData(name, email, message);
    console.log('Validation errors:', validationErrors);

    if (validationErrors.length > 0) {
      console.log('Validation failed:', validationErrors.join(', '));
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', ')
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = sanitizeInput(message);

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Transporter verified successfully');
    } catch (error) {
      console.error('Transporter verification failed:', error.message, error);
      throw new Error('Email service configuration error');
    }

    // Email content
    const mailOptions = {
      from: `"Mopstar Cleaning" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New ${service || 'Contact'} Form Submission from ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">
            New ${service || 'Contact'} Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="margin: 10px 0;"><strong>Service:</strong> ${service || 'N/A'}</p>
            <p style="margin: 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              This message was sent from the Mopstar Cleaning website contact form.
              <br>Please respond to the customer directly at: ${sanitizedEmail}
            </p>
          </div>
        </div>
      `,
      text: `
You have received a new contact form message from the Mopstar Cleaning website:

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Service: ${service || 'N/A'}
Submitted: ${new Date().toLocaleString()}

Message:
${sanitizedMessage}

Please respond to the user directly at ${sanitizedEmail} if needed.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', process.env.RECEIVER_EMAIL);

    // Success response
    res.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you shortly.'
    });
  } catch (error) {
    console.error('Contact form error:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
      requestBody: req.body
    });

    // Check if it's a nodemailer authentication error
    if (error.code === 'EAUTH') {
      console.error('Email authentication failed. Please check your email credentials.');
      return res.status(500).json({
        success: false,
        message: 'Email service temporarily unavailable. Please try again later.'
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Health check endpoint
contactRouter.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Contact service is running',
    timestamp: new Date().toISOString()
  });
});

export default contactRouter;
