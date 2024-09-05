// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Arquivo CSS para estilizar o footer
import linkedinIcon from '../assets/icon-linkedin.svg'; // Importando o ícone do LinkedIn
import githubIcon from '../assets/icon-github.svg'; // Importando o ícone do GitHub

const Footer = () => {
    return (
        <footer className="footer">
            <p>Desenvolvido por Paulo Francisco Marsiglia</p>
            <div className="footer-icons">
                <a href="https://www.linkedin.com/in/paulomarsiglia/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinIcon} alt="LinkedIn" />
                </a>
                <a href="https://github.com/pmarsiglia93" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
