import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useQuiz } from '../contexts/QuizContext';
import Lottie from 'lottie-react';
import loginLottie from '../assets/lottie/kid-welcome.json';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import '../styles/main.css';

export default function Login() {
  const { t } = useTranslation();
  const { setUser } = useQuiz();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/dashboard');
    } catch (err) {
      setError(t(getFirebaseError(err.code)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg min-vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow rounded-4 p-3">
              <div className="text-center mb-3">
                <Lottie animationData={loginLottie} loop autoplay style={{ height: 180 }} />
              </div>

              <Card.Body>
                <h3 className="text-center mb-3 text-primary">{t('welcome_back')}</h3>
                <p className="text-center text-muted">{t('login_to_continue')}</p>

                {error && <Alert variant="danger">{error}</Alert>}

                

                <hr />

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t('email')}</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t('enter_email')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>{t('password')}</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={t('enter_password')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="rounded-3"
                    />
                    <div className="text-end">
                      <Link to="/forgot-password" className="small text-decoration-none">
                        {t('forgot_password')}?
                      </Link>
                    </div>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 rounded-4"
                    disabled={loading}
                  >
                    {loading ? t('logging_in') + '...' : t('login')}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <p className="mb-0">
                    {t('dont_have_account')}{' '}
                    <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                      {t('create_account')}
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// Error Translator
function getFirebaseError(code) {
  switch (code) {
    case 'auth/invalid-email': return 'invalid_email';
    case 'auth/user-not-found': return 'user_not_found';
    case 'auth/wrong-password': return 'wrong_password';
    case 'auth/too-many-requests': return 'too_many_attempts';
    default: return 'login_failed';
  }
}
