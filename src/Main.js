import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Camera from './Pages/Camera';
import Form from './Pages/Form';
import History from './Pages/History';

function App() {
    return (
    <Router>
        <Routes>
            <Route path="/" element = {<Camera />} />
            <Route path="/Form" element = {<Form />} />
            <Route path="/History" element = {<History />} />
        </Routes>
    </Router>
    );
    
}

export default App;