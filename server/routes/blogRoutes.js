import express from 'express';
import Blog from '../models/Blog.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';
import { v2 as cloudinary } from 'cloudinary';

const blogRouter = express.Router();

// Get all blogs
blogRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Get single blog
blogRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Create blog (admin only)
blogRouter.post('/', adminAuth, upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 5 }
]), async (req, res) => {
  try {
    const { title, content, tags, category } = req.body;

    // Upload main image
    const mainImageResult = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
      resource_type: 'image'
    });

    // Upload gallery images
    let galleryImages = [];
    if (req.files.galleryImages) {
      for (const file of req.files.galleryImages) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image'
        });
        galleryImages.push(result.secure_url);
      }
    }

    const blog = new Blog({
      title,
      content,
      mainImage: mainImageResult.secure_url,
      galleryImages,
      tags: tags ? JSON.parse(tags) : [],
      category
    });

    await blog.save();
    res.json({ success: true, message: 'Blog created successfully', blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Update blog (admin only)
blogRouter.put('/:id', adminAuth, upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 5 }
]), async (req, res) => {
  try {
    const { title, content, tags, category } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' });
    }

    let updateData = { title, content, tags: tags ? JSON.parse(tags) : [], category };

    // Update main image if provided
    if (req.files && req.files.mainImage) {
      const mainImageResult = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
        resource_type: 'image'
      });
      updateData.mainImage = mainImageResult.secure_url;
    }

    // Update gallery images if provided
    if (req.files && req.files.galleryImages) {
      let galleryImages = [];
      for (const file of req.files.galleryImages) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image'
        });
        galleryImages.push(result.secure_url);
      }
      updateData.galleryImages = galleryImages;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Delete blog (admin only)
blogRouter.delete('/:id', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Add comment to blog
blogRouter.post('/:id/comments', async (req, res) => {
  try {
    const { name, email, comment } = req.body;

    // Validate input
    if (!name || !email || !comment) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' });
    }

    // Find blog
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' });
    }

    // Sanitize comment (basic HTML stripping)
    const sanitizedComment = comment.replace(/<[^>]*>/g, '').trim();

    if (sanitizedComment.length > 500) {
      return res.json({ success: false, message: 'Comment must be less than 500 characters' });
    }

    // Add comment
    const newComment = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      comment: sanitizedComment
    };

    blog.comments.push(newComment);
    await blog.save();

    res.json({
      success: true,
      message: 'Comment added successfully',
      comment: blog.comments[blog.comments.length - 1]
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.json({ success: false, message: 'Failed to add comment' });
  }
});

// Get comments for a blog
blogRouter.get('/:id/comments', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select('comments');
    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' });
    }

    res.json({
      success: true,
      comments: blog.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.json({ success: false, message: 'Failed to fetch comments' });
  }
});

// Delete comment (email verification required)
blogRouter.delete('/:blogId/comments/:commentId', async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: 'Email is required to delete comment' });
    }

    // Find blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' });
    }

    // Find comment
    const comment = blog.comments.id(commentId);
    if (!comment) {
      return res.json({ success: false, message: 'Comment not found' });
    }

    // Verify email matches
    if (comment.email.toLowerCase() !== email.toLowerCase().trim()) {
      return res.json({ success: false, message: 'You can only delete your own comments' });
    }

    // Remove comment
    blog.comments.pull(commentId);
    await blog.save();

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.json({ success: false, message: 'Failed to delete comment' });
  }
});

export default blogRouter;

