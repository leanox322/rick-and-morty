"use client";

import { FC, useEffect, useRef, useState } from "react";
import { IEpisode, ICharacter } from "../(api)/episodes/types";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  episode: IEpisode;
}

const Modal: FC<IModal> = ({ isOpen, onClose, episode }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [charactersToShow, setCharactersToShow] = useState(3);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const loadCharacters = async () => {
      if (episode && episode.characters) {
        const characterPromises = episode.characters
          .slice(0, charactersToShow)
          .map((url) => fetch(url).then((res) => res.json()));

        const characterResults = await Promise.all(characterPromises);
        setCharacters(characterResults);
      }
    };

    loadCharacters();
  }, [episode, charactersToShow]);

  const loadMoreCharacters = () => {
    setCharactersToShow((prev) => prev + 3);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center">
          <div
            ref={modalRef}
            className="relative p-5 bg-white border w-1/3 min-w-[300px] rounded-lg shadow-lg overflow-auto max-h-[400px]"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            <p className="text-xl font-bold mb-2">{episode?.name}</p>
            <p className="text-gray-700">{episode?.air_date}</p>
            <p className="text-gray-700 mb-4">{episode?.episode}</p>

            <div>
              {characters.map((character) => (
                <div key={character.id}>
                  <img
                    src={character.image}
                    alt="character"
                    className="w-8 h-8"
                  />
                  <p className="text-gray-800">{character.name}</p>
                </div>
              ))}

              {episode?.characters?.length > charactersToShow && (
                <button
                  onClick={loadMoreCharacters}
                  className="btn-secondary mt-4"
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
