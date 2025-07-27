import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import heroImage from '../assets/images/heroimage.png';
import toiletImg from '../assets/images/toilet.png';
import carpetImg from '../assets/images/Mask group.png';
import brushImg from '../assets/images/brush.png';
import wemakeImg from '../assets/images/wemake.png';
import havequestionImg from '../assets/images/homecontact.png';
import person1 from '../assets/images/person1.jpg';
import person2 from '../assets/images/person2.jpg';
import person3 from '../assets/images/person3.jpg';
import person4 from '../assets/images/person4.jpg';
import person5 from '../assets/images/person5.jpg';
import CountUp from 'react-countup';
import gymImg from '../assets/images/gym.png';

const Home = () => {
    const navigate = useNavigate();

    // Animation variants for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    // Animation variants for elements
    const elementVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    // State for testimonial slider
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // State for contact form
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [contactLoading, setContactLoading] = useState(false);

    // State for newsletter
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterLoading, setNewsletterLoading] = useState(false);

    // Testimonials data
    const testimonials = [
        { name: 'Alexa Bliss', image: person1, text: 'Exceptional service! My house has never been cleaner.', rating: 4 },
        { name: 'John Doe', image: person2, text: 'Professional and thorough. Highly recommend their carpet cleaning!', rating: 5 },
        { name: 'Jane Smith', image: person3, text: 'The team was friendly and efficient. Great experience!', rating: 4 },
        { name: 'Mike Johnson', image: person4, text: 'Outstanding attention to detail. My office sparkles!', rating: 4 },
        { name: 'Sarah Lee', image: person5, text: 'Reliable and trustworthy service. Will use again!', rating: 5 },
    ];

    // Handle contact form changes
    const handleContactChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    // Handle contact form submission
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setContactLoading(true);

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL || 'http://localhost:4000/api/contact', {
                name: contactForm.name,
                email: contactForm.email,
                message: contactForm.message,
                service: 'General Inquiry from Home Page'
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setContactForm({ name: '', email: '', phone: '', message: '' });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response?.status === 429) {
                toast.error('Too many submissions. Please wait before trying again.');
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        } finally {
            setContactLoading(false);
        }
    };

    // Handle newsletter submission
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setNewsletterLoading(true);

        try {
            const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/contact', '') : 'http://localhost:4000/api';
            const response = await axios.post(`${baseUrl}/contact`, {
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

    const handleAboutUs = () => {
        navigate('/about');
    };

    const handleBookService = () => {
        navigate('/services');
    };

    const handleLearnMore = () => {
        navigate('/about');
    };

    // Handle navigation
    const handlePrev = () => {
        setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    // Testimonial slide animation variants
    const testimonialVariants = {
        slideLeft: { x: -100, opacity: 0, transition: { duration: 0.5 } },
        slideRight: { x: 100, opacity: 0, transition: { duration: 0.5 } },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="pt-[120px] md:pt-[70px]">
            {/* Hero Section */}
            <motion.section
                className="max-w-7xl mx-auto px-4 py-8 md:py-12"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <motion.div
                        className="lg:w-2/5 text-center lg:text-left"
                        variants={elementVariants}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Happiness Is Freshly<br />
                            <span className="text-[#00aaff]">Cleaning</span> House
                        </h1>
                        <motion.p
                            className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            variants={elementVariants}
                            transition={{ delay: 0.4 }}
                        >
                            Awesome site, on the top advertising a Courses available business online includes assembling having awesome site on the top advertising a Courses available business having.
                        </motion.p>
                        <motion.div
                            className="mt-6 mb-2 flex flex-wrap gap-5 justify-center lg:justify-start"
                            variants={elementVariants}
                            transition={{ delay: 0.6 }}
                        >
                            <button
                                onClick={handleAboutUs}
                                className="bg-[#ffa726] hover:bg-[#f57c00] text-white px-8 py-2.5 rounded-full font-medium text-base transition-all duration-300 cursor-pointer"
                            >
                                About Us
                            </button>
                            <button
                                onClick={handleBookService}
                                className="border border-[#ffa726] text-[#EFB118] px-8 py-2.5 rounded-full font-medium text-base hover:bg-orange-50 transition-all duration-300 cursor-pointer"
                            >
                                Book a Service
                            </button>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="lg:w-3/5 relative flex justify-center items-center mt-6 lg:mt-0"
                        variants={elementVariants}
                        transition={{ delay: 0.3 }}
                    >
                        <img
                            src={heroImage}
                            alt="Cleaning Service"
                            className="w-full h-auto max-w-none lg:max-w-none mx-auto object-cover mt-[-30px] lg:mt-0 scale-120"
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Combined Project Showcase Section */}
            <motion.section
                className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-2"
                    variants={elementVariants}
                    transition={{ delay: 0.2 }}
                >
                    Keep your vision to our latest projects.
                </motion.h2>
                <motion.p
                    className="text-gray-600 text-base max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
                    variants={elementVariants}
                    transition={{ delay: 0.4 }}
                >
                    Awesome site, on the top advertising a business online includes assembling Having the most keep.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Office Cleaning Card */}
                    <motion.div
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center max-w-xs mx-auto h-64"
                        variants={elementVariants}
                        transition={{ delay: 0.2 }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Link to="/services/office-cleaning" className="block h-full">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-xl">
                                    <img
                                        src={brushImg}
                                        alt="Office Cleaning"
                                        className="w-12 h-12 object-contain rounded-lg"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#051625] mb-2">Office Cleaning</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Our professional office cleaning ensures a spotless workspace, enhancing productivity with thorough dusting, vacuuming, and sanitization.
                            </p>
                        </Link>
                    </motion.div>

                    {/* Toilet Cleaning Card */}
                    <motion.div
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center max-w-xs mx-auto h-64"
                        variants={elementVariants}
                        transition={{ delay: 0.3 }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Link to="/services/toilet-cleaning" className="block h-full">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-xl">
                                    <img
                                        src={toiletImg}
                                        alt="Toilet Cleaning"
                                        className="w-12 h-12 object-contain rounded-lg"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#051625] mb-2">Toilet Cleaning</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We provide deep cleaning and disinfection for restrooms, ensuring hygiene and freshness with eco-friendly products.
                            </p>
                        </Link>
                    </motion.div>

                    {/* Gym Cleaning Card */}
                    <motion.div
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center max-w-xs mx-auto h-64"
                        variants={elementVariants}
                        transition={{ delay: 0.4 }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Link to="/services/gym-cleaning" className="block h-full">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-xl">
                                    <img
                                        src={gymImg}
                                        alt="Gym Cleaning"
                                        className="w-12 h-12 object-contain rounded-lg"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#051625] mb-2">Gym Cleaning</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Specialized gym cleaning with equipment sanitization and locker room deep cleaning for a hygienic fitness environment.
                            </p>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* We Make Clots Look Great Section */}
            <motion.section
                className="max-w-7xl mx-auto px-4 py-8 md:py-12"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">We Make Clots Look Great</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>

                        {/* Bullet Points */}
                        <ul className="space-y-3 mb-8">
                            <motion.li
                                className="flex items-center gap-3"
                                variants={elementVariants}
                                transition={{ delay: 0.2 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <span className="font-medium text-gray-600">-</span>
                                <span className="font-medium">Residential Cleaning Services Near You!</span>
                            </motion.li>
                            <motion.li
                                className="flex items-center gap-3"
                                variants={elementVariants}
                                transition={{ delay: 0.3 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <span className="font-medium text-gray-600">-</span>
                                <span className="font-medium">Commercial Cleaning Service In Australia.</span>
                            </motion.li>
                            <motion.li
                                className="flex items-center gap-3"
                                variants={elementVariants}
                                transition={{ delay: 0.4 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <span className="font-medium text-gray-600">-</span>
                                <span className="font-medium">Professional Floor & Gym Cleaning.</span>
                            </motion.li>
                        </ul>

                        {/* Learn More Button */}
                        <motion.button
                            onClick={handleLearnMore}
                            className="bg-orange-500 text-white rounded-full px-6 py-2 font-medium hover:bg-orange-600 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            variants={elementVariants}
                            transition={{ delay: 0.5 }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            Learn More
                        </motion.button>
                    </div>

                    {/* Right Content - Image */}
                    <div className="relative">
                        <motion.div
                            className="relative z-10"
                            variants={elementVariants}
                            transition={{ delay: 0.3 }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <img
                                src={wemakeImg}
                                alt="Cleaning Services"
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-12 bg-[#2F90BA] text-white rounded-xl p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <motion.div
                            className="p-6"
                            whileHover={{ y: -5 }}
                            variants={elementVariants}
                            transition={{ delay: 0.1 }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-2">
                                <CountUp end={300} suffix="+" enableScrollSpy scrollSpyOnce />
                            </h3>
                            <p className="font-medium">Project Done</p>
                        </motion.div>

                        <motion.div
                            className="p-6"
                            whileHover={{ y: -5 }}
                            variants={elementVariants}
                            transition={{ delay: 0.2 }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-2">
                                <CountUp end={500} enableScrollSpy scrollSpyOnce />
                            </h3>
                            <p className="font-medium">Happy Clients</p>
                        </motion.div>

                        <motion.div
                            className="p-6"
                            whileHover={{ y: -5 }}
                            variants={elementVariants}
                            transition={{ delay: 0.3 }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-2">
                                <CountUp end={5} suffix="+" enableScrollSpy scrollSpyOnce />
                            </h3>
                            <p className="font-medium">Award Winner</p>
                        </motion.div>

                        <motion.div
                            className="p-6"
                            whileHover={{ y: -5 }}
                            variants={elementVariants}
                            transition={{ delay: 0.4 }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-2">
                                <CountUp end={50} suffix="+" enableScrollSpy scrollSpyOnce />
                            </h3>
                            <p className="font-medium">Team Member</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
                className="max-w-7xl mx-auto px-6 py-16 md:px-16"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left Content - Image */}
                    <motion.div
                        className="relative"
                        variants={elementVariants}
                        transition={{ delay: 0.2 }}
                    >
                        <img
                            src={havequestionImg}
                            alt="Contact Us"
                            className="w-full h-auto"
                        />
                    </motion.div>

                    {/* Right Content - Contact Form */}
                    <motion.div
                        className="bg-white rounded-xl shadow-md p-8"
                        variants={elementVariants}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            Having Question? <span className="text-blue-500">Get in touch!</span>
                        </h2>
                        <form onSubmit={handleContactSubmit} className="space-y-4 mt-6">
                            <input
                                type="text"
                                name="name"
                                value={contactForm.name}
                                onChange={handleContactChange}
                                placeholder="Your name"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-md"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactChange}
                                placeholder="Your email"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-md"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={contactForm.phone}
                                onChange={handleContactChange}
                                placeholder="Phone number"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-md"
                            />
                            <textarea
                                name="message"
                                value={contactForm.message}
                                onChange={handleContactChange}
                                placeholder="Your message"
                                rows="4"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-md"
                                required
                            ></textarea>
                            <motion.button
                                type="submit"
                                disabled={contactLoading}
                                className="bg-blue-500 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: contactLoading ? 1 : 1.05 }}
                                whileTap={{ scale: contactLoading ? 1 : 0.95 }}
                            >
                                {contactLoading ? 'Sending...' : 'Get In Touch'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.section>

            {/* Testimonial Slider Section */}
            <motion.section
                className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-8"
                    variants={elementVariants}
                    transition={{ delay: 0.2 }}
                >
                    What Our Clients Say
                </motion.h2>
                <div className="relative">
                    {/* Avatar Row */}
                    <div className="flex justify-center gap-4 mb-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.img
                                key={index}
                                src={testimonial.image}
                                alt={testimonial.name}
                                className={`w-12 h-12 rounded-full object-cover cursor-pointer ${currentTestimonial === index ? 'scale-125 border-2 border-blue-500' : ''
                                    }`}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>

                    {/* Testimonial Content */}
                    <motion.div
                        key={currentTestimonial}
                        variants={testimonialVariants}
                        initial={currentTestimonial ? 'slideLeft' : 'slideRight'}
                        animate="visible"
                        className="max-w-2xl mx-auto"
                    >
                        <h3 className="text-xl font-semibold mb-2">{testimonials[currentTestimonial].name}</h3>
                        <div className="flex justify-center mb-4">
                            {[...Array(4)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed">
                            {testimonials[currentTestimonial].text}
                        </p>
                        <svg
                            className="w-8 h-8 text-blue-500 mx-auto mt-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M3 11h3v10H3zm7 0h3v10H10z" />
                        </svg>
                    </motion.div>

                    {/* Navigation Arrows */}
                    <div className="absolute inset-0 flex justify-between items-center px-4">
                        <motion.button
                            className="bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-all duration-300"
                            onClick={handlePrev}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </motion.button>
                        <motion.button
                            className="bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-all duration-300"
                            onClick={handleNext}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
