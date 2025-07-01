import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useQuiz } from '../contexts/QuizContext';
import QuizCard from '../components/QuizCard';
import ScoreCard from '../components/ScoreCard';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/lottie/loader-kid.json';
import './bubbles.css';

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const {
    quizQuestions,
    currentQuestion,
    score,
    showScore,
    handleAnswer,
    selectCategory
  } = useQuiz();

  useEffect(() => {
    if (!quizQuestions.length && category) {
      selectCategory(category);
    }
  }, [category, selectCategory, quizQuestions]);

  if (showScore) {
    return (
      <Container className="quiz-bg py-5 position-relative">
        <div className="bubbles"></div>
        <ScoreCard />
      </Container>
    );
  }

  return (
    <Container className="quiz-bg py-5 position-relative">
      <div className="bubbles"></div>
      {quizQuestions.length > 0 && currentQuestion < quizQuestions.length ? (
        <QuizCard
          question={quizQuestions[currentQuestion]}
          handleAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
        />
      ) : (
        <div className="text-center mt-5">
          <Lottie animationData={loaderAnimation} loop autoplay style={{ height: 200 }} />
          <h4 className="mt-3">Loading questions...</h4>
        </div>
      )}
    </Container>
  );
}
