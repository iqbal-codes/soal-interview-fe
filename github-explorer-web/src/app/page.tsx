"use client";

import "./globals.scss";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/SearchBar/SearchBar";
import { getRepositoriesByUser, getUser } from "@/services/github.service";
import UserBanner from "@/components/UserBanner/UserBanner";
import { Repository, User } from "@/types/globals.type";
import RepositoryList from "@/components/RepositoryList/RepositoryList";
import styles from "./page.module.scss";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const username = searchParams.get("username") || "";

  const repositoriesQuery = useQuery({
    queryKey: ["repositories", username],
    queryFn: async () => getRepositoriesByUser(username),
    enabled: Boolean(username),
  });

  const userQuery = useQuery({
    queryKey: ["user", username],
    queryFn: async () => getUser(username),
    enabled: Boolean(username),
  });

  const handleRepoClick = (repo: Repository) => {
    router.push(`/${username}/${repo.name}`);
  };

  return (
    <div className={`${styles.container} ${username !== "" ? styles.top : ""}`}>
      <SearchBar
        initialValue={username}
        onSearch={(username) => router.push(`?username=${username}`)}
        isTop={username !== ""}
      />
      {!(repositoriesQuery.isLoading || userQuery.isLoading) ? (
        <>
          {userQuery.error ? (
            <div className={styles.errorContainer}>
              <FaCircleUser size={128} />
              User not found
            </div>
          ) : (
            <>
              {userQuery.data && <UserBanner user={userQuery.data as User} />}
              {repositoriesQuery.data && (
                <RepositoryList
                  repositories={repositoriesQuery.data}
                  handleRepoClick={handleRepoClick}
                />
              )}
            </>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
