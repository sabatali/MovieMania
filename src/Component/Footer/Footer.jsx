import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../../../src/assets/movix-logo.png'


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-8 ">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <img src={logo} alt="Logo" className="h-10 mb-4" />
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex space-x-4 mb-4">
                    <FaFacebook className="text-2xl cursor-pointer hover:text-blue-500" />
                    <FaTwitter className="text-2xl cursor-pointer hover:text-blue-500" />
                    <FaInstagram className="text-2xl cursor-pointer hover:text-blue-500" />
                </div>
                <p>&copy; 2024 MovieMania. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
