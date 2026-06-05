import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faLandmark, faCalendarAlt, faMapMarkedAlt, faWalking, faDollarSign, faUtensils, faBus, faChild, faBook, faHandshake, faLanguage } from '@fortawesome/free-solid-svg-icons';

const FAQSection = () => {
    return (
        <div className="flex justify-center items-center px-4 py-8 ">
            <div className="p-8 w-full max-w-[1400px] bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Frequently Asked Questions <FontAwesomeIcon icon={faSmile} className="ml-2" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { icon: faLandmark, question: "What are the most popular tourist attractions in [City/Country]?", answer: "The most popular attractions include [list of famous places, etc.]." },
                        { icon: faCalendarAlt, question: "What is the best time of year to visit [destination]?", answer: "The best time to visit is during [specific months], when the weather is most favorable for outdoor activities." },
                        { icon: faMapMarkedAlt, question: "Are there guided tours available for specific attractions?", answer: "Yes, we offer guided tours for many attractions, such as [specific attractions]." },
                        { icon: faWalking, question: "Are there any free walking tours available?", answer: "Yes, there are free walking tours available, but tips are appreciated if you enjoy the experience!" },
                        { icon: faDollarSign, question: "How much do guided tours typically cost?", answer: "Our prices vary depending on the tour. Please check our pricing page for details." },
                        { icon: faUtensils, question: "Can you recommend the best local food experiences?", answer: "Check out [specific local dishes or restaurants] for authentic recommendations." },
                        { icon: faBus, question: "What are the transportation options for getting around the city?", answer: "Transportation options include public transit, taxis, rideshares, and bikes." },
                        { icon: faLandmark, question: "What are the activities to do in [City]?", answer: "Top activities include exploring local cuisine, visiting cultural sites, and enjoying outdoor activities." },
                        { icon: faChild, question: "Are there any kid-friendly or family-friendly activities?", answer: "Yes, there are various family-friendly activities such as parks, museums, and more." },
                        { icon: faBook, question: "How do I book a tour in advance?", answer: "You can book a tour directly on our website by selecting your desired experience." },
                        { icon: faHandshake, question: "Are there any cultural customs or etiquette I should be aware of?", answer: "Yes, be mindful of [specific customs], such as greetings and dining etiquette." },
                        { icon: faLanguage, question: "Do I need to know any specific language phrases for my trip?", answer: "Knowing basic phrases like 'hello,' 'please,' and 'thank you' will be appreciated." }
                    ].map((faq, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm transition-transform transform hover:scale-105">
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon icon={faq.icon} className="text-blue-500 text-xl" />
                                <h3 className="font-semibold text-lg">{faq.question}</h3>
                            </div>
                            <p className="text-gray-600 mt-2">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;