"use client";

import { FC, useEffect, useState } from "react";
import { getEpisodes } from "../(api)/episodes";
import { IAllEpisodes, IEpisode } from "../(api)/episodes/types";
import { Modal, Pagination } from "../(components)";

const Episodes: FC = () => {
  const [allEpisodes, setAllEpisodes] = useState<IAllEpisodes | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodes = await getEpisodes(currentPage);
      setAllEpisodes(episodes);
    };

    fetchEpisodes();
  }, [currentPage]);

  const handleEpisodeClick = (episode: IEpisode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="content-frame">
        {allEpisodes ? (
          <div>
            {allEpisodes.results.map((episode) => (
              <div
                key={episode.id}
                onClick={() => handleEpisodeClick(episode)}
                className="flex items-center border border-gray-300 p-4 rounded mb-3 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2021/06/17/22/55/rick-and-morty-6344804_1280.jpg"
                  alt="Episode Thumbnail"
                  className="w-20 h-20 mr-4 rounded"
                />
                <div>
                  <h2 className="text-xl">{episode.name}</h2>
                  <p className="text-gray-700">{episode.air_date}</p>
                </div>
              </div>
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={allEpisodes.info.pages}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : (
          <p>Loading episodes...</p>
        )}
      </div>

      {isModalOpen && selectedEpisode && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          episode={selectedEpisode}
        />
      )}
    </section>
  );
};

export default Episodes;
