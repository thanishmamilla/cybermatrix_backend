import express from 'express';
import mongoose from 'mongoose';

import Review from '../models/review.model.js';
import { isLoggedIn } from '../middlewares/auth.middlewares.js'; // Using isLoggedIn instead of isAuthenticated

const router = express.Router();

// Add a new review
router.post('/add', isLoggedIn, async (req, res) => {
    const { courseId, rating, comment } = req.body;

    try {
        const newReview = new Review({
            courseId: mongoose.Types.ObjectId(courseId), // Convert to ObjectId
            userId: req.user._id,  // Assuming user info is available from middleware
            rating,
            comment,
        });

        await newReview.save();

        res.status(201).json({
            success: true,
            message: 'Review added successfully!',
            review: newReview,
        });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to add review',
            error: error.message,
        });
    }
});
// Get reviews for a course
router.get('/:courseId', async (req, res) => {
    try {
        const reviews = await Review.find({ courseId: req.params.courseId }).populate('userId', 'name');
        res.status(200).json({
            success: true,
            reviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews',
        });
    }
});

export default router;
