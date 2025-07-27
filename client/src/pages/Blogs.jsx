import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Featured', 'Advice', 'Guidelines', 'Tips', 'Other'];

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        },
    };

    const elementVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
            const response = await axios.get(`${baseUrl}/blogs`);
            if (response.data.success) {
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBlogs = selectedCategory === 'All'
        ? blogs
        : blogs.filter(blog => blog.category === selectedCategory);

    const truncateContent = (content, maxLength = 150) => {
        if (typeof content !== 'string') {
            return 'No content available';
        }
        const textContent = content.replace(/<[^>]*>/g, '');
        return textContent.length > maxLength
            ? textContent.substring(0, maxLength) + '...'
            : textContent;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading blogs...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Hero Section */}
                <motion.section
                    className="text-center mb-16"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="border-l-4 border-blue-500 pl-4 mb-6 inline-block"
                        variants={elementVariants}
                    >
                        <span className="text-blue-600 font-semibold text-xl">Our Blog</span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                        variants={elementVariants}
                    >
                        Cleaning Tips &
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Insights</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        variants={elementVariants}
                    >
                        Expert advice and professional guidelines from Mopstar Cleaning.
                        Discover the secrets to maintaining a spotless environment.
                    </motion.p>
                </motion.section>

                {/* Category Filter Section */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <motion.h2
                            className="text-2xl font-bold text-gray-900 mb-6 text-center"
                            variants={elementVariants}
                        >
                            Browse by Category
                        </motion.h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md hover:shadow-lg'
                                        }`}
                                    variants={elementVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Blog Grid Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="border-l-4 border-blue-500 pl-4 mb-8"
                        variants={elementVariants}
                    >
                        <h2 className="text-3xl font-bold text-gray-900">
                            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
                        </p>
                    </motion.div>

                    {filteredBlogs.length === 0 ? (
                        <motion.div
                            className="bg-white rounded-2xl shadow-lg p-12 text-center"
                            variants={elementVariants}
                        >
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                            <p className="text-gray-500">
                                {selectedCategory === 'All'
                                    ? 'No articles are available at the moment.'
                                    : `No articles found in the "${selectedCategory}" category.`
                                }
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, index) => (
                                <motion.div
                                    key={blog._id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    variants={elementVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Link to={`/blogs/${blog._id}`} className="block h-full">
                                        <div className="relative overflow-hidden">
                                            <motion.img
                                                src={blog.mainImage}
                                                alt={blog.title}
                                                className="w-full h-56 object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm text-blue-800 text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                                                    {blog.category}
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <div className="flex items-center bg-white/90 backdrop-blur-sm text-yellow-600 text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                                                    <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                    <span>4.8</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-gray-500 text-sm font-medium">
                                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.13 8.13 0 01-3.618-.82L3 21l1.82-6.382A8.13 8.13 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                                                    </svg>
                                                    {blog.comments?.length || 0}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                                {truncateContent(blog.content)}
                                            </p>

                                            {blog.tags && blog.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                                                        <span
                                                            key={tagIndex}
                                                            className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition-colors duration-300"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {blog.tags.length > 3 && (
                                                        <span className="text-gray-400 text-xs px-2 py-1">
                                                            +{blog.tags.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300">
                                                    <span>Read More</span>
                                                    <motion.svg
                                                        className="w-4 h-4 ml-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        whileHover={{ x: 5 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </motion.svg>
                                                </div>
                                                <div className="text-gray-400 text-sm">
                                                    {Math.ceil(blog.content?.replace(/<[^>]*>/g, '').length / 200) || 1} min read
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.section>

                {/* Call to Action Section */}
                <motion.section
                    className="mt-16"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-4"
                            variants={elementVariants}
                        >
                            Need Professional Cleaning?
                        </motion.h2>
                        <motion.p
                            className="text-xl mb-8 opacity-90"
                            variants={elementVariants}
                        >
                            Get expert cleaning services from Mopstar Cleaning today!
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            variants={elementVariants}
                        >
                            <Link
                                to="/contact"
                                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                Get Quote
                            </Link>
                            <Link
                                to="/services"
                                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                View Services
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default Blogs;
