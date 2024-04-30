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

interface IPageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface IAllEpisodes {
  info: IPageInfo;
  results: IEpisode[];
}
