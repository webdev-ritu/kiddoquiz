import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useQuiz } from '../contexts/QuizContext';
import ConfettiEffect from '../components/ConfettiEffect';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import celebrate from '../assets/lottie/celebrate.json';
import happy from '../assets/lottie/happy.json';
import sad from '../assets/lottie/sad.json';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Results() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    score, quizQuestions, resetQuiz,
    selectedCategory, progress,
    language, setLanguage, user
  } = useQuiz();

  const percentage = Math.round((score / quizQuestions.length) * 100);
  const perfectScore = percentage === 100;
  const goodScore = percentage >= 70;

  const avatarAnimation = perfectScore ? celebrate : goodScore ? happy : sad;

  // Save progress to Firebase
  useEffect(() => {
    const saveToFirebase = async () => {
      if (!user) return;
      try {
        await addDoc(collection(db, "quizProgress"), {
          uid: user.uid,
          category: selectedCategory,
          score,
          total: quizQuestions.length,
          percentage,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.error("Error saving quiz progress:", err);
      }
    };
    saveToFirebase();
  }, [user, score, selectedCategory]);

  return (
    <Container className="results-page py-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center">
        
        <ConfettiEffect active={goodScore} />
        <h1 className="mb-4">{t('quiz_completed')}</h1>

        <div style={{ maxWidth: 250 }} className="mx-auto mb-4">
          <Lottie animationData={avatarAnimation} loop autoplay />
        </div>

        <h4 className="mb-3">
          {selectedCategory && <>Category: <Badge bg="info">{t(selectedCategory)}</Badge></>}
        </h4>

        <Card className="score-card mx-auto mb-4" style={{ maxWidth: 500 }}>
          <Card.Body>
            <div className={`score-circle mx-auto mb-3 ${perfectScore ? 'perfect' : goodScore ? 'good' : 'average'}`} style={{ '--percentage': `${percentage}%` }}>
              <h1>{percentage}%</h1>
            </div>
            <h3>{score} {t('out_of')} {quizQuestions.length} {t('correct')}</h3>
            {perfectScore ? (
              <div className="text-success">
                <h4>🎉 {t('perfect_score')}!</h4>
                <p>{t('perfect_message')}</p>
              </div>
            ) : goodScore ? (
              <div className="text-success">
                <h4>👏 {t('great_job')}!</h4>
                <p>{t('good_score_message')}</p>
              </div>
            ) : (
              <div className="text-warning">
                <h4>👍 {t('good_try')}</h4>
                <p>{t('try_again_message')}</p>
              </div>
            )}
          </Card.Body>
        </Card>

        <Row className="justify-content-center gap-3">
          <Col xs={12} sm={5} md={4}>
            <Button variant="outline-primary" size="lg" className="w-100" onClick={() => {
              resetQuiz();
              navigate(`/quiz/${selectedCategory}`);
            }}>
              {t('try_again')}
            </Button>
          </Col>
          <Col xs={12} sm={5} md={4}>
            <Button variant="success" size="lg" className="w-100" onClick={() => navigate('/')}>
              {t('choose_another')}
            </Button>
          </Col>
        </Row>

        <div className="mt-4">
          <h5>{t('change_language')}:</h5>
          <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => setLanguage('en')} disabled={language === 'en'}>English</Button>
          <Button variant="outline-secondary" size="sm" onClick={() => setLanguage('hi')} disabled={language === 'hi'}>हिंदी</Button>
        </div>

      </motion.div>
    </Container>
  );
}
