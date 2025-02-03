'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PrivacyPolicy = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      title: 'Introduction',
      content:
        'Welcome to Booking Vacation Tour. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.',
    },
    {
      title: 'Information We Collect',
      content:
        'We may collect personal information such as your name, email address, and phone number when you visit our site or subscribe to our newsletter.',
    },
    {
      title: 'How We Use Your Information',
      content:
        'We use your information to provide our services, including booking and customer support, and to improve our offerings based on user feedback.',
    },
    {
      title: 'How We Share Your Information',
      content: (
        <>
          We may share your information with trusted partners who help us operate our website or conduct our business, as well as in the following cases:
          <ul className="list-disc ml-6 mt-2">
            <li>With your consent.</li>
            <li>When we believe release is appropriate to comply with the law.</li>
            <li>To protect our rights and the rights of others.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Data Security',
      content:
        'We take data security seriously and use industry-standard measures to ensure absolute security.',
    },
    {
      title: 'Your Rights',
      content:
        'You have the right to access your personal information and request changes or deletions as outlined by applicable laws.',
    },
    {
      title: 'Third-Party Links',
      content:
        'Our services may contain links to third-party websites. We are not responsible for the privacy practices of these websites, and we encourage you to review their policies.',
    },
    {
      title: 'Changes to This Privacy Policy',
      content:
        'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.',
    },
    {
      title: 'Contact Us',
      content: (
        <>
          If you have any questions or concerns about our Privacy Policy, please contact us at:
          <ul className="list-disc ml-6 mt-2">
            <li>Email: contact@bookingvacation.com</li>
            <li>Phone: +65 486 738 885</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-[1400px] bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Our Privacy Policy</h1>

        {sections.map((section, index) => (
          <div key={index} className="mb-4 border-b border-gray-200">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex justify-between items-center py-4 text-left text-xl font-semibold text-gray-800 hover:text-blue-600 focus:outline-none transition duration-200"
              aria-expanded={openSections[index]}
              aria-controls={`section-content-${index}`}
            >
              {section.title}
              {openSections[index] ? (
                <ChevronUp className="w-6 h-6 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-6 h-6 transition-transform duration-200" />
              )}
            </button>

            <div
              id={`section-content-${index}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections[index] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-4 text-gray-600">{section.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;