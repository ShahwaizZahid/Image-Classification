import Navbar from "./components/Navbar";
import CardsGrid from "./components/CardGrid";
import Dropzone from "./components/Dropzone";
import ScoreTable from "./components/ScoreTable";
import axios from "axios";
import { useState } from "react";
import Card from "./components/Card";
import { players } from "./components/CardGrid";

const App = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [className, setClassName] = useState<string | null>(null);
  const [classProbability, setClassProbability] = useState<number[] | null>(
    null
  );
  const [classDictionary, setClassDictionary] = useState<string | null>(null);
  const [matchPlayerData, setMatchPlayerData] = useState<{
    name: string;
    imgSrc: string;
    dataPlayer: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // New state for error messages

  const playerNames = [
    "Virat Kohli",
    "Roger Federer",
    "Serena Williams",
    "Lionel Messi",
    "Maria Sharapova",
  ];

  const handleImageSelect = (base64Data: string) => {
    setImageData(base64Data);
    setError(null); // Reset error when new image is selected
  };

  const handleImageRemove = () => {
    setImageData(null);
    setClassificationResult(null); // Clear classification results
    setMatchPlayerData(null); // Clear matched player data
    setError(null); // Clear any existing error
  };

  const handleClassifyClick = () => {
    if (!imageData) {
      console.log("No image data available.");
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error before starting classification

    axios
      .post(
        "http://localhost:5000/classify_image",
        { image_data: imageData },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log("Raw response data:", response.data);

        if (!Array.isArray(response.data) || response.data.length === 0) {
          setError(
            "No classification data received. Please try another image."
          );
          setClassificationResult(null);
          setMatchPlayerData(null);
          return;
        }

        const responseData = response.data[0];
        const { class_probability, class_dictionary, class_name } =
          responseData;

        if (
          Array.isArray(class_probability) &&
          class_probability.length === 5
        ) {
          const formattedScores = playerNames.map((player) => ({
            player,
            score:
              class_probability[class_dictionary[player]]?.toFixed(2) || "N/A",
          }));

          setClassificationResult(formattedScores);
          setClassName(class_name);
          setClassProbability(class_probability);
          setClassDictionary(JSON.stringify(class_dictionary));

          const matchedPlayer = players.find(
            (p) => p.dataPlayer === class_name
          );
          if (matchedPlayer) {
            setMatchPlayerData(matchedPlayer);
          } else {
            setError("No matching player found.");
            setMatchPlayerData(null);
          }
        } else {
          setError("Invalid classification probabilities received.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred during classification. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <CardsGrid />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <Dropzone
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
            />
            {isLoading ? (
              <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md w-full">
                Classifying...
              </button>
            ) : (
              <button
                onClick={handleClassifyClick}
                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md w-full"
              >
                Classify
              </button>
            )}
          </div>
        </div>
        {matchPlayerData ? (
          <Card
            name={matchPlayerData.name}
            imgSrc={matchPlayerData.imgSrc}
            dataPlayer={matchPlayerData.dataPlayer}
          />
        ) : (
          error && (
            <div className="mt-4 text-red-500 text-center">
              {error}, No match the image following celebrities
            </div>
          )
        )}
      </div>
      {classificationResult && !error && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-bold">Classification Result</h2>
          <ScoreTable
            scores={classificationResult}
            classNamePlayer={className}
            classProbability={classProbability}
            classDictionary={classDictionary}
          />
        </div>
      )}
    </div>
  );
};

export default App;
