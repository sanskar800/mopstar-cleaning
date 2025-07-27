
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
    galleryImages: {
        type: [String],
        validate: [arrayLimit, 'Gallery images cannot exceed 5']
    },
    tags: [String],
    category: {
        type: String,
        enum: ['Featured', 'Advice', 'Guidelines', 'Tips', 'Other'],
        default: 'Other'
    },
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

function arrayLimit(val) {
    return val.length <= 5;
}

blogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;

