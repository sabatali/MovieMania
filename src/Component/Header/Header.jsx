import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import logo from '../../../src/assets/movix-logo.png'
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const handleSearchQuery = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };

    return (
        <nav className="bg-gray-900 px-[30px] text-white p-4 flex items-center justify-between">

            <div className="flex items-center">
                <Link to={"/"}> <img src={logo} alt="Logo" className="h-8 mr-4" /></Link>
            </div>

            <ul className="flex space-x-4">
                <li onClick={() => navigationHandler("movie")} className="cursor-pointer hover:text-gray-300">Movies</li>
                <li onClick={() => navigationHandler("tv")} className="cursor-pointer hover:text-gray-300">TV Shows</li>
            </ul>

            <div className="cursor-pointer" onClick={toggleSearch}>
                <FaSearch className="text-xl" />
            </div>

            {searchOpen && (
                <div className="absolute top-0 right-0 mt-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={handleSearchQuery}
                    />
                </div>
            )}
        </nav>
    );
};

export default Header;
