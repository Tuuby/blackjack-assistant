import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Route path="/" element={HomePage} />
    </div>
  );
}

export default App;
