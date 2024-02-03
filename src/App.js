import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Form from './Form';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element ={<Home/>}></Route>
      <Route path="/form" element ={<Form/>}></Route>
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
