import React from "react";
import Navbar from "./components/Navbar";
import CardsGrid from "./components/CardGrid";
import Dropzone from "./Dropzone";
// import CardsGrid from "./components/CardsGrid";
// import Dropzone from "./components/Dropzone";
// import ScoreTable from "./components/ScoreTable";

const App = () => {
  const scores = [
    { player: "Lionel Messi", score: 0.4 },
    { player: "Maria Sharapova", score: 0.2 },
    { player: "Roger Federer", score: 0.11 },
    { player: "Serena Williams", score: 0.07 },
    { player: "Virat Kohli", score: 99.22 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Navbar */}
      <Navbar />

      {/* Cards Grid */}
      <CardsGrid />

      {/* Dropzone and Table */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <Dropzone />
          <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md w-full">
            Classify
          </button>
        </div>
        <div className="col-span-8">{/* <ScoreTable scores={scores} /> */}</div>
      </div>
    </div>
  );
};

export default App;
