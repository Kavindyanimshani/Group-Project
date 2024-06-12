const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();
const pool = require('./db'); // Assuming you're using a connection pool for your database

// Endpoint to request a password reset
// Endpoint to reset the password
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Find user by reset token
        const [user] = await pool.query('SELECT * FROM students WHERE resetToken = ?', [token]);

        if (!user || user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update user's password and remove reset token
        await pool.query('UPDATE students SET password = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE studentId = ?', [newPassword, user.studentId]);

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

