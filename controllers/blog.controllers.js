// controllers/blog.controller.js
import Blog from '../models/blog.model.js'; // Assuming you have a Blog model

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const newBlog = await Blog.create({ title, content, author });

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            blog: newBlog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};
