import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Camera from './Pages/Camera';
import Form from './Pages/Form';
import History from './Pages/History';

function App() {
    return (
    <Router>
        <Routes>
            <Route path="/" element = {<Form />} />
            <Route path="/Camera" element = {<Camera />} />
            <Route path="/History" element = {<History />} />
        </Routes>
    </Router>
    );
    
}

export default App;