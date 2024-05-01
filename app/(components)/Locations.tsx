"use client";

import { FC, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../(api)/locations";
import { ILocationResponse } from "../(api)/locations/types";
import { Pagination, Modal, LocationModal } from "../(components)";
import { ILocation } from "../(api)/locations/types";

const Locations: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery<ILocationResponse>(GET_LOCATIONS, {
    variables: { page: currentPage },
  });

  const handleLocationClick = (location: ILocation) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="content-frame">
        {data ? (
          <div>
            {data.locations.results.map((location) => (
              <div
                key={location.id}
                className="card-item cursor-pointer"
                onClick={() => handleLocationClick(location)}
              >
                <img
                  src="https://cdn.pixabay.com/photo/2022/09/02/07/26/rick-sanchez-7426878_960_720.jpg"
                  alt="Location"
                  className="card-img"
                />
                <div>
                  <h2 className="text-xl">{location.name}</h2>
                  <p className="text-gray-700">{location.dimension}</p>
                  <p className="text-gray-700">{location.type}</p>
                </div>
              </div>
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={data.locations.info.pages}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : (
          <span>Loading locations...</span>
        )}

        {isModalOpen && selectedLocation && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <LocationModal location={selectedLocation} />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default Locations;
