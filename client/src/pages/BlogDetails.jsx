import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, User, Tag, ArrowLeft, MessageCircle, Trash2, Clock, Eye } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, commentId: null });
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deletingComment, setDeletingComment] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleCommentDelete = async (commentId) => {
    setDeletingComment(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const response = await axios.delete(`${baseUrl}/blogs/${id}/comments/${commentId}`, {
        data: { email: deleteEmail }
      });

      if (response.data.success) {
        setComments(comments.filter(comment => comment._id !== commentId));
        setDeleteModal({ show: false, commentId: null });
        setDeleteEmail('');
        toast.success('Comment deleted successfully!');
      } else {
        toast.error(response.data.message || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    } finally {
      setDeletingComment(false);
    }
  };

  const openDeleteModal = (commentId) => {
    setDeleteModal({ show: true, commentId });
    setDeleteEmail('');
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, commentId: null });
    setDeleteEmail('');
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const response = await axios.get(`${baseUrl}/blogs/${id}`);
      if (response.data.success) {
        setBlog(response.data.blog);
        setComments(response.data.blog.comments || []);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmittingComment(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const response = await axios.post(`${baseUrl}/blogs/${id}/comments`, commentForm);

      if (response.data.success) {
        setComments([response.data.comment, ...comments]);
        setCommentForm({ name: '', email: '', comment: '' });
        toast.success('Comment added successfully!');
      } else {
        toast.error(response.data.message || 'Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28">
        <div className="flex items-center justify-center py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-300 rounded-full animate-pulse mx-auto"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Article</h3>
            <p className="text-gray-500">Please wait while we fetch the content...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28">
        <div className="flex items-center justify-center py-20">
          <motion.div
            className="text-center max-w-md mx-auto px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">The article you're looking for doesn't exist or may have been removed.</p>
            <Link
              to="/blogs"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const allImages = [blog.mainImage, ...(blog.galleryImages || [])];

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Navigation */}
        <motion.div className="mb-8" variants={itemVariants}>
          <Link
            to="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Main Article */}
        <motion.article className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12" variants={itemVariants}>
          {/* Hero Image */}
          <div className="relative">
            <motion.img
              src={allImages[selectedImage]}
              alt={blog.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center bg-white/95 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Tag className="w-3 h-3 mr-2" />
                {blog.category}
              </span>
            </div>


          </div>

          {/* Image Gallery */}
          {allImages.length > 1 && (
            <div className="px-6 sm:px-8 lg:px-12 py-6 bg-gray-50 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Gallery ({allImages.length})</h4>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${selectedImage === index
                        ? 'ring-2 ring-blue-500 shadow-lg'
                        : 'hover:ring-2 hover:ring-blue-300 hover:shadow-md'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-blue-500/20"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                <span>{formatTime(blog.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
              </div>
            </div>

            {/* Title */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight"
              variants={itemVariants}
            >
              {blog.title}
            </motion.h1>

            {/* Content */}
            <motion.div
              className="prose prose-lg prose-blue max-w-none mb-10"
              variants={itemVariants}
            >
              <div
                className="text-gray-700 leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </motion.div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <motion.div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100" variants={itemVariants}>
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium transition-colors duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </motion.article>

        {/* Comments Section */}
        <motion.section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12" variants={itemVariants}>
          {/* Section Header */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-blue-500 rounded-full mr-4"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Comments ({comments.length})
              </h2>
            </div>
            <p className="text-gray-600 text-lg">Join the conversation and share your thoughts</p>
          </div>

          {/* Comment Form */}
          <motion.div
            className="mb-12 p-6 sm:p-8 bg-gray-50 rounded-xl border border-gray-100"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add Your Comment</h3>
            <form onSubmit={handleCommentSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                    required
                    maxLength="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Comment <span className="text-red-500">*</span>
                  <span className="text-gray-400 font-normal">({commentForm.comment.length}/500)</span>
                </label>
                <textarea
                  value={commentForm.comment}
                  onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Share your thoughts and insights..."
                  required
                  maxLength="500"
                />
              </div>
              <motion.button
                type="submit"
                disabled={submittingComment}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-md"
                whileHover={{ scale: submittingComment ? 1 : 1.05 }}
                whileTap={{ scale: submittingComment ? 1 : 0.95 }}
              >
                {submittingComment ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Publishing...
                  </div>
                ) : (
                  'Publish Comment'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <motion.div className="text-center py-16" variants={itemVariants}>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">No comments yet</h4>
                <p className="text-gray-500 max-w-md mx-auto">Be the first to start the conversation and share your thoughts on this article.</p>
              </motion.div>
            ) : (
              comments.map((comment, index) => (
                <motion.div
                  key={comment._id || index}
                  className="border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-300"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {comment.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h5 className="font-bold text-gray-900">{comment.name}</h5>
                          <span className="text-gray-300">•</span>
                          <time className="text-gray-500 text-sm">{formatDate(comment.createdAt)}</time>
                        </div>
                        <motion.button
                          onClick={() => openDeleteModal(comment._id)}
                          className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-50 text-sm font-medium px-3 py-1 rounded-lg transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Delete this comment"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </motion.button>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>

        {/* Delete Modal */}
        {deleteModal.show && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Comment</h3>
                <p className="text-gray-600">
                  Please enter your email to confirm deletion of this comment.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={closeDeleteModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => handleCommentDelete(deleteModal.commentId)}
                  disabled={deletingComment || !deleteEmail.trim()}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                  whileHover={{ scale: deletingComment || !deleteEmail.trim() ? 1 : 1.02 }}
                  whileTap={{ scale: deletingComment || !deleteEmail.trim() ? 1 : 0.98 }}
                >
                  {deletingComment ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Deleting...
                    </div>
                  ) : (
                    'Delete Comment'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BlogDetails;