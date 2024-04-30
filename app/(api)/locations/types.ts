export interface ILocation {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

export interface ILocationResults {
  results: ILocation[];
  info: { pages: number };
}

export interface ILocationResponse {
  locations: ILocationResults;
}
