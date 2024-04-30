import { IPageInfo } from "@/app/types";

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ICharacter {
  id: number;
  name: string;
  image: string;
}

export interface IEpisodesResponse {
  info: IPageInfo;
  results: IEpisode[];
}
