// src/components/Menu.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false); // Menu fechado por padrão
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
            setIsOpen(false); // Fecha o menu ao redimensionar para desktop
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="nav">
            {/* Menu Desktop */}
            <ul className={`menu ${isMobile ? 'hideMenu' : ''}`}>
                <li className="menuItem"><Link to="/" className="menuLink">Batman</Link></li>
                <li className="menuItem"><Link to="/spiderman" className="menuLink">Spider-Man</Link></li>
                <li className="menuItem"><Link to="/avengers" className="menuLink">Avengers</Link></li>
            </ul>

            {/* Menu Burger - Apenas em Mobile */}
            {isMobile && (
                <>
                    <div className="burgerMenu" onClick={toggleMenu}>
                        <div className="burgerLine"></div>
                        <div className="burgerLine"></div>
                        <div className="burgerLine"></div>
                    </div>

                    <ul className={`menuMobile ${isOpen ? 'showMenu' : 'hideMenu'}`}>
                        <li className="menuItem"><Link to="/" className="menuLink" onClick={closeMenu}>Batman</Link></li>
                        <li className="menuItem"><Link to="/spiderman" className="menuLink" onClick={closeMenu}>Spider-Man</Link></li>
                        <li className="menuItem"><Link to="/avengers" className="menuLink" onClick={closeMenu}>Avengers</Link></li>
                    </ul>
                </>
            )}
        </nav>
    );
};

export default Menu;
