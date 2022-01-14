import React from "react";
import "./App.css";
import { Overview } from "./pages/Overview";

export const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

function App() {
  return <Overview />;
}

export default App;
