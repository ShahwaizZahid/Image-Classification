import React from "react";

type CardProps = {
  name: string;
  imgSrc: string;
  dataPlayer: string;
};

const Card = ({ name, imgSrc, dataPlayer }: CardProps) => {
  return (
    <div className="col flex flex-col items-center" data-player={dataPlayer}>
      <div className="rounded-full overflow-hidden w-32 h-32 shadow-lg">
        <img src={imgSrc} alt={name} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-center text-lg font-bold mt-2 uppercase">{name}</h4>
    </div>
  );
};

export default Card;
