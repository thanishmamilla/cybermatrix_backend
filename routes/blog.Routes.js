import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Create a new blog
router.post('/', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.status(201).json({ success: true, blog: newBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
