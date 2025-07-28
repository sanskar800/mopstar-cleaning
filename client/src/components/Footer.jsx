import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import newsletterImg from '../assets/images/newsletter.png';
import logoImg from '../assets/images/mopstar- 1.png';

const Footer = () => {
    // Animation variants for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring', stiffness: 80 } },
    };

    // Animation variants for elements
    const elementVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring', stiffness: 100 } },
    };

    // State for newsletter
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterLoading, setNewsletterLoading] = useState(false);

    // Handle newsletter submission
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setNewsletterLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/api/contact', {
                name: 'Newsletter Subscriber',
                email: newsletterEmail,
                message: 'Newsletter subscription request',
                service: 'Newsletter Subscription'
            });

            if (response.data.success) {
                toast.success('Successfully subscribed to newsletter!');
                setNewsletterEmail('');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response?.status === 429) {
                toast.error('Too many submissions. Please wait before trying again.');
            } else {
                toast.error('Failed to subscribe. Please try again.');
            }
        } finally {
            setNewsletterLoading(false);
        }
    };

    return (
        <div className="relative">
            {/* Top margin to ensure proper spacing with content above */}
            <div className="pt-24 md:pt-24 lg:pt-24">
                {/* Newsletter Section - Floating above footer */}
                <motion.section
                    className="relative z-20 mb-[-80px] md:mb-[-100px]"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <div className="bg-[#2F90BA] rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8 overflow-visible">
                            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
                                {/* Newsletter Image */}
                                <motion.div
                                    className="lg:w-1/2 flex justify-center lg:justify-start relative -mt-12 md:-mt-16 lg:-mt-20"
                                    variants={elementVariants}
                                    transition={{ delay: 0.2 }}
                                >
                                    <img
                                        src={newsletterImg}
                                        alt="Newsletter"
                                        className="w-full h-auto max-w-sm lg:max-w-md relative z-10"
                                    />
                                </motion.div>

                                {/* Newsletter Form */}
                                <motion.div
                                    className="lg:w-1/2 text-center lg:text-left text-white"
                                    variants={elementVariants}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h2 className="text-lg lg:text-xl xl:text-2xl font-bold mb-2 leading-tight">
                                        Subscribe to our newsletter to get updates to our latest collections
                                    </h2>
                                    <p className="text-sm mb-4 opacity-90">
                                        Get 20% off on your first order just by subscribing to our newsletter.
                                    </p>

                                    {/* Email Input with Overlapping Button */}
                                    <form onSubmit={handleNewsletterSubmit} className="relative">
                                        <style>{`
                                            .custom-input {
                                                background: rgba(255, 255, 255, 0.1);
                                                border: 1px solid rgba(255, 255, 255, 0.2);
                                                color: white;
                                            }
                                            .custom-input::placeholder {
                                                color: rgba(255, 255, 255, 0.7);
                                            }
                                            .custom-input:focus {
                                                background: rgba(255, 255, 255, 0.15);
                                                border-color: rgba(255, 255, 255, 0.4);
                                                outline: none;
                                            }
                                        `}</style>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                value={newsletterEmail}
                                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="custom-input w-full pl-12 pr-32 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
                                                required
                                            />
                                            <motion.button
                                                type="submit"
                                                disabled={newsletterLoading}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-[#1D242D] rounded-full px-6 py-3 font-semibold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                whileHover={{ scale: newsletterLoading ? 1 : 1.05 }}
                                                whileTap={{ scale: newsletterLoading ? 1 : 0.95 }}
                                            >
                                                {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
                                            </motion.button>
                                        </div>
                                    </form>

                                    <p className="text-xs opacity-80">
                                        You will be able to unsubscribe at any time.{' '}
                                        <a href="#" className="underline hover:text-blue-200 transition-colors">
                                            Read our privacy policy here.
                                        </a>
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* Main Footer */}
            <footer className="bg-[#051625] text-white relative pt-32 md:pt-36">
                {/* Main Footer Content */}
                <motion.section
                    className="pb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                            {/* Logo & Description - Takes 2 columns on large screens */}
                            <motion.div
                                className="lg:col-span-2"
                                variants={elementVariants}
                                transition={{ delay: 0.2 }}
                            >
                                <img
                                    src={logoImg}
                                    alt="Mopstar Cleaning Logo"
                                    className="w-36 h-auto mb-6 filter brightness-0 invert"
                                />
                                <p className="text-sm leading-relaxed mb-6 opacity-80 max-w-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                {/* Social Icons */}
                                <div className="flex gap-4">
                                    {[
                                        { name: 'facebook', path: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.9H7.9v-2.9H10V9.8c0-2.1 1.25-3.25 3.15-3.25.9 0 1.85.15 1.85.15v2.05h-1.04c-1.02 0-1.34.63-1.34 1.28v1.57h2.28l-.36 2.9h-1.92v6.9c4.56-.93 8-4.96 8-9.8z' },
                                        { name: 'twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                                        { name: 'instagram', path: 'M12 2.16c3.21 0 3.58.02 4.84.07 1.26.05 2.12.26 2.62.43.63.22 1.2.53 1.74 1.07.54.54.85 1.11 1.07 1.74.17.5.38 1.36.43 2.62.05 1.26.07 1.63.07 4.84s-.02 3.58-.07 4.84c-.05 1.26-.26 2.12-.43 2.62-.22.63-.53 1.2-1.07 1.74-.54.54-1.11.85-1.74 1.07-.5.17-1.36.38-2.62.43-1.26.05-1.63.07-4.84.07s-3.58-.02-4.84-.07c-1.26-.05-2.12-.26-2.62-.43-.63-.22-1.2-.53-1.74-1.07-.54-.54-.85-1.11-1.07-1.74-.17-.5-.38-1.36-.43-2.62-.05-1.26-.07-1.63-.07-4.84s.02-3.58.07-4.84c.05-1.26.26-2.12.43-2.62.22-.63.53-1.2 1.07-1.74.54-.54 1.11-.85 1.74-1.07.5-.17 1.36-.38 2.62-.43 1.26-.05 1.63-.07 4.84-.07zm0-2.16c-3.25 0-3.66.01-4.94.07-1.32.06-2.22.27-3.01.58-.81.31-1.5.74-2.18 1.42-.68.68-1.11 1.37-1.42 2.18-.31.79-.52 1.69-.58 3.01-.06 1.28-.07 1.69-.07 4.94s.01 3.66.07 4.94c.06 1.32.27 2.22.58 3.01.31.81.74 1.5 1.42 2.18.68.68 1.37 1.11 2.18 1.42.79.31 1.69.52 3.01.58 1.28.06 1.69.07 4.94.07s3.66-.01 4.94-.07c1.32-.06 2.22-.27 3.01-.58.81-.31 1.5-.74 2.18-1.42.68-.68 1.11-1.37 1.42-2.18.31-.79.52-1.69.58-3.01.06-1.28.07-1.69.07-4.94s-.01-3.66-.07-4.94c-.06-1.32-.27-2.22-.58-3.01-.31-.81-.74-1.5-1.42-2.18-.68-.68-1.37-1.11-2.18-1.42-.79-.31-1.69-.52-3.01-.58-1.28-.06-1.69-.07-4.94-.07z' },
                                        { name: 'linkedin', path: 'M22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM8 20H5V9h3v11zm-1.5-12.5c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm13.5 12.5h-3v-5.6c0-1.3-.5-2.2-1.7-2.2-1.3 0-2 .9-2 2.2V20h-3V9h3v1.3c.4-.6 1.2-1.3 2.4-1.3 1.8 0 3.3 1.2 3.3 3.8V20z' },
                                        { name: 'google', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z' }
                                    ].map((platform) => (
                                        <motion.a
                                            key={platform.name}
                                            href="#"
                                            className="text-white hover:text-[#2F90BA] transition-all duration-300 p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d={platform.path} />
                                            </svg>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Company Links */}
                            <motion.div variants={elementVariants} transition={{ delay: 0.3 }}>
                                <h3 className="text-lg font-bold mb-6">Company</h3>
                                <ul className="space-y-3 text-sm">
                                    {[
                                        { name: 'About Us', path: '/about' },
                                        { name: 'Services', path: '/services' },
                                        { name: 'Blogs', path: '/blogs' },
                                        { name: 'Contact', path: '/contact' },
                                    ].map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.path}
                                                className="hover:text-[#2F90BA] transition-all duration-300 opacity-80 hover:opacity-100"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Services Links */}
                            <motion.div variants={elementVariants} transition={{ delay: 0.4 }}>
                                <h3 className="text-lg font-bold mb-6">Services</h3>
                                <ul className="space-y-3 text-sm">
                                    {[
                                        { name: 'Office Cleaning', path: '/services/office-cleaning' },
                                        { name: 'Toilet Cleaning', path: '/services/toilet-cleaning' },
                                        { name: 'Gym Cleaning', path: '/services/gym-cleaning' },
                                        { name: 'Window Cleaning', path: '/services/window-cleaning' },
                                        { name: 'Kitchen Cleaning', path: '/services/kitchen-cleaning' },
                                        { name: 'Marble and Tile Cleaning', path: '/services/marble-tile-cleaning' },
                                        { name: 'End of Lease', path: '/services/end-of-lease' },
                                    ].map((item) => (
                                        <li key={item.name}>
                                            <Link to={item.path} className="hover:text-[#2F90BA] transition-all duration-300 opacity-80 hover:opacity-100">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Privacy Links & Contact */}
                            <motion.div variants={elementVariants} transition={{ delay: 0.5 }}>
                                <h3 className="text-lg font-bold mb-6">Privacy</h3>
                                <ul className="space-y-3 text-sm mb-8">
                                    {['Privacy Policy', 'Terms of Use'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="hover:text-[#2F90BA] transition-all duration-300 opacity-80 hover:opacity-100">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                                <ul className="space-y-4 text-sm">
                                    <li>
                                        <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-[#2F90BA] transition-all duration-300 opacity-80 hover:opacity-100">
                                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3h2.91c-.05.88-.15 1.74-.35 2.57L8.85 6.78c.28-.97.53-1.97.65-3.01M12 3c.88 0 1.74.1 2.57.29l-1.2 1.2c-.83-.2-1.7-.31-2.59-.34V3m0 18c-.88 0-1.74-.1-2.57-.29l1.2-1.2c.83.2 1.7.31 2.59.34v1.15m4.43-2.57c-.24-.83-.39-1.7-.45-2.59h1.51c.09 1.32.35 2.59.75 3.8l-1.2 1.2M3 12c0-.88.1-1.74.29-2.57l1.2 1.2c-.2.83-.31 1.7-.34 2.59H3m18 0c0 .88-.1 1.74-.29 2.57l-1.2-1.2c.2-.83.31-1.7.34-2.59h1.15M7.5 21c-.88 0-1.74-.1-2.57-.29l1.2-1.2c.83.2 1.7.31 2.59.34V21m4.5-18v1.15c.88 0 1.74.1 2.57.29l-1.2 1.2c-.83-.2-1.7-.31-2.59-.34M6.54 19c-.06-.89-.21-1.76-.45-2.59l1.2-1.2c.41 1.2.67 2.47.76 3.79H6.54m9.86-12.02c-.85-.24-1.72-.39-2.6-.45v-1.49c1.32.09 2.59.35 3.8.75l-1.2 1.19M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                                            </svg>
                                            +61 414 996 797
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:info@mopstarcleaning.com" className="flex items-center gap-3 hover:text-[#2F90BA] transition-all duration-300 opacity-80 hover:opacity-100">
                                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                            </svg>
                                            info@mopstarcleaning.com
                                        </a>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Bottom Copyright Bar */}
                <motion.div
                    className="border-t border-gray-700 py-4"
                    variants={elementVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <p className="text-center text-sm opacity-70">
                            © Copyright by MopstarCleaning. All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </footer>
        </div>
    );
};

export default Footer;
