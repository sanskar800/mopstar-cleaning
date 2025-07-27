import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import brushImg from '../assets/images/brush.png';
import toiletImg from '../assets/images/toilet.png';
import gymImg from '../assets/images/gym.png';
import windowImg from '../assets/images/window.png';
import marbleImg from '../assets/images/marbleandtile.png';
import kitchenImg from '../assets/images/kitchen.png';
import endOfLeaseImg from '../assets/images/endoflease.png';

const Services = () => {
    // Simplified animations
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const elementVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
    };

    // Service card data
    const services = [
        {
            title: 'Office Cleaning',
            image: brushImg,
            description: 'Our professional office cleaning ensures a spotless workspace, enhancing productivity with thorough dusting, vacuuming, and sanitization.',
            link: '/services/office-cleaning'
        },
        {
            title: 'Toilet Cleaning',
            image: toiletImg,
            description: 'We provide deep cleaning and disinfection for restrooms, ensuring hygiene and freshness with eco-friendly products.',
            link: '/services/toilet-cleaning'
        },
        {
            title: 'Gym Cleaning',
            image: gymImg,
            description: 'Specialized gym cleaning with equipment sanitization and locker room deep cleaning for a hygienic fitness environment.',
            link: '/services/gym-cleaning'
        },
        {
            title: 'Window Cleaning',
            image: windowImg,
            description: 'Crystal-clear windows with our streak-free cleaning service, perfect for both residential and commercial spaces.',
            link: '/services/window-cleaning'
        },
        {
            title: 'Kitchen Cleaning',
            image: kitchenImg,
            description: 'Comprehensive kitchen cleaning, including appliances, countertops, and sinks, for a hygienic and sparkling cooking environment.',
            link: '/services/kitchen-cleaning'
        },
        {
            title: 'Marble and Tile Cleaning',
            image: marbleImg,
            description: 'Specialized cleaning for marble and tile surfaces, removing grime and restoring shine with gentle, effective techniques.',
            link: '/services/marble-tile-cleaning'
        },
        {
            title: 'End of Lease Cleaning',
            image: endOfLeaseImg,
            description: 'Complete end of lease cleaning with bond-back guarantee. Professional service that meets property management standards.',
            link: '/services/end-of-lease'
        },
    ];

    // FAQ data
    const faqs = [
        {
            question: 'What cleaning products do you use?',
            answer: 'We use eco-friendly, non-toxic cleaning products that are safe for both people and pets, ensuring a healthy environment.',
        },
        {
            question: 'How often should I schedule cleaning services?',
            answer: 'The frequency depends on your needs—weekly, bi-weekly, or monthly cleanings are common for homes and offices.',
        },
        {
            question: 'Do I need to provide cleaning supplies or equipment?',
            answer: 'No, we bring all necessary supplies and equipment to ensure a thorough and efficient cleaning process.',
        },
        {
            question: 'Are your cleaning services insured?',
            answer: 'Yes, our services are fully insured to provide peace of mind and protect your property during cleaning.',
        },
        {
            question: 'Can you clean during business hours?',
            answer: 'We offer flexible scheduling, including after-hours cleaning, to minimize disruption to your business operations.',
        },
        {
            question: 'How do I book a cleaning service?',
            answer: 'You can book through our website or contact us directly via phone or email to schedule a convenient time.',
        },
    ];

    // State for FAQ accordion
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-24">
            {/* Title Section */}
            <motion.section
                className="max-w-7xl mx-auto px-4 py-8"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.div
                    className="border-l-4 border-blue-500 pl-4 mb-6"
                    variants={elementVariants}
                    transition={{ delay: 0.2 }}
                >
                    <span className="text-black font-semibold text-xl">Services</span>
                </motion.div>
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
                    Discover our wide range of professional cleaning services tailored to meet your needs.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center max-w-xs mx-auto h-64"
                            variants={elementVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <Link to={service.link} className="block h-full">
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-xl">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-12 h-12 object-contain rounded-lg"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#051625] mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Frequently Asked Questions Section */}
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
                    Frequently Asked Questions
                </motion.h2>
                <motion.p
                    className="text-gray-600 text-base max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
                    variants={elementVariants}
                    transition={{ delay: 0.4 }}
                >
                    Find answers to common questions about our cleaning services.
                </motion.p>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-4"
                            variants={elementVariants}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <button
                                className="w-full text-left p-4 flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="text-lg font-semibold text-[#051625]">{faq.question}</h3>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </motion.span>
                            </button>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                                className="overflow-hidden"
                            >
                                <p className="text-gray-600 text-sm p-4 leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default Services;
