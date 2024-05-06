import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MealPlansPage from "../pages/MealPlansPage";
import PostsPage from "../pages/PostsPage";
import WorkoutPlansPage from "../pages/WorkoutPlansPage";
import WorkoutStatusPage from "../pages/WorkoutStatusPage";
//new

const AppNavigation = () => {
  return (
    <div className="h-dvh">
      
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/workoutstatus" element={<WorkoutStatusPage />} />
          <Route path="/mealplans" element={<MealPlansPage />} />
          <Route path="/workoutplans" element={<WorkoutPlansPage />} />
        </Routes>
      </Router>
      
    </div>
  );
};

export default AppNavigation;
