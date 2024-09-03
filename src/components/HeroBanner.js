// src/components/HeroBanner.js
import React from 'react';
import batmanBanner from '../assets/batman-banner.jpg';
import spidermanBanner from '../assets/spiderman-banner.jpg';
import avengersBanner from '../assets/avengers-banner.jpg';

const HeroBanner = ({ movieTitle }) => {
    let bannerImage;

    switch (movieTitle) {
        case 'Batman':
            bannerImage = batmanBanner;
            break;
        case 'Spider-Man':
            bannerImage = spidermanBanner;
            break;
        case 'Avengers':
            bannerImage = avengersBanner;
            break;
        default:
            bannerImage = batmanBanner;
    }

    return (
        <div style={{ ...styles.banner, backgroundImage: `url(${bannerImage})` }}></div>
    );
};

const styles = {
    banner: {
        height: '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
    },
};

export default HeroBanner;
