import Card from "./Card";
export const players = [
  {
    name: "Lionel Messi",
    imgSrc: "./images/messi.jpeg",
    dataPlayer: "lionel_messi",
  },
  {
    name: "Maria Sharapova",
    imgSrc: "./images/sharapova.jpeg",
    dataPlayer: "maria_sharapova",
  },
  {
    name: "Roger Federer",
    imgSrc: "./images/federer.jpeg",
    dataPlayer: "roger_federer",
  },
  {
    name: "Serena Williams",
    imgSrc: "./images/serena.jpeg",
    dataPlayer: "serena_williams",
  },
  {
    name: "Virat Kohli",
    imgSrc: "./images/virat.jpeg",
    dataPlayer: "virat_kohli",
  },
];
const CardsGrid = () => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      {players.map((player, index) => (
        <Card
          key={index}
          name={player.name}
          imgSrc={player.imgSrc}
          dataPlayer={player.dataPlayer}
        />
      ))}
    </div>
  );
};

export default CardsGrid;
