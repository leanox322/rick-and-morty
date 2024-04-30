"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { ICharactersResponse } from "../(api)/characters/types";
import { getCharacters } from "../(api)/characters";
import { Pagination } from "./";

const Characters: FC = () => {
  const [allCharacters, setAllCharacters] =
    useState<ICharactersResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState<null | string>("");

  const fetchCharacters = useCallback(async () => {
    const characters = await getCharacters(
      currentPage,
      searchTerm,
      status,
      gender
    );

    if (!characters) {
      setError("There is nothing here.");
    } else {
      setAllCharacters(characters);
      setError(null);
    }
  }, [currentPage, searchTerm, status, gender]);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  return (
    <section>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          className="btn-primary"
          style={{ cursor: "auto" }}
        />

        <select
          className="btn-primary"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Any Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          className="btn-primary"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Any Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <button className="btn-secondary" onClick={fetchCharacters}>
          Search
        </button>
      </div>

      <div className="content-frame">
        {error ? (
          <span>{error}</span>
        ) : allCharacters ? (
          <div>
            {allCharacters.results.map((character) => (
              <div key={character.id} className="card-item">
                <img
                  src={character.image}
                  alt="character"
                  className="card-img"
                />
                <div>
                  <h2 className="text-xl">{character.name}</h2>
                  <p className="text-gray-700">{character.gender}</p>
                  <p className="text-gray-700">{character.species}</p>
                  <p className="text-gray-700">{character.status}</p>
                </div>
              </div>
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={allCharacters.info.pages}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : (
          <p>Loading characters...</p>
        )}
      </div>
    </section>
  );
};

export default Characters;
