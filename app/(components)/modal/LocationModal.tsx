import { FC } from "react";
import { ILocation } from "@/app/(api)/locations/types";

const LocationModal: FC<{ location: ILocation }> = ({ location }) => {
  return (
    <div>
      <p className="text-xl font-bold mb-2">{location?.name}</p>
      <p className="text-gray-700">{location?.dimension}</p>
      <p className="text-gray-700 mb-4">{location?.type}</p>
    </div>
  );
};

export default LocationModal;
