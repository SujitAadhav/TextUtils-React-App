import './App.css';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Contact from './components/Contact';
import React, {useState} from 'react'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState('dark');
  const [btnText, setBtnText] = useState('Enable Dark Mode')
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const  toggleMode = () =>{
    if(mode==='dark'){
      setMode('light');
      setBtnText('Enable Light Mode')
      document.body.style.backgroundColor='#0c0027';
      document.body.style.color='white';
      showAlert('Dark mode has been enabled', 'success');
      document.title="TextUtils - Dark Mode";
    }else{
      setMode('dark');
      setBtnText('Enable Dark Mode')
      document.body.style.backgroundColor='white';
      document.body.style.color='black';
      showAlert('Light mode has been enabled', 'success');
      document.title="TextUtils - Light Mode";
    }
  }

  return (
    <>
    <Router>
    <Navbar title="TextUtils" about="About" contact="Contact Us" mode={mode} toggleMode={toggleMode} btnText={btnText}/>
    <Alert alert={alert}/>
    <div className="container mt-4">
    <Routes>
          <Route exat path="/" element={<TextForm heading="Enter the Text to Analyze" mode={mode} alert={showAlert}/>} />
          <Route exat path="/about" element={<About />} />
          <Route exat path="/contact" element={<Contact />} />
    </Routes>
    </div>
    </Router>
    
    </>
  );
}

export default App;
