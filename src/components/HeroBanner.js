// src/components/HeroBanner.js
import React from 'react';
import './HeroBanner.css';
import batmanDesktopBanner from '../assets/batman-banner.jpg';
import batmanMobileBanner from '../assets/batman-banner-mobile.jpg';
import spidermanDesktopBanner from '../assets/spiderman-banner.jpg';
import spidermanMobileBanner from '../assets/spiderman-banner-mobile.jpg';
import avengersDesktopBanner from '../assets/avengers-banner.jpg';
import avengersMobileBanner from '../assets/avengers-banner-mobile.jpg';

const HeroBanner = ({ movieTitle }) => {
    // Definindo o caminho das imagens de acordo com o título do filme
    const getBannerImage = () => {
        switch (movieTitle) {
            case 'Batman':
                return {
                    desktop: batmanDesktopBanner,
                    mobile: batmanMobileBanner
                };
            case 'Spider-Man':
                return {
                    desktop: spidermanDesktopBanner,
                    mobile: spidermanMobileBanner
                };
            case 'Avengers':
                return {
                    desktop: avengersDesktopBanner,
                    mobile: avengersMobileBanner
                };
            default:
                return {
                    desktop: batmanDesktopBanner,
                    mobile: batmanMobileBanner
                };
        }
    };

    const bannerImages = getBannerImage();

    return (
        <div className="hero-banner">
            <img src={bannerImages.desktop} alt="Hero Banner Desktop" className="banner-desktop" />
            <img src={bannerImages.mobile} alt="Hero Banner Mobile" className="banner-mobile" />
        </div>
    );
};

export default HeroBanner;
