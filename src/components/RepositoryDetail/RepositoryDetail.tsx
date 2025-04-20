import React from "react";
import styles from "./RepositoryDetail.module.scss";
import { Repository } from "@/types/globals.type";
import languageColors from "@/data/GithubLanguageColors.json";
import { FaRegStar, FaCodeFork, FaEye } from "react-icons/fa6";
import { formatNumber } from "@/utils/strings";
import Image from "next/image";

interface RepositoryDetailProps {
  repository: Repository;
}

const RepositoryDetail: React.FC<RepositoryDetailProps> = ({ repository }) => {
  return (
    <div className={styles.container}>
      <div className={styles.nameWrapper}>
        <Image
          src={repository.owner?.avatar_url}
          alt={`${repository.owner?.login}'s avatar`}
          className={styles.avatar}
          width={30}
          height={30}
        />
        <h1 className={styles.name}>{repository.name}</h1>
      </div>
      <p className={styles.description}>
        {repository.description || "No description provided"}
      </p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.label}>
            <FaRegStar /> Stars
          </span>
          <span className={styles.value}>
            {formatNumber(repository.stargazers_count)}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>
            <FaCodeFork /> Forks
          </span>
          <span className={styles.value}>
            {formatNumber(repository.forks_count)}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>
            <FaEye /> Watching
          </span>
          <span className={styles.value}>
            {formatNumber(repository.watchers_count)}
          </span>
        </div>
      </div>
      {repository.language && (
        <div className={styles.languageContainer}>
          <span className={styles.label}>Language</span>
          <span className={styles.value}>
            <div
              className={`${styles.languageIndicator}`}
              style={{
                backgroundColor:
                  languageColors[
                    repository.language as keyof typeof languageColors
                  ]?.color || "transparent",
              }}
            />
            {repository.language}
          </span>
        </div>
      )}
    </div>
  );
};

export default RepositoryDetail;
