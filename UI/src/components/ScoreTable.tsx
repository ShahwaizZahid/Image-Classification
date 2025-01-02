import React from "react";

type ScoreTableProps = {
  scores: { player: string; score: string }[]; // Accept the scores with string for fixed decimal points
  classNamePlayer?: string | null; // Optional prop for the class name
  classProbability?: number[] | null; // Optional prop for the class probability
  classDictionary?: string | null; // Optional prop for the class dictionary
};

const ScoreTable = ({
  scores,
  classNamePlayer,
  classProbability,
  classDictionary,
}: ScoreTableProps) => {
  console.log("classDictionary", classDictionary);
  return (
    <div>
      <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Player</th>
            <th className="border border-gray-300 px-4 py-2">
              Probability Score
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.map(({ player, score }, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{player}</td>
              <td className="border border-gray-300 px-4 py-2">
                {classProbability![index]} {/* Format the probability */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
