"use client";

import { getRepositoryDetail } from "@/services/github.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import RepositoryDetail from "@/components/RepositoryDetail/RepositoryDetail";
import Spinner from "@/components/Spinner/Spinner";
import styles from "./page.module.scss";
import { RiGitRepositoryFill } from "react-icons/ri";

const RepoDetailPage = () => {
  const params = useParams<{ username: string; repoId: string }>();
  const repoDetailQuery = useQuery({
    queryKey: ["repoDetail", params.repoId],
    queryFn: async () => getRepositoryDetail(params.username, params.repoId),
    enabled: Boolean(params.repoId),
  });

  if (repoDetailQuery.isLoading) {
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  if (repoDetailQuery.error) {
    return (
      <div className={`${styles.errorContainer}`}>
        <RiGitRepositoryFill size={128} />
        Repository not found
      </div>
    );
  }

  return (
    <div>
      {repoDetailQuery.data && (
        <RepositoryDetail repository={repoDetailQuery.data} />
      )}
    </div>
  );
};

export default RepoDetailPage;
