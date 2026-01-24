import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { sendEmail } from '../utility/email';
import redisClient from '../db/redis';

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user: any = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    // Store in Redis with 10 min expiry (600 seconds)
    // Key: otp:{email}
    await redisClient.setEx(`otp:${email}`, 600, hashedOtp);

    // Send Email
    await sendEmail(
      email,
      'Password Reset OTP',
      `Your OTP for password reset is: ${otp}. It expires in 10 minutes.`,
      `<h3>Password Reset Request</h3><p>Your OTP is: <b>${otp}</b></p><p>It expires in 10 minutes.</p>`
    );

    res.status(200).json({ message: 'OTP sent to email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'Email, OTP, and new password are required' });
  }

  try {
    const user: any = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get OTP from Redis
    const storedHashedOtp = await redisClient.get(`otp:${email}`);

    if (!storedHashedOtp) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    // Verify OTP
    const isMatch = await bcrypt.compare(otp, storedHashedOtp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Hash new password using MD5 (Legacy requirement)
    // We need to import crypto for this.
    const crypto = require('crypto');
    const hashedPassword = crypto.createHash('md5').update(newPassword).digest('hex');

    // Update password
    user.password = hashedPassword;
    
    // Note: We don't need to clear OTP from user model anymore
    // But we should delete it from Redis
    await redisClient.del(`otp:${email}`);
    
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
