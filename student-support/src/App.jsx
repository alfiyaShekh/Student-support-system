import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
<<<<<<< HEAD
import MentorDashboard from "./pages/MentorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
=======
import Login from "./pages/Login";

>>>>>>> 4c169527f01e67b171d542269f509ac745a31c4d

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
=======
        <Route path="/login" element={<Login />} />
>>>>>>> 4c169527f01e67b171d542269f509ac745a31c4d
      </Routes>
    </Router>
  );
}

export default App;