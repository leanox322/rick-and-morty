import { IPageInfo } from "@/app/types";

interface ILocation {
  name: string;
  url: string;
}

export interface ICharactersResponse {
  info: IPageInfo;
  results: ICharacter[];
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ILocation;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
