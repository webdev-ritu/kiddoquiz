import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './animations.css';

const characterImages = {
  monkey: '/assets/image/monkey.png',
  robot: '/assets/image/robot.png',
  elephant: '/assets/image/elephant.png',
  logo: '/assets/image/logo.png',
};

const animationVariants = {
  jump: {
    y: [0, -25, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
  wave: {
    rotate: [0, 15, -15, 15, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  none: {},
};

export default function Character({
  type = 'monkey',
  className = '',
  animate = true,
  size = 100,
}) {
  const chosenAnimation = animate
    ? type === 'robot'
      ? 'wave'
      : 'jump'
    : 'none';

  return (
    <motion.img
      src={characterImages[type] || characterImages.monkey}
      alt={`${type} character`}
      aria-label={`${type} character image`}
      role="img"
      className={`character ${type} ${className}`}
      style={{ width: size, height: 'auto', cursor: 'grab' }}
      variants={animationVariants}
      animate={chosenAnimation}
      whileHover={{ scale: 1.15, boxShadow: '0 10px 20px rgba(255, 183, 77, 0.7)' }}
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.2}
      dragMomentum={false}
    />
  );
}

Character.propTypes = {
  type: PropTypes.oneOf(['monkey', 'robot', 'elephant', 'logo']),
  className: PropTypes.string,
  animate: PropTypes.bool,
  size: PropTypes.number,
};
