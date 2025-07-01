import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import useSound from '../hooks/useSound';
import './QuizCard.css';
const imageImports = import.meta.glob('../assets/image/*', { eager: true, as: 'url' });


export default function QuizCard({ question, handleAnswer, currentQuestion, totalQuestions }) {
  const correct = useSound('correct');
  const wrong = useSound('wrong');

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(null);

  const handleOptionClick = (optionIndex) => {
    if (selectedIndex !== null) return;

    const isCorrect = optionIndex === question.correctAnswer;
    setSelectedIndex(optionIndex);
    setIsCorrectAnswer(isCorrect);

    if (isCorrect) {
      correct.play();
    } else {
      wrong.play();
    }

    setTimeout(() => {
      handleAnswer(isCorrect);
      setSelectedIndex(null);
      setIsCorrectAnswer(null);
    }, 1000);
  };

  const optionVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    correct: { backgroundColor: '#c8e6c9', color: '#256029', scale: 1.05 },
    incorrect: { backgroundColor: '#ffcdd2', color: '#c63737', scale: 1.05 },
  };

  const imageSrc = imageImports[`../assets/image/${question.image}`] || imageImports['../assets/image/default.png'];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="quiz-card shadow rounded-4 p-3">
        <Card.Header className="text-center bg-warning bg-opacity-25 rounded-3">
          <h4 className="question-title">{question.question}</h4>
          <p>Question {currentQuestion + 1} of {totalQuestions}</p>
        </Card.Header>

        <Card.Body>
          {question.image && (
            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
  src={imageSrc}
  alt="Question visual"
  className="img-fluid quiz-image rounded"
  style={{
    maxHeight: 200,
    objectFit: 'contain',
    boxShadow: '0 4px 15px rgba(255, 179, 0, 0.5)',
  }}
/>

            </motion.div>
          )}

          <Row className="g-3">
            {question.options.map((option, index) => {
              const isSelected = selectedIndex === index;
              let variant = 'initial';
              if (isSelected) variant = isCorrectAnswer ? 'correct' : 'incorrect';

              return (
                <Col key={index} xs={12} sm={6}>
                  <motion.button
                    type="button"
                    className="w-100 option-button"
                    onClick={() => handleOptionClick(index)}
                    variants={optionVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    animate={variant}
                    disabled={selectedIndex !== null}
                  >
                    {option}
                  </motion.button>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
