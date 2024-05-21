// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Container from "./components/Container";
import Main from "./components/Main";
import Blog from "./components/Blog";
import ResourcesPage from "./components/ResourcesPage";
import Tools from "./components/Tools";
import FaqAndReviews from "./components/FaqAndReviews";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
  const [tasksCounter, setTasksCounter] = useState(0);
  const [tasksCounterBig, setTasksCounterBig] = useState(0);
  const [propTasks, setPropTasks] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const addTask = (newTask) => {
    setPropTasks((prevPropTasks) => [...prevPropTasks, newTask]);
    setTasksCounter((prevCounter) => prevCounter + 1);
    setTasksCounterBig((prevCounterBig) => prevCounterBig + 1);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("user", userData);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onTaskAdd={addTask} user={user} onLogout={handleLogout} />
              {user ? (
                <>
                  <Container tasksCounter={tasksCounter} />
                  <Main
                    onTaskAdd={addTask}
                    tasksCounter={tasksCounter}
                    setTasksCounter={setTasksCounter}
                    setTasksCounterBig={setTasksCounterBig}
                    propTasks={propTasks}
                    updatePropTasks={setPropTasks}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )}
            </>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/faq" element={<FaqAndReviews />} />
        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
