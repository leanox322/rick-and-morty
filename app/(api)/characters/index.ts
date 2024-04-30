import axios from "axios";
import { ICharactersResponse } from "./types";

export const getCharacters = async (
  currentPage: number,
  searchTerm?: string,
  status?: string,
  gender?: string
): Promise<ICharactersResponse | null> => {
  try {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      ...(searchTerm && { name: searchTerm }),
      ...(status && { status: status }),
      ...(gender && { gender: gender }),
    });

    const response = await axios.get<ICharactersResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/character/?${queryParams}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
};
