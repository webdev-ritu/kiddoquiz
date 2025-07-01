import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useQuiz } from '../contexts/QuizContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
//import '../styles/main.css';


export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useQuiz();
  const [profileData, setProfileData] = useState({ displayName: '', phone: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function fetchProfile() {
      setLoading(true);
      try {
        const docRef = doc(db, 'parents', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      } catch {
        setError(t('failed_to_load_profile'));
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user, navigate, t]);

  const handleChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const docRef = doc(db, 'parents', user.uid);
      await updateDoc(docRef, {
        displayName: profileData.displayName,
        phone: profileData.phone
      });
      setSuccessMsg(t('profile_updated'));
    } catch {
      setError(t('failed_to_update_profile'));
    }
  };

  if (loading) return <Container className="py-5"><p>{t('loading')}...</p></Container>;

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Card className="p-4">
              <h2 className="mb-4">{t('profile')}</h2>
              {error && <Alert variant="danger" className="animate__animated animate__shakeX">{error}</Alert>}
              {successMsg && <Alert variant="success" className="animate__animated animate__fadeIn">{successMsg}</Alert>}

              <Form onSubmit={handleSave}>
                <Form.Group className="mb-3" controlId="profileEmail">
                  <Form.Label>{t('email')}</Form.Label>
                  <Form.Control type="email" value={profileData.email || ''} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="profileDisplayName">
                  <Form.Label>{t('display_name')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="displayName"
                    value={profileData.displayName || ''}
                    onChange={handleChange}
                    placeholder={t('enter_display_name')}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="profilePhone">
                  <Form.Label>{t('phone')}</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={profileData.phone || ''}
                    onChange={handleChange}
                    placeholder={t('enter_phone')}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" whileTap={{ scale: 0.95 }}>
                  {t('save_changes')}
                </Button>
              </Form>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
