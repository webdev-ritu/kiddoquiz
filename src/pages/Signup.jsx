import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player'; // ✅ Lottie Player
import '../styles/main.css';
import loginLottie from '../assets/lottie/kid-welcome.json'; // ✅ Path to your animation

export default function Signup() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError(t('passwords_not_match'));
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'parents', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
        displayName: '',
        phone: ''
      });

      navigate('/');  // Redirect to home page after signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Card className="p-4 shadow text-center">
              {/* Lottie animation inside the card */}
              <Player
                autoplay
                loop
                src={loginLottie}
                style={{ height: '180px', width: '180px', margin: '0 auto 1rem' }}
              />
              <h2 className="mb-4">{t('signup')}</h2>
              {error && (
                <Alert variant="danger" className="animate__animated animate__shakeX">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="signupEmail">
                  <Form.Label>{t('email')}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t('enter_email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupPassword">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('enter_password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="signupConfirmPassword">
                  <Form.Label>{t('confirm_password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('confirm_password')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button variant="primary" type="submit" disabled={loading} className="w-100">
                    {loading ? t('creating_account') : t('signup')}
                  </Button>
                </motion.div>
              </Form>

              <div className="text-center mt-3">
                <p>
                  {t('already_have_account')}{' '}
                  <Button variant="link" onClick={() => navigate('/login')}>
                    {t('login')}
                  </Button>
                </p>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
