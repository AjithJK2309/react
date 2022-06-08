import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Feedback from './components/get-feedback/user-feedback';
import { GlobalManage } from './helper/globalContext';
import {ThemeProvider} from 'styled-components';
import {theme} from './helper/Theme'


function App() {
  
  return (
    <GlobalManage>
      <ThemeProvider theme={theme}>
        <div>
          <Feedback></Feedback>
        </div>
      </ThemeProvider>
    </GlobalManage>        
  );
}

export default App;
