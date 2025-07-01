// CategoryCard.jsx
import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './animations.css'; 

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: 'spring', stiffness: 100, damping: 12 } 
  },
  hover: { 
    scale: 1.1,
    boxShadow: '0 10px 25px rgba(255, 153, 0, 0.6)', // warm glowing shadow on hover
    transition: { type: 'spring', stiffness: 300 }
  },
  tap: { scale: 0.95 },
};

export default function CategoryCard({ category, onClick }) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <Card
        role="button"
        tabIndex={0}
        className={`category-card shadow-sm border-0 ${category.id}`}
        onClick={onClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
        aria-label={t(category.id)}
      >
        <Card.Body className="text-center p-4">
          <div className="category-icon pulse mb-3">
            {category.icon}
          </div>
          <Card.Title as="h5" className="fw-bold text-primary" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
            {t(category.id)}
          </Card.Title>
          <Card.Text className="text-muted small">
            {t('start_learning')}
          </Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
