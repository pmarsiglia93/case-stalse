import { Link } from 'react-router-dom';
import githubIcon from '../assets/icon-github.svg';
import linkedinIcon from '../assets/icon-linkedin.svg';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div><Link className="brand" to="/"><span className="brand__mark">H</span><span>Hero<span>Verse</span></span></Link><p>{t('footer.description')}</p></div>
        <div className="footer__credits"><p>{t('footer.author')}</p><div className="footer__socials">
          <a href="https://www.linkedin.com/in/paulomarsiglia/" target="_blank" rel="noreferrer" aria-label="LinkedIn — Paulo Marsiglia"><img src={linkedinIcon} alt="" /></a>
          <a href="https://github.com/pmarsiglia93" target="_blank" rel="noreferrer" aria-label="GitHub — Paulo Marsiglia"><img src={githubIcon} alt="" /></a>
        </div></div>
      </div>
      <div className="footer__bottom container"><span>© {new Date().getFullYear()} HeroVerse</span><span>{t('footer.data')}</span></div>
    </footer>
  );
}
