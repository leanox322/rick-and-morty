"use client";

import { FC, useState, useEffect } from "react";
import { ICharacter, IEpisode } from "@/app/(api)/episodes/types";

const EpisodeModal: FC<{ episode: IEpisode }> = ({ episode }) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [charactersToShow, setCharactersToShow] = useState(3);

  useEffect(() => {
    const loadCharacters = async () => {
      if (episode && episode.characters) {
        const urlsToFetch = episode.characters.slice(0, charactersToShow);
        const characterPromises = urlsToFetch.map((url) =>
          fetch(url).then((res) => res.json())
        );

        try {
          const characterResults = await Promise.all(characterPromises);
          setCharacters(characterResults);
        } catch (error) {
          console.error("Failed to fetch characters:", error);
        }
      }
    };

    loadCharacters();
  }, [episode, charactersToShow]);

  const loadMoreCharacters = () => {
    setCharactersToShow((prev) => prev + 3);
  };

  return (
    <div>
      <p className="text-xl font-bold mb-2">{episode?.name}</p>
      <p className="text-gray-700">{episode?.air_date}</p>
      <p className="text-gray-700 mb-4">{episode?.episode}</p>

      {characters.map((character) => (
        <div key={character.id}>
          <img src={character.image} alt="character" className="w-8 h-8" />
          <p className="text-gray-800">{character.name}</p>
        </div>
      ))}

      {episode?.characters?.length > charactersToShow && (
        <button onClick={loadMoreCharacters} className="btn-secondary mt-4">
          Load More
        </button>
      )}
    </div>
  );
};

export default EpisodeModal;
