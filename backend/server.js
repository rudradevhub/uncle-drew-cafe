require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); 

// Allowed Links (Local + Production)
const allowedOrigins = [
    'http://localhost:3000', 
    'https://www.uncledrewcafe.com.au', 
    'https://uncledrewcafe.com.au'
];

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['POST']
}));

// Body Parser Middleware
app.use(express.json());

// Rate Limiting (Prevent spam: max 5 requests per 15 minutes per IP)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/contact', limiter);
app.use('/api/contact', contactRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});