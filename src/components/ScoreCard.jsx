import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ConfettiEffect from './ConfettiEffect';
import { useQuiz } from '../contexts/QuizContext';
import './animations.css';

const bounceTransition = {
  y: {
    duration: 0.6,
    yoyo: Infinity,
    ease: "easeOut",
  },
};

export default function ScoreCard() {
  const { score, quizQuestions, resetQuiz } = useQuiz();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center score-card-container p-4 rounded-4 shadow-lg"
    >
      <ConfettiEffect active={percentage >= 70} />

      <motion.h2
        className="mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Quiz Completed!
      </motion.h2>

      <motion.div
        className="score-circle mx-auto mb-4 d-flex flex-column align-items-center justify-content-center"
        style={{ 
          width: 160, height: 160, borderRadius: '50%', 
          background: 'radial-gradient(circle at center, #ffd54f, #ffb300)', 
          boxShadow: '0 0 25px #ffb300aa',
          color: '#5d3a00',
          fontFamily: "'Comic Sans MS', cursive",
          fontWeight: '700',
          fontSize: '3.5rem',
          userSelect: 'none',
          textShadow: '0 0 8px #ffb300',
          cursor: 'default',
        }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 25px #ffb300aa',
            '0 0 45px #ffd54fbb',
            '0 0 25px #ffb300aa',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {percentage}%
        <motion.p
          style={{ fontSize: '1.2rem', fontWeight: 500, marginTop: 8, color: '#6d4c00' }}
        >
          {score} out of {quizQuestions.length} correct
        </motion.p>
      </motion.div>

      {percentage >= 70 ? (
        <motion.div
          className="mb-4 text-success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h4>🎉 Great Job! 🎉</h4>
          <p>You're a superstar!</p>
        </motion.div>
      ) : (
        <motion.div
          className="mb-4 text-warning"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h4>Good Try!</h4>
          <p>Keep practicing to improve!</p>
        </motion.div>
      )}

      <motion.div
        className="d-flex justify-content-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => resetQuiz()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </Button>
        <Button 
          variant="success" 
          size="lg"
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Choose Another Quiz
        </Button>
      </motion.div>
    </motion.div>
  );
}
