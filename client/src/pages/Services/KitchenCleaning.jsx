import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Import images
import office1 from '../../assets/images/kitchen1.jpg';
import office2 from '../../assets/images/kitchen2.jpg';
import office3 from '../../assets/images/kitchen3.jpg';
import office4 from '../../assets/images/kitchen4.jpg';
import office5 from '../../assets/images/kitchen5.jpg';
import office7 from '../../assets/images/kitchen6.jpg';

const KitchenCleaning = () => {
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
        setLoading(true);

        try {
            const response = await axios.post(import.meta.env.VITE_CONTACT_URL || 'http://localhost:4000/api/contact', {
                name: formData.name,
                email: formData.email,
                message: `Kitchen Cleaning Booking Request\n\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\n\nMessage: ${formData.message}`,
                service: 'Kitchen Cleaning'
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
                toast.error(error.response.data.message || 'Invalid input. Please check your details.');
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
                                    <span className="text-blue-600 font-semibold">Kitchen Cleaning</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                    Kitchen Cleaning Services
                                </h1>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Keep your kitchen spotless and hygienic with our comprehensive cleaning service. We specialize in deep cleaning appliances, countertops, and all kitchen surfaces to maintain food safety standards.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    From residential kitchens to commercial food preparation areas, our team uses food-safe products and strict hygiene protocols to ensure your kitchen is pristine and safe for use.
                                </p>
                            </motion.div>

                            {/* Hero Image */}
                            <motion.div
                                className="rounded-2xl overflow-hidden shadow-lg"
                                variants={elementVariants}
                            >
                                <img
                                    src={office1}
                                    alt="Kitchen Cleaning Service"
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
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your Email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        required
                                    />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Additional Requirements"
                                        rows="3"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    ></textarea>
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={{ scale: loading ? 1 : 1.02 }}
                                        whileTap={{ scale: loading ? 1 : 0.98 }}
                                    >
                                        {loading ? 'Sending...' : 'Book Now'}
                                    </motion.button>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hygienic Kitchen Cleaning</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Our kitchen cleaning service ensures your space meets the highest hygiene standards. We tackle grease, grime, and bacteria, leaving every surface spotless and safe.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Using eco-friendly, food-safe products, our experienced team delivers thorough cleaning for both residential and commercial kitchens, ensuring a healthy environment for food preparation.
                            </p>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={office2}
                                alt="Kitchen Cleaning"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    </div>
                </motion.section>

                {/* Our Kitchen Cleaning Services */}
                <motion.section
                    className="mb-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Kitchen Cleaning Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                'Appliance Deep Cleaning (Oven, Fridge, Microwave)',
                                'Countertop & Surface Sanitization',
                                'Cabinet Interior & Exterior Cleaning',
                                'Sink & Faucet Deep Clean',
                                'Floor Cleaning & Degreasing',
                                'Exhaust Fan & Hood Cleaning'
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
                                { name: 'Hygiene Compliance', percentage: 95 }
                            ].map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                        <span className="text-gray-600">{item.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <motion.div
                                            className="bg-blue-600 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.percentage}%` }}
                                            transition={{ duration: 1, delay: index * 0.2 }}
                                            viewport={{ once: true }}
                                        ></motion.div>
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
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">How We Work</h2>
                        <div className="space-y-8">
                            {[
                                { step: 1, title: 'Kitchen Assessment', description: 'Initial inspection to identify cleaning needs' },
                                { step: 2, title: 'Deep Cleaning', description: 'Thorough cleaning of all surfaces and appliances' },
                                { step: 3, title: 'Sanitization', description: 'Applying food-safe sanitizers for hygiene' },
                                { step: 4, title: 'Final Inspection', description: 'Ensuring a spotless and safe kitchen' }
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
                                                alt={`Kitchen cleaning ${index + 1}`}
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
                                src="https://www.youtube.com/embed/xxT4gMvGVds?si=jvbfli1271si5dm4"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="w-full h-80 md:h-96"
                            ></iframe>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Keep Your Kitchen Spotless Today</h2>
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

export default KitchenCleaning;
