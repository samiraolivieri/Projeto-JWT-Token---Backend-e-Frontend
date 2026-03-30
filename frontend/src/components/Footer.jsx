import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'; 
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
       
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin size={25} /></a>
        <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub size={25} /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram size={30} /></a>
      </div>
      <p>&copy; 2026 SENAI - Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;