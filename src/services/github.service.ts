import axios from "axios";
import { Repository, User } from "@/types/globals.type";

const githubApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GITHUB_API_URL || "https://api.github.com",
});

export const getRepositoriesByUser = async (
  username: string
): Promise<Repository[]> => {
  try {
    const { data } = await githubApi.get(`/users/${username}/repos`, {
      params: {
        per_page: 10,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    throw error;
  }
};

export const getUser = async (username: string): Promise<User> => {
  try {
    const { data } = await githubApi.get(`/users/${username}`);
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getRepositoryDetail = async (
  username: string,
  repo: string
): Promise<Repository> => {
  try {
    const { data } = await githubApi.get(`/repos/${username}/${repo}`);
    return data;
  } catch (error) {
    console.error("Error fetching repository detail:", error);
    throw error;
  }
};
