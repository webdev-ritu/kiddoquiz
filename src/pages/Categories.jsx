import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import LoginPopup from '../components/LoginPopup';
import '../styles/categories.css';

import {
  GiLion,
  GiFruitBowl,
  GiCarWheel,
  GiPalette,
  GiPerspectiveDiceSixFacesRandom,
  GiCircle,
} from 'react-icons/gi';

const categories = [
  { id: 1, nameKey: 'animals', icon: <GiLion size={70} color="#ff7043" />, path: 'animals' },
  { id: 2, nameKey: 'fruits', icon: <GiFruitBowl size={70} color="#66bb6a" />, path: 'fruits' },
  { id: 3, nameKey: 'vehicles', icon: <GiCarWheel size={70} color="#29b6f6" />, path: 'vehicles' },
  { id: 4, nameKey: 'colors', icon: <GiPalette size={70} color="#ab47bc" />, path: 'colors' },
  { id: 5, nameKey: 'numbers', icon: <GiPerspectiveDiceSixFacesRandom size={70} color="#ffa726" />, path: 'numbers' },
  { id: 6, nameKey: 'shapes', icon: <GiCircle size={70} color="#ef5350" />, path: 'shapes' },
];

export default function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, selectCategory } = useQuiz();
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = (categoryPath) => {
    if (!user) {
      setShowPopup(true);
    } else {
      selectCategory(categoryPath); // ✅ Save selected category
      navigate(`/quiz/${categoryPath}`);
    }
  };

  return (
    <Container className="py-5">
      <motion.h2
        className="text-center mb-5 category-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {t('choose_category')}
      </motion.h2>

      <Row className="g-4">
        {categories.map((category, index) => (
          <Col xs={12} sm={6} md={4} key={category.id}>
            <motion.div
              whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0] }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className="category-card text-center p-4 h-100"
                onClick={() => handleCardClick(category.path)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-icon mb-3">{category.icon}</div>
                <Card.Body>
                  <Card.Title className="category-title">{t(category.nameKey)}</Card.Title>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <LoginPopup show={showPopup} handleClose={() => setShowPopup(false)} />
    </Container>
  );
}
