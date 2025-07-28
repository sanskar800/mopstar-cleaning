import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaBehance, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import mopstarLogo from '../assets/images/mopstar- 1.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const handleBookService = () => {
        navigate('/services');
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation variants for navbar sections
    const sectionVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    // Animation variants for mobile menu
    const mobileMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    return (
        <motion.nav
            className="w-full fixed top-0 z-50"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Top Bar */}
            <motion.div
                className="bg-[#00ADEE] text-white px-4 py-2 w-full"
                variants={sectionVariants}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center justify-between">
                        {/* Social Media Links */}
                        <div className="flex space-x-4">
                            <motion.a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 hover:scale-110 transition-all duration-300 p-1"
                                aria-label="Facebook"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaFacebookF />
                            </motion.a>
                            <motion.a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 hover:scale-110 transition-all duration-300 p-1"
                                aria-label="Twitter"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaTwitter />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-200 hover:scale-110 transition-all duration-300 p-1"
                                aria-label="Instagram"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaInstagram />
                            </motion.a>
                            <motion.a
                                href="https://behance.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 hover:scale-110 transition-all duration-300 p-1"
                                aria-label="Behance"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaBehance />
                            </motion.a>
                        </div>

                        {/* Contact Info */}
                        <div className="flex space-x-6 text-sm">
                            <motion.span
                                className="flex items-center hover:text-blue-200 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaPhone className="mr-2 text-xs" /> +61 414 996 797
                            </motion.span>
                            <motion.span
                                className="flex items-center hover:text-blue-200 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaEnvelope className="mr-2 text-xs" /> info@mopstarcleaning.com
                            </motion.span>
                            <motion.span
                                className="flex items-center hover:text-blue-200 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaMapMarkerAlt className="mr-2 text-xs" /> 2 Vine St, Hurstville NSW 2220
                            </motion.span>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                        {/* Social Media - Mobile */}
                        <div className="flex justify-center space-x-6 mb-1">
                            <motion.a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 hover:scale-110 transition-all duration-300 p-1"
                                aria-label="Facebook"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaFacebookF size={12} />
                            </motion.a>
                            <motion.a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 hover:scale-110 transition-all duration-300 p-1"
                                aria-label="Twitter"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaTwitter size={12} />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-200 hover:scale-110 transition-all duration-300 p-1"
                                aria-label="Instagram"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaInstagram size={12} />
                            </motion.a>
                            <motion.a
                                href="https://behance.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 hover:scale-110 transition-all duration-300 p-1"
                                aria-label="Behance"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaBehance size={12} />
                            </motion.a>
                        </div>

                        {/* Contact Info - Mobile (Simplified) */}
                        <div className="flex justify-center space-x-4 text-xs">
                            <motion.span
                                className="flex items-center hover:text-blue-200 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaPhone className="mr-1" size={10} /> +61 414 996 797
                            </motion.span>
                            <motion.span
                                className="flex items-center hover:text-blue-200 transition-colors duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaEnvelope className="mr-1" size={10} /> info@mopstarcleaning.com
                            </motion.span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Navbar */}
            <motion.div
                className={`bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}
                variants={sectionVariants}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/">
                                <motion.img
                                    src={mopstarLogo}
                                    alt="Mopstar Logo"
                                    className="h-12 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                to="/"
                                className="text-[#051625] font-medium hover:text-[#00ADEE] relative group transition-colors duration-300"
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Home
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ADEE] group-hover:w-full transition-all duration-300"></span>
                                </motion.span>
                            </Link>
                            <Link
                                to="/services"
                                className="text-[#051625] font-medium hover:text-[#00ADEE] relative group transition-colors duration-300"
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Services
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ADEE] group-hover:w-full transition-all duration-300"></span>
                                </motion.span>
                            </Link>
                            <Link
                                to="/blogs"
                                className="text-[#051625] font-medium hover:text-[#00ADEE] relative group transition-colors duration-300"
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Blogs
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ADEE] group-hover:w-full transition-all duration-300"></span>
                                </motion.span>
                            </Link>
                            <Link
                                to="/about"
                                className="text-[#051625] font-medium hover:text-[#00ADEE] relative group transition-colors duration-300"
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    About
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ADEE] group-hover:w-full transition-all duration-300"></span>
                                </motion.span>
                            </Link>
                            <Link
                                to="/contact"
                                className="text-[#051625] font-medium hover:text-[#00ADEE] relative group transition-colors duration-300"
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Contact
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ADEE] group-hover:w-full transition-all duration-300"></span>
                                </motion.span>
                            </Link>
                        </div>

                        {/* CTA Button & Mobile Menu Button */}
                        <div className="flex items-center space-x-4">
                            {/* CTA Button */}
                            <motion.button
                                onClick={handleBookService}
                                className="bg-[#00ADEE] text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-[#0088CC] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book a Service
                            </motion.button>

                            {/* Mobile Menu Button */}
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden text-[#051625] hover:text-[#00ADEE] focus:outline-none p-2 transition-colors duration-300"
                                aria-label="Toggle menu"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <motion.div
                        className={`md:hidden overflow-hidden`}
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate={isOpen ? 'visible' : 'hidden'}
                    >
                        <div className="py-4 space-y-4 border-t border-gray-200">
                            <Link
                                to="/"
                                className="block text-[#051625] font-medium hover:text-[#00ADEE] hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Home
                                </motion.span>
                            </Link>
                            <Link
                                to="/services"
                                className="block text-[#051625] font-medium hover:text-[#00ADEE] hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Services
                                </motion.span>
                            </Link>
                            <Link
                                to="/blogs"
                                className="block text-[#051625] font-medium hover:text-[#00ADEE] hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Blogs
                                </motion.span>
                            </Link>
                            <Link
                                to="/about"
                                className="block text-[#051625] font-medium hover:text-[#00ADEE] hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    About
                                </motion.span>
                            </Link>
                            <Link
                                to="/contact"
                                className="block text-[#051625] font-medium hover:text-[#00ADEE] hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Contact
                                </motion.span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;
