import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useQuiz } from '../contexts/QuizContext';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';
//import './animations.css';
import './Header.css';
import BubbleBackground from './BubbleBackground';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user, language, setLanguage } = useQuiz();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm custom-navbar py-3 position-relative">
      <BubbleBackground count={25} />
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
        
          <span className="brand-title">KiddoQuiz</span>

        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto d-flex gap-4 text-center">
            <Nav.Link as={Link} to="/" className="nav-link-custom text-light">{t('home')}</Nav.Link>
            <Nav.Link as={Link} to="/categories" className="nav-link-custom text-light">{t('categories')}</Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/dashboard" className="nav-link-custom text-light">{t('dashboard')}</Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-3 flex-wrap justify-content-end">
            <Button
              variant="outline-light"
              size="sm"
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              className="d-flex align-items-center lang-toggle rounded-pill px-3"
            >
              <FaGlobe className="me-2" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>

            {user ? (
              <Button
                variant="light"
                size="sm"
                className="rounded-pill header-btn px-3"
                onClick={() => navigate('/profile')}
              >
                {t('profile')}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="rounded-pill header-btn px-3 login-btn"
                  onClick={() => navigate('/login')}
                >
                  {t('login')}
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  className="rounded-pill signup-btn px-3"
                  onClick={() => navigate('/signup')}
                >
                  {t('signup')}
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
