import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Camera from './Pages/Camera';
import Form from './Pages/Form';

function App() {
    return (
    <Router>
        <Routes>
            <Route path="/" element = {<Camera />} />
            <Route path="/Form" element = {<Form />} />
        </Routes>
    </Router>
    );
    
}

export default App;