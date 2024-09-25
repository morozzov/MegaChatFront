import AppRouter from "./AppRouter";
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import {Form} from "antd";

function App() {
    return (
        <Router>
            <AppRouter/>
        </Router>
    );
}

export default App;
