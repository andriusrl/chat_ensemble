import React from 'react'
import Routes from '../../Routes';
import GlobalStyle from '../../styles/global'
import {LoginProvider} from '../providers/loginValue'

function App() {
  return (
    <LoginProvider>
      <GlobalStyle />
      {Routes()}
    </LoginProvider>
  );
}

export default App;