export const reset = () => ({
    type: "RESET"
  })
  
  export const success = () => ({
    type: "SUCCESS"
  })
  
  export const failure = () => ({
    type: "FAILURE"
  })
  
  export const guess = (letter) => ({
    type: "GUESS",
    letter,
  })