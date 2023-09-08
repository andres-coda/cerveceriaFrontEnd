import logo from '../logo/Logo.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="Logo de la página" className='logoDeFooter'/>
      </div>
      <div className="footer-center">
        <p>&copy; {new Date().getFullYear()} Green Beer - Todos los derechos reservados</p>
      </div>
      <div className="footer-right">
        <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/your-facebook" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;

