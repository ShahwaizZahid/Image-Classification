import Navbar from "./components/Navbar";
import CardsGrid from "./components/CardGrid";
import Dropzone from "./components/Dropzone";
import ScoreTable from "./components/ScoreTable";
import axios from "axios";
import { useState } from "react";
import Card from "./components/Card";
import { players } from "./components/CardGrid";

const App = () => {
  const [imageData, setImageData] = useState<string | null>(null); // Store the base64 image data
  const [classificationResult, setClassificationResult] = useState<any>(null); // Store the classification result
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
  // Player names to map against the classification probabilities
  const playerNames = [
    "Virat Kohli",
    "Roger Federer",
    "Serena Williams",
    "Lionel Messi",
    "Maria Sharapova",
  ];

  // Handle image data from Dropzone
  const handleImageSelect = (base64Data: string) => {
    setImageData(base64Data); // Update imageData with the base64 string
  };

  // Handle image removal
  const handleImageRemove = () => {
    setImageData(null); // Reset the image data when the image is removed
  };

  // Handle button click for classification
  const handleClassifyClick = () => {
    if (!imageData) {
      console.log("No image data available.");
      return;
    }

    // Send image data as JSON payload
    axios
      .post(
        "http://localhost:5000/classify_image",
        { image_data: imageData }, // Send base64 image data in JSON
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is set to application/json
          },
        }
      )
      .then((response) => {
        console.log("Raw response data:", response.data); // Log the raw response

        // Check if the response is valid and has at least one entry
        if (!Array.isArray(response.data) || response.data.length === 0) {
          console.error("Invalid response: No classification data received.");
          setClassificationResult([]); // Clear the classification result
          setMatchPlayerData(null); // Clear matched player data
          return;
        }

        // Access the first element in the response array
        const responseData = response.data[0];

        const { class_probability, class_dictionary, class_name } =
          responseData;

        // Check if class_probability is a valid array with the expected length
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
            console.log("Matched Player:", matchedPlayer);
            setMatchPlayerData(matchedPlayer);
          } else {
            console.log("No matching player found.");
            setMatchPlayerData(null);
          }
        } else {
          console.error("Invalid class_probability data:", class_probability);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Navbar */}
      <Navbar />

      {/* Cards Grid */}
      <CardsGrid />
      <div className="flex justify-center items-center">
        {/* Dropzone and Table */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <Dropzone
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove} // Pass remove handler
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
        {matchPlayerData && (
          <div>
            <Card
              name={matchPlayerData.name}
              imgSrc={matchPlayerData.imgSrc}
              dataPlayer={matchPlayerData.dataPlayer}
            ></Card>
          </div>
        )}
      </div>

      {/* Display Classification Result */}
      {classificationResult && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md">
          <h2 className="text-xl font-bold">Classification Result</h2>
          <ScoreTable
            scores={classificationResult}
            classNamePlayer={className}
            classProbability={classProbability}
            classDictionary={classDictionary}
          />{" "}
          {/* Display dynamically updated scores */}
        </div>
      )}
    </div>
  );
};

export default App;
