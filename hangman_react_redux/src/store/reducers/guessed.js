const initialState = {
    word: "SUBWAY",
    guessedLetters: [],
    status: "PLAYING",
  }
  
  const guessed = (state = {}, action) => {
    switch (action.type) {
      case 'RESET':
        return state;
      case 'SUCCESS':
        return state;
      case 'FAILURE':
        return state;
      case 'GUESS':
      default:
        return state;
    }
  };
  
  export default guessed