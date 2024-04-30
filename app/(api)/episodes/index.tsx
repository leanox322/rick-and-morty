import axios from "axios";
import { IAllEpisodes } from "./types";

export const getEpisodes = async (
  currentPage: number
): Promise<IAllEpisodes | null> => {
  try {
    const response = await axios.get<IAllEpisodes>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/episode?page=${currentPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return null;
  }
};
