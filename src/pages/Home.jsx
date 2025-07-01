import { useState } from 'react';
import useSound from '../hooks/useSound';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useQuiz } from '../contexts/QuizContext';
import Lottie from 'lottie-react';
import kidWelcomeAnimation from '../assets/lottie/kid-welcome.json';
import CategoryCard from '../components/CategoryCard';
import LoginPopup from '../components/LoginPopup';
import '../components/animations.css';

const categories = [
  { id: 'animals', name: 'Animals', icon: '🐶', color: 'primary' },
  { id: 'colors', name: 'Colors', icon: '🎨', color: 'success' },
  { id: 'fruits', name: 'Fruits', icon: '🍎', color: 'danger' },
  { id: 'math', name: 'Math', icon: '🔢', color: 'warning' },
];

export default function Home() {
  const { user, selectCategory } = useQuiz();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleCategorySelect = (categoryId) => {
    if (!user) {
      setShowPopup(true);
    } else {
      selectCategory(categoryId);
      navigate(`/quiz/${categoryId}`);
    }
  };

  return (
    <div className="home-page with-bubbles">
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-center mb-3 fw-bold text-primary">🎉 Welcome to KiddoQuiz! 🎉</h1>
          <h4 className="text-center mb-5 text-muted">Pick a category and start your adventure</h4>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={6} lg={4} className="text-center">
              <Lottie 
                animationData={kidWelcomeAnimation}
                loop
                autoplay
                style={{ height: 250 }}
              />
            </Col>
          </Row>

          <Row className="g-4 justify-content-center">
            {categories.map((category) => (
              <Col key={category.id} xs={12} sm={6} md={3}>
                <CategoryCard 
                  category={category}
                  onClick={() => handleCategorySelect(category.id)}
                />
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* 🔐 Show login popup if not logged in */}
        <LoginPopup show={showPopup} handleClose={() => setShowPopup(false)} />
      </Container>
    </div>
  );
}
