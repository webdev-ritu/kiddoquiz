import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import './styles/main.css';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { QuizProvider } from './contexts/QuizContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <QuizProvider>
          <App />
        </QuizProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);