import axios from "axios";
import { IEpisodesResponse } from "./types";

export const getEpisodes = async (
  currentPage: number
): Promise<IEpisodesResponse | null> => {
  try {
    const response = await axios.get<IEpisodesResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/episode?page=${currentPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return null;
  }
};
