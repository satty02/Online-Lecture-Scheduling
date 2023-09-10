import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import AdminPanel from "./components/Admin/AdminPanel";
import InstructorPanel from "./components/Instructor/InstructorPanel";
import Login from "./components/Login/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" Component={Login}/>            
          <Route exact path="/instructor" Component={InstructorPanel}/>
          <Route path="/admin" Component={AdminPanel}/>
        </Routes>
      </Router>
  );
}

export default App;
