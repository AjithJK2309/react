import './App.css';
import React,{ useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Feedback from './components/user-feedback';

// Context creation
export const userContext = React.createContext()

function App() {
  // Global array for state management
  const [data,setData] = useState([]);

  return (
    <userContext.Provider value={data}>
      <div className="App">
        <Feedback></Feedback>        
      </div>
    </userContext.Provider>
  );
}

export default App;
