import React from 'react';
import './App.css';

// Components
import Keyboard from './components/keyboard';
import Gallows from './components/gallows';
import Word from './components/word';

// State
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers';

function App() {
  const word = 'Subway';
  const guessedWord = '_ _ B _ _ Y';

  const store = createStore(rootReducer, composeWithDevTools())

  return (
    <div className='App'>
      <Provider store={store}>
        <h1>Hangman</h1>
        <Keyboard />
        <Gallows />
        <Word word={guessedWord} />
      </Provider>
    </div>
  );
}

export default App;
