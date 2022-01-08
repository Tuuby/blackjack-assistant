import React from "react";
import "./App.css";
import useSWR from "swr";
import { BlackjackTipp } from "./components/blackjackTipp";

const url = "hier könnte ihre URL stehen";

function App() {
  const { data: result, error } = useSWR(url);

  if (error) return <h1>Something went wring!</h1>;
  if (!result) return <h1>Loading...</h1>;

  return (
    <main className="App">
      <h1>Test message</h1>
      <div>
        {result.results.map((blackjackTipp: string) => (
          <BlackjackTipp bjtipp={blackjackTipp} />
        ))}
      </div>
    </main>
  );
}

export default App;
