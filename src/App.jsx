import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Title from './components/Title';
import Quiz from './components/Quiz';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="App">
      <Title
        onHide={() => {
          setShowQuiz(true);
        }}
      />
      <Quiz visible={showQuiz} />
    </div>
  );
}

export default App;
