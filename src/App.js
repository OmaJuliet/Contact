import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Update from './Pages/Update';
import Create from './Pages/Create';

function App() {
  return (
    <>
      <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/success" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<Update />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;






