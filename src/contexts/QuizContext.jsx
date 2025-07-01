import { createContext, useContext, useState, useEffect } from 'react';
import { questions } from '../config/questions';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [language, setLanguage] = useState('en');
  const [progress, setProgress] = useState([]);

  // Listen to Firebase Auth changes and update user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    const filteredQuestions = questions.filter(q => q.category === category);
    setQuizQuestions(filteredQuestions);
    resetQuiz();
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);

      // Save progress with the updated score
      setProgress(prevProgress => [
        ...prevProgress,
        {
          date: new Date().toISOString(),
          category: selectedCategory,
          score: isCorrect ? score + 1 : score,
          total: quizQuestions.length,
        },
      ]);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        user,
        setUser,
        currentQuestion,
        score,
        showScore,
        selectedCategory,
        quizQuestions,
        language,
        setLanguage,
        progress,
        resetQuiz,
        selectCategory,
        handleAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
