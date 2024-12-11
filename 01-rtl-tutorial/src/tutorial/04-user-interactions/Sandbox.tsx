import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Sandbox() {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleDecrease = () => {
    setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="p-8 text-center">
      <h2 className="mb-4 text-2xl font-bold">Compteur : {count}</h2>
      <button
        className="mr-2 bg-red-500 px-4 py-2 text-white"
        onClick={handleDecrease}
      >
        Décrémenter
      </button>
      <button
        className="mr-2 bg-blue-500 px-4 py-2 text-white"
        onClick={handleIncrease}
      >
        Incrémenter
      </button>
      {isLiked ? (
        <button
          aria-label="bouton de désapprobation"
          className="mx-auto mt-16 block text-2xl text-red-500"
          onClick={handleToggleLike}
        >
          <FaHeart />
        </button>
      ) : (
        <button
          aria-label="bouton j'aime"
          className="mx-auto mt-16 block text-2xl text-red-500"
          onClick={handleToggleLike}
        >
          <FaRegHeart />
        </button>
      )}
    </div>
  );
}
