import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './animations.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer-section pt-5 pb-3 mt-5">
      <Container>
        <Row className="gy-4">
         

          <Col md={4}>
            <h5 className="fw-bold mb-3">{t('quick_links')}</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">{t('home')}</a></li>
              <li><a href="/categories" className="footer-link">{t('categories')}</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="fw-bold mb-3">{t('contact_us')}</h5>
            <p className="text-light small mb-1">Email: <a href="mailto:ritu2saxena@gmail.com" className="text-decoration-none text-info">ritu2saxena@gmail.com</a></p>
            <div className="d-flex gap-3 mt-2">
              <a href="https://github.com/webdev-ritu" className="social-icon"><FaGithub /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/ritu-saxena-78325334b/" className="social-icon"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>

        <hr className="bg-light opacity-50 mt-4" />

        <Row>
          <Col className="text-center">
            <p className="text-muted small mb-0">&copy; {new Date().getFullYear()} <strong>KiddoQuiz</strong>. {t('all_rights')}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
