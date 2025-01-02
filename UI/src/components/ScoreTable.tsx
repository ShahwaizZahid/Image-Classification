import React from "react";

type ScoreTableProps = {
  scores: { player: string; score: number }[];
};

const ScoreTable = ({ scores }: ScoreTableProps) => {
  return (
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
              {score.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScoreTable;
