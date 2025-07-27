import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Direct imports
import abourImg from '../assets/images/aboutimg.png';
import brushImg from '../assets/images/brush.png';
import toiletImg from '../assets/images/toilet.png';
import carpetImg from '../assets/images/Mask group.png';
import person1 from '../assets/images/person1.jpg';
import person2 from '../assets/images/person2.jpg';
import person3 from '../assets/images/person3.jpg';
import person4 from '../assets/images/person4.jpg';
import person5 from '../assets/images/person5.jpg';
import gymImg from '../assets/images/gym.png';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Fixed animation variants
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

    const testimonials = [
        { name: 'Alexa Bliss', image: person1, text: 'Exceptional service! My house has never been cleaner.', rating: 4 },
        { name: 'John Doe', image: person2, text: 'Professional and thorough. Highly recommend their carpet cleaning!', rating: 4 },
        { name: 'Jane Smith', image: person3, text: 'The team was friendly and efficient. Great experience!', rating: 4 },
        { name: 'Mike Johnson', image: person4, text: 'Outstanding attention to detail. My office sparkles!', rating: 4 },
        { name: 'Sarah Lee', image: person5, text: 'Reliable and trustworthy service. Will use again!', rating: 4 },
    ];

    const handlePrev = () => {
        setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const testimonialVariants = {
        slideLeft: { x: -100, opacity: 0, transition: { duration: 0.5 } },
        slideRight: { x: 100, opacity: 0, transition: { duration: 0.5 } },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div>
            {/* Hero Section - Shows immediately */}
            <motion.section
                ref={sectionRef}
                className="max-w-7xl mx-auto px-4 py-20 mt-20"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-2/5 text-center md:text-left">
                        <div className="mb-6 text-left">
                            <div className="border-l-4 border-blue-500 pl-4 inline-block">
                                <span className="text-black font-semibold text-xl">
                                    About Us
                                </span>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            We Provide Top Quality Cleaning
                        </h2>

                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            With years of experience in the cleaning industry, we deliver exceptional service that exceeds expectations. Our professional team uses eco-friendly products and advanced techniques to ensure your space is spotless and healthy.
                        </p>

                        <p className="text-gray-600 text-base mb-8 leading-relaxed">
                            From residential homes to commercial offices, we provide comprehensive cleaning solutions tailored to your specific needs. Trust us to maintain the highest standards of cleanliness and hygiene.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <button className="bg-[#ffa726] hover:bg-[#f57c00] text-white px-8 py-3 rounded-full font-medium transition-all duration-300">
                                Learn More
                            </button>
                            <button className="border border-[#ffa726] text-[#ffa726] px-8 py-3 rounded-full font-medium hover:bg-orange-50 transition-all duration-300">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5">
                        <div
                            className={`transition-all duration-1000 ease-out ${isVisible
                                ? 'opacity-100 transform translate-x-0'
                                : 'opacity-0 transform translate-x-12'
                                }`}
                        >
                            <img
                                src={abourImg}
                                alt="About Us - Professional Cleaning Service"
                                className="w-full h-96 mx-auto md:max-w-full rounded-2xl object-contain scale-120"
                                onError={(e) => {
                                    console.log('Image failed to load:', e.target.src);
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <div
                                className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center"
                                style={{ display: 'none' }}
                            >
                                <div className="text-center p-8">
                                    <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About Us Image</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Services Section - Shows immediately */}
            <motion.section
                className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-center"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-2"
                    variants={elementVariants}
                >
                    Keep your vision to our latest projects.
                </motion.h2>
                <motion.p
                    className="text-gray-600 text-base max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
                    variants={elementVariants}
                >
                    Awesome site, on the top advertising a business online includes assembling Having the most keep.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center max-w-xs mx-auto h-64"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
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

                    <motion.div
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center max-w-xs mx-auto h-64"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
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

                    <motion.div
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center max-w-xs mx-auto h-64"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
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

            {/* Testimonial Section - Shows immediately */}
            <motion.section
                className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-center"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-8"
                    variants={elementVariants}
                >
                    What Our Clients Say
                </motion.h2>
                <div className="relative">
                    <div className="flex justify-center gap-4 mb-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.img
                                key={index}
                                src={testimonial.image}
                                alt={testimonial.name}
                                className={`w-12 h-12 rounded-full object-cover cursor-pointer ${currentTestimonial === index ? 'scale-125 border-2 border-blue-500' : ''}`}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>

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

export default About;
