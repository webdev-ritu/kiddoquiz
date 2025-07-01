import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Home Page
      welcome: "Welcome to KiddoQuiz!",
      choose_category: "Choose a category to start learning:",
      start_learning: "Start Learning",
      play_now: "Play Now",
      parent_login: "Parent Login",

      // Categories
      animals: "Animals",
      colors: "Colors",
      fruits: "Fruits",
      math: "Math",
      alphabets: "Alphabets",
      spelling: "Spelling",
      vehicles: "Vehicles",
      shapes: "Shapes",
      numbers: "Numbers",

      // Quiz
      question: "Question",
      select_answer: "Select an answer",
      next: "Next",
      submit: "Submit",
      correct_answer: "Correct Answer",
      your_answer: "Your Answer",
      time_left: "Time Left",

      // Result Page
      quiz_completed: "Quiz Completed!",
      great_job: "Great Job!",
      good_try: "Good Try!",
      perfect_score: "Perfect!",
      perfect_message: "You got everything right! You're amazing!",
      good_score_message: "You're doing great! Keep it up!",
      try_again_message: "Practice makes perfect! Try again!",
      badges_earned: "Badges Earned",
      out_of: "out of",
      correct: "correct",
      your_score: "Your Score",
      view_dashboard: "View Dashboard",

      // Buttons
      try_again: "Try Again",
      choose_another: "Choose Another Quiz",
      start_quiz: "Start Quiz",
      logout: "Logout",
      login: "Login",
      signup: "Sign Up",
      continue: "Continue",
      back_to_home: "Back to Home",

      // Navigation
      home: "Home",
      dashboard: "Dashboard",
      categories: "Categories",
      profile: "Profile",
     
      login_required: "Login Required",
      please_login_to_start_quiz: "Please login or sign up to play the quiz.",
      login_now: "Login Now",
      cancel: "Cancel",

      // Auth
      email: "Email",
      password: "Password",
      confirm_password: "Confirm Password",
      enter_email: "Enter your email",
      enter_password: "Enter your password",
      creating_account: "Creating Account...",
      already_have_account: "Already have an account?",
      no_account: "Don't have an account?",

      // Errors & Messages
      passwords_not_match: "Passwords do not match.",
      login_failed: "Login failed. Please check your credentials.",
      signup_failed: "Signup failed. Try again later.",
      quiz_not_found: "Quiz not found for this category.",
      loading: "Loading...",

      // Dashboard
      progress_overview: "Progress Overview",
      quiz_history: "Quiz History",
      date: "Date",
      category: "Category",
      score: "Score",
      percentage: "Percentage",
      no_progress_data: "No progress data available yet.",
      no_quiz_attempts: "No quiz attempts recorded yet.",

      // Footer
      quick_links: "Quick Links",
      contact_us: "Contact Us",
      all_rights: "All rights reserved.",

      // Language
      change_language: "Change Language",
      english: "English",
      hindi: "Hindi",
    }
  },
  hi: {
    translation: {
      // Home Page
      welcome: "किडोक्विज़ में आपका स्वागत है!",
      choose_category: "सीखना शुरू करने के लिए एक श्रेणी चुनें:",
      start_learning: "सीखना शुरू करें",
      play_now: "अभी खेलें",
      parent_login: "अभिभावक लॉगिन",

      // Categories
      animals: "जानवर",
      colors: "रंग",
      fruits: "फल",
      math: "गणित",
      alphabets: "अक्षर",
      spelling: "वर्तनी",
      vehicles: "वाहन",
      shapes: "आकार",
      numbers: "संख्याएँ",

      // Quiz
      question: "प्रश्न",
      select_answer: "उत्तर चुनें",
      next: "अगला",
      submit: "सबमिट करें",
      correct_answer: "सही उत्तर",
      your_answer: "आपका उत्तर",
      time_left: "शेष समय",

      // Result Page
      quiz_completed: "क्विज पूरा हुआ!",
      great_job: "बहुत बढ़िया!",
      good_try: "अच्छी कोशिश!",
      perfect_score: "उत्तम!",
      perfect_message: "आपने सब कुछ सही किया! आप अद्भुत हैं!",
      good_score_message: "आप बहुत अच्छा कर रहे हैं! ऐसे ही जारी रखें!",
      try_again_message: "अभ्यास से पूर्णता आती है! फिर से प्रयास करें!",
      badges_earned: "अर्जित बैज",
      out_of: "में से",
      correct: "सही",
      your_score: "आपका स्कोर",
      view_dashboard: "डैशबोर्ड देखें",

      // Buttons
      try_again: "फिर से प्रयास करें",
      choose_another: "कोई और क्विज़ चुनें",
      start_quiz: "क्विज शुरू करें",
      logout: "लॉगआउट",
      login: "लॉगिन",
      signup: "साइन अप",
      continue: "जारी रखें",
      back_to_home: "होम पर वापस जाएं",
      
      //catories
      login_required: "लॉगिन आवश्यक",
      please_login_to_start_quiz: "कृपया क्विज खेलने के लिए लॉगिन करें या साइन अप करें।",
      login_now: "अभी लॉगिन करें",
      cancel: "रद्द करें",

      // Navigation
      home: "होम",
      dashboard: "डैशबोर्ड",
      categories: "श्रेणियाँ",
      profile: "प्रोफ़ाइल",

      // Auth
      email: "ईमेल",
      password: "पासवर्ड",
      confirm_password: "पासवर्ड की पुष्टि करें",
      enter_email: "अपना ईमेल दर्ज करें",
      enter_password: "अपना पासवर्ड दर्ज करें",
      creating_account: "खाता बना रहे हैं...",
      already_have_account: "पहले से खाता है?",
      no_account: "क्या आपके पास खाता नहीं है?",

      // Errors & Messages
      passwords_not_match: "पासवर्ड मेल नहीं खा रहे हैं।",
      login_failed: "लॉगिन विफल रहा। कृपया अपनी जानकारी जांचें।",
      signup_failed: "साइन अप विफल रहा। बाद में प्रयास करें।",
      quiz_not_found: "इस श्रेणी के लिए कोई क्विज नहीं मिला।",
      loading: "लोड हो रहा है...",

      // Dashboard
      progress_overview: "प्रगति अवलोकन",
      quiz_history: "क्विज इतिहास",
      date: "तारीख",
      category: "श्रेणी",
      score: "स्कोर",
      percentage: "प्रतिशत",
      no_progress_data: "अभी तक कोई प्रगति डेटा उपलब्ध नहीं है।",
      no_quiz_attempts: "अभी तक कोई क्विज प्रयास दर्ज नहीं किया गया है।",

      // Footer
      quick_links: "त्वरित लिंक",
      contact_us: "हमसे संपर्क करें",
      all_rights: "सभी अधिकार सुरक्षित।",

      // Language
      change_language: "भाषा बदलें",
      english: "अंग्रेज़ी",
      hindi: "हिंदी"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
