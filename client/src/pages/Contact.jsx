import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { toast } from 'react-toastify';
import sanitizeHtml from 'sanitize-html';

// Configure axios-retry
axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => {
        return error.code === 'ECONNABORTED' || error.response?.status === 503;
    }
});

const Contact = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    // Animation variants for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Rate limit tracking
        const now = Date.now();
        const attempts = JSON.parse(localStorage.getItem('formAttempts') || '[]');
        const recentAttempts = attempts.filter(
            (timestamp) => now - timestamp < 15 * 60 * 1000
        );
        if (recentAttempts.length >= 5) {
            toast.error(
                'Submission limit reached. Please wait 15 minutes before trying again.'
            );
            return;
        }

        // Client-side validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.name || formData.name.trim().length < 2) {
            toast.error('Name must be at least 2 characters long.');
            return;
        }
        if (formData.name.trim().length > 50) {
            toast.error('Name must be less than 50 characters.');
            return;
        }
        if (!formData.email || !emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        const sanitizedMessage = sanitizeHtml(formData.message, {
            allowedTags: [],
            allowedAttributes: {}
        });
        if (!sanitizedMessage || sanitizedMessage.length < 10) {
            toast.error('Message must be at least 10 characters long.');
            return;
        }
        if (sanitizedMessage.length > 1000) {
            toast.error('Message must be under 1000 characters.');
            return;
        }

        setLoading(true);

        try {
            // Use Vite environment variable with fallback
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/contact';

            console.log('Environment variables:', {
                VITE_API_URL: import.meta.env.VITE_API_URL,
                apiUrlUsed: apiUrl
            });
            console.log('Submitting form to:', apiUrl, 'with payload:', {
                name: formData.name.trim(),
                email: formData.email.trim(),
                message: sanitizedMessage,
                service: formData.service || 'N/A'
            });

            const response = await axios.post(
                apiUrl,
                {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    message: sanitizedMessage,
                    service: formData.service || 'N/A'
                },
                { timeout: 10000 }
            );

            if (response.data.success) {
                toast.success(response.data.message || 'Message sent successfully!');
                setFormData({ name: '', email: '', service: '', message: '' });
                // Update rate limit tracking
                recentAttempts.push(now);
                localStorage.setItem('formAttempts', JSON.stringify(recentAttempts));
            } else {
                console.error('Server responded with failure:', response.data);
                toast.error(response.data.message || 'Failed to send message.');
            }
        } catch (error) {
            console.error('Form submission error:', {
                message: error.message,
                code: error.code,
                response: error.response?.data,
                status: error.response?.status
            });
            if (error.response?.status === 429) {
                toast.error('Too many submissions. Please wait before trying again.');
            } else if (error.response?.status === 400) {
                toast.error(error.response.data.message || 'Invalid input. Please check your details.');
            } else if (error.code === 'ECONNABORTED') {
                toast.error(
                    'Request timed out. Please try again or contact us at info@mopstarcleaning.com.'
                );
            } else {
                toast.error(
                    'Failed to send message. Please try again or contact us at info@mopstarcleaning.com.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-36">
            {/* Contact Form Section */}
            <motion.section
                className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-16"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* Left Column - Form */}
                <div className="w-full md:w-[65%]">
                    <div className="border-l-4 border-blue-500 pl-4 mb-6">
                        <span className="text-blue-600 font-semibold text-xl">Contact us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        We’re here to help you
                    </h2>
                    <p className="text-gray-500 text-lg max-w-md mt-2 mb-8">
                        Have questions or need assistance? Reach out to our team, and we'll get
                        back to you promptly.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    required
                                    aria-label="Your Name"
                                    aria-required="true"
                                />
                                <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">
                                    Name *
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    required
                                    aria-label="Your Email"
                                    aria-required="true"
                                />
                                <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">
                                    Email *
                                </span>
                            </div>
                        </div>
                        <div className="relative">
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                                aria-label="Select a service"
                            >
                                <option value="" disabled>
                                    Select a service
                                </option>
                                <option value="office">Office Cleaning</option>
                                <option value="toilet">Toilet Cleaning</option>
                                <option value="carpet">Carpet Cleaning</option>
                                <option value="window">Window Cleaning</option>
                                <option value="kitchen">Kitchen Cleaning</option>
                                <option value="marble">Marble & Tile Cleaning</option>
                            </select>
                            <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">
                                Service
                            </span>
                            <svg
                                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                        <div className="relative">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                className="w-full p-3 border border-gray-300 rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                required
                                aria-label="Your Message"
                                aria-required="true"
                            />
                            <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">
                                Message *
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.message.length}/1000 characters
                            </p>
                        </div>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            aria-label="Submit Contact Form"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                'Get In Touch'
                            )}
                        </motion.button>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            * Required fields. Maximum 5 submissions per 15 minutes.
                        </p>
                    </form>
                </div>

                {/* Right Column - Contact Details */}
                <div className="w-full md:w-[35%] text-center md:text-left">
                    <h3 className="font-bold text-xl mb-4">Contact Details</h3>
                    <p className="text-gray-500 mb-1">2 Vine St, Hurstville</p>
                    <p className="text-gray-500 mb-1">Sydney, NSW 2000, Australia</p>
                    <p className="text-gray-500 mb-1">info@mopstarcleaning.com</p>
                    <p className="text-xl font-bold text-gray-900 mb-4">+61 414 996 797</p>
                    <div className="flex justify-center md:justify-start space-x-4 text-blue-600">
                        <a
                            href="#"
                            className="hover:text-blue-800 transition-colors duration-300"
                            aria-label="Facebook"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="hover:text-blue-800 transition-colors duration-300"
                            aria-label="Twitter"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="hover:text-blue-800 transition-colors duration-300"
                            aria-label="Instagram"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="hover:text-blue-800 transition-colors duration-300"
                            aria-label="LinkedIn"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M19.995 6.68c-.37 0-.736.01-1.104.03-1.781.097-2.813.986-2.954 1.898-.141.912.44 1.675.914 2.171.471.497 1.047 1.037 1.047 1.037s.527.038.585.038c.058 0 .174-.038.174-.038s-.234-.36-.468-.779c-.234-.418-.205-.722-.205-.722s.176-.418.762-.437c.586-.02 1.953.057 2.51.057.557 0 1.074-.077 1.074-.077s-.156.418-.273.722c-.117.304-.352.684-.352.684s.156.038.234.038c.078 0 .273-.038.273-.038s.39-.38.7-.874c.312-.494.352-1.094.352-1.094s.078-.589-.078-1.132c-.156-.542-.508-.97-1.016-1.227-.508-.256-1.367-.256-2.177-.256zm-15.5 0c-.81 0-1.67 0-2.177.256-.508.256-.86.685-1.016 1.227-.156.543-.078 1.132-.078 1.132s.04.6.352 1.094c.31.494.7.874.7.874s.195.038.273.038c.078 0 .234-.038.234-.038s-.235-.38-.352-.684c-.117-.304-.273-.722-.273-.722s.517.077 1.074.077c.557 0 1.924-.076 2.51-.057c.586.019.762.437.762.437s.029.304-.205.722c-.234.418-.468.78-.468.78s.116.037.174.037c.058 0 .585-.038.585-.038s.576-.54 1.047-1.037c.474-.496 1.055-1.26.914-2.171-.141-.912-1.173-1.801-2.954-1.898-.368-.02-.734-.03-1.104-.03zm7.75 0c-.37 0-.736.01-1.104.03-1.781.097-2.813.986-2.954 1.898-.141.912.44 1.675.914 2.171.471.497 1.047 1.037 1.047 1.037s.527.038.585.038c.058 0 .174-.038.174-.038s-.234-.36-.468-.779c-.234-.418-.205-.722-.205-.722s.176-.418.762-.437c.586-.02 1.953.057 2.51.057c.557 0 1.074-.077 1.074-.077s-.156.418-.273.722c-.117.304-.352.684-.352.684s.156.038.234.038c.078 0 .273-.038.273-.038s.39-.38.7-.874c.312-.494.352-1.094.352-1.094s.078-.589-.078-1.132c-.156-.542-.508-.97-1.016-1.227-.508-.256-1.367-.256-2.177-.256z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Contact;
