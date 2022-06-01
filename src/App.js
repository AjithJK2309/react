import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Feedback from './components/user-feedback';
import { GlobalManage } from './helper/globalContext';


function App() {
  
  return (
    <GlobalManage>
      <div>
        <Feedback></Feedback>
      </div>
    </GlobalManage>        
  );
}

export default App;
