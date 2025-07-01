import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './animations.css';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
      >
        <div className="loading-dot dot-1"></div>
        <div className="loading-dot dot-2"></div>
        <div className="loading-dot dot-3"></div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="loading-text"
      >
        {t('loading')}...
      </motion.h3>
    </div>
  );
}
