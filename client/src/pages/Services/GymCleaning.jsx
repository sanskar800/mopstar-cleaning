import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Import images
import office1 from '../../assets/images/gym1.jpg';
import office2 from '../../assets/images/gym2.jpg';
import office3 from '../../assets/images/gym3.jpg';
import office4 from '../../assets/images/gym4.jpg';
import office5 from '../../assets/images/gym5.jpeg';
import office7 from '../../assets/images/gym1.jpg';

const GymCleaning = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    // Animation variants
    const sectionVariants = {
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

    const elementVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
    };

    // Slider images
    const sliderImages = [office2, office3, office4, office5, office7];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (formData.message.length > 1000) {
            toast.error('Message must be under 1000 characters.');
            return;
        }
        if (!formData.date) {
            toast.error('Please select a preferred date.');
            return;
        }
        const selectedDate = new Date(formData.date);
        const today = new Date();
        if (selectedDate < today.setHours(0, 0, 0, 0)) {
            toast.error('Please select a future date.');
            return;
        }
        if (!formData.time) {
            toast.error('Please select a preferred time.');
            return;
        }
        // Validate time (e.g., between 6 AM and 10 PM)
        const [hours] = formData.time.split(':').map(Number);
        if (hours < 6 || hours >= 22) {
            toast.error('Please select a time between 6:00 AM and 10:00 PM.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(import.meta.env.VITE_CONTACT_URL || 'http://localhost:4000/api/contact', {
                name: formData.name,
                email: formData.email,
                message: `Gym Cleaning Booking Request\n\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\n\nMessage: ${formData.message}`,
                service: 'Gym Cleaning'
            });

            if (response.data.success) {
                toast.success(response.data.message || 'Booking request sent successfully!');
                setFormData({ name: '', email: '', date: '', time: '', message: '' });
            } else {
                toast.error(response.data.message || 'Failed to send booking request.');
            }
        } catch (error) {
            if (error.response?.status === 429) {
                toast.error('Too many submissions. Please wait before trying again.');
            } else if (error.response?.status === 400) {
                toast.error('Invalid input. Please check your details.');
            } else if (error.code === 'ECONNABORTED') {
                toast.error('Request timed out. Please try again or contact us at info@mopstarcleaning.com.');
            } else {
                toast.error('Failed to send booking request. Please try again or contact us at info@mopstarcleaning.com.');
            }
        } finally {
            setLoading(false);
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header Section */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Hero Content */}
                            <motion.div variants={elementVariants}>
                                <div className="border-l-4 border-blue-500 pl-4 mb-6">
                                    <span className="text-blue-600 font-semibold">Gym Cleaning</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                    Gym Cleaning Services
                                </h1>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Maintain a clean and hygienic fitness environment with our specialized gym cleaning service. We provide thorough sanitization of equipment and high-touch areas to ensure a safe space for all users.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Our experienced team understands the unique challenges of fitness facilities, delivering comprehensive cleaning to promote health, safety, and a fresh environment.
                                </p>
                            </motion.div>

                            {/* Hero Image */}
                            <motion.div
                                className="rounded-2xl overflow-hidden shadow-lg"
                                variants={elementVariants}
                            >
                                <img
                                    src={office1}
                                    alt="Gym Cleaning Service"
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Booking Form Sidebar */}
                        <motion.div
                            className="lg:col-span-1"
                            variants={elementVariants}
                        >
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Now</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Your Name"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            required
                                            aria-label="Your Name"
                                            aria-required="true"
                                        />
                                        <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">Name *</span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Your Email"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            required
                                            aria-label="Your Email"
                                            aria-required="true"
                                        />
                                        <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">Email *</span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            required
                                            aria-label="Preferred Date"
                                            aria-required="true"
                                        />
                                        <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">Preferred Date *</span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            required
                                            aria-label="Preferred Time"
                                            aria-required="true"
                                        />
                                        <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">Preferred Time *</span>
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Additional Requirements"
                                            rows="3"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            aria-label="Additional Requirements"
                                        />
                                        <span className="absolute left-3 -top-2 text-xs text-gray-600 bg-white px-1">Additional Requirements</span>
                                        <p className="text-xs text-gray-500 mt-1">{formData.message.length}/1000 characters</p>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        whileHover={{ scale: loading ? 1 : 1.02 }}
                                        whileTap={{ scale: loading ? 1 : 0.98 }}
                                        aria-label="Submit Booking Request"
                                    >
                                        {loading ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            'Book Now'
                                        )}
                                    </motion.button>
                                    <p className="text-xs text-gray-500 text-center mt-2">* Required fields. Maximum 5 submissions per hour.</p>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* About Section */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hygienic Gym Cleaning</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Our gym cleaning service ensures a sanitary and inviting fitness environment. We focus on disinfecting equipment, high-touch areas, and locker rooms to prevent the spread of germs.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Using eco-friendly, gym-safe cleaning products, our team delivers thorough cleaning to maintain a healthy and fresh space for all gym users.
                            </p>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={office2}
                                alt="Gym Cleaning"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    </div>
                </motion.section>

                {/* Our Gym Cleaning Services */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Gym Cleaning Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                'Equipment Sanitization & Disinfection',
                                'Locker Room Deep Cleaning',
                                'Floor Cleaning & Maintenance',
                                'Mirror & Glass Surface Cleaning',
                                'Air Vent & HVAC Cleaning',
                                'Trash Removal & Restocking'
                            ].map((service, index) => (
                                <div key={index} className="flex items-start">
                                    <Check className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Service Comparison Bar */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Comparison</h2>
                        <div className="space-y-6">
                            {[
                                { name: 'Cleaning Effectiveness', percentage: 92 },
                                { name: 'Customer Satisfaction', percentage: 89 },
                                { name: 'Hygiene Compliance', percentage: 94 }
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                        <span className="text-gray-600">{item.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-lg h-3">
                                        <motion.div
                                            className="bg-blue-600 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.percentage}%` }}
                                            transition={{ duration: 1, delay: index * 0.2 }}
                                            viewport={{ once: true }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* How We Work */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">How We Work</h2>
                        <div className="space-y-8">
                            {[
                                { step: 1, title: 'Gym Assessment', description: 'Initial inspection to identify cleaning needs' },
                                { step: 2, title: 'Equipment Cleaning', description: 'Sanitizing all fitness equipment and high-touch areas' },
                                { step: 3, title: 'Deep Cleaning', description: 'Thorough cleaning of floors, locker rooms, and mirrors' },
                                { step: 4, title: 'Final Inspection', description: 'Ensuring a hygienic and fresh gym environment' }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Image Slider */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Work Gallery</h2>

                        {/* Slider Container */}
                        <div className="relative bg-blue-50 rounded-xl p-6 shadow-md">
                            {/* Image Track */}
                            <div className="overflow-hidden">
                                <div
                                    className="flex gap-4 transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * (100 / sliderImages.length)}%)` }}
                                >
                                    {sliderImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex-shrink-0 w-1/5 aspect-square"
                                        >
                                            <img
                                                src={image}
                                                alt={`Gym cleaning ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-center gap-4 mt-6">
                                <motion.button
                                    onClick={prevSlide}
                                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ChevronLeft className="w-6 h-6 text-blue-600" />
                                </motion.button>
                                <motion.button
                                    onClick={nextSlide}
                                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ChevronRight className="w-6 h-6 text-blue-600" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Video Section */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Video</h2>
                        <div className="relative rounded-xl overflow-hidden">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/7ffjv-_lpD0?si=uAI2EOO5sajg9LyW"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="w-full h-80 md:h-96"
                            />
                        </div>
                    </div>
                </motion.section>

                {/* Contact Information */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Keep Your Gym Hygienic Today</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center">
                                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p className="text-gray-600">2 Vine St, Hurstville NSW 2220</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-6 h-6 text-blue-600 mr-3" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-600">+61 414 996 797</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-6 h-6 text-blue-600 mr-3" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">info@mopstarcleaning.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default GymCleaning;
