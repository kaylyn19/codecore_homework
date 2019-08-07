import React from 'react';
import { KEYS } from '../constants'

function Keyboard() {
  return <div>{KEYS.map(k => <button>{k}</button>)}</div>;
}

export default Keyboard;
