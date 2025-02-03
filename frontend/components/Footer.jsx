import { FaFacebookF, FaLinkedinIn, FaTelegram } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer 
            className="bg-gray-100 py-8" 
            style={{ 
                backgroundImage: 'url("../Footer.png")', // Correcting image path formatting
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="container mx-auto px-5 md:px-20 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="px-5 md:px-10 mb-6 md:mb-0 flex flex-col items-start">
                        <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
                        <p className="text-gray-600 mt-4">Travel helps companies manage payments easily.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:ml-20">
                        <div>
                            <h3 className="font-semibold text-lg pb-2">Company</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li><Link href="./about-us">About Us</Link></li>
                                <li><Link href="./contact-us">Contact Us</Link></li>
                                <li><Link href="./faq">FAQ</Link></li>
                                <li><Link href="./privacy">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg pb-2">Destinations</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li><Link href="/siem-reap">Siem Reap</Link></li>
                                <li><Link href="/phnom-penh">Phnom Penh</Link></li>
                                <li><Link href="/kompong-cham">Kompong Cham</Link></li>
                                <li><Link href="/battambang">Battambang</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg pb-2">Join Our Newsletter</h3>
                            <div className="flex space-x-4 py-4">
                                <Link href="#">
                                    <FaFacebookF className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                                </Link>
                                <Link href="#">
                                    <FaLinkedinIn className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                                </Link>
                                <Link href="#">
                                    <FaTelegram className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                                </Link>
                            </div>
                            <p className="text-gray-600">
                                * We’ll send you weekly updates for better tour packages.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8 text-gray-500">
                    <p>© 2024 WCT. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}