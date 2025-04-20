"use client";

import { Repository } from "@/types/globals.type";
import styles from "./RepositoryList.module.scss";
import languageColors from "@/data/GithubLanguageColors.json";
import { RiGitRepositoryFill } from "react-icons/ri";
import { FaRegStar, FaCodeFork } from "react-icons/fa6";
import { formatNumber } from "@/utils/strings";
import { FaExternalLinkAlt } from "react-icons/fa";

interface RepositoryListProps {
  repositories: Repository[];
  handleRepoClick: (repo: Repository) => void;
}

export default function RepositoryList({
  repositories,
  handleRepoClick,
}: RepositoryListProps) {
  if (!repositories || repositories.length === 0) {
    return (
      <div className={`${styles.emptyContainer}`}>
        <RiGitRepositoryFill size={128} />
        No repositories found
      </div>
    );
  }

  return (
    <div className={`${styles.repositoryListContainer}`}>
      <h3>GitHub Repositories</h3>
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className={`${styles.repositoryItem}`}
          onClick={() => handleRepoClick(repo)}
        >
          <h3>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {repo.name}
              <span className={`${styles.externalLinkIcon}`}>
                <FaExternalLinkAlt size="0.8rem" />
              </span>
            </a>
          </h3>
          <p>{repo.description || "No description provided"}</p>
          <div className={`${styles.repositoryStats}`}>
            <span>
              <FaRegStar /> {formatNumber(repo.stargazers_count)}
            </span>
            <span>
              <FaCodeFork /> {formatNumber(repo.forks_count)}
            </span>
            {repo.language && (
              <span>
                <div
                  className={`${styles.languageIndicator}`}
                  style={{
                    backgroundColor:
                      languageColors[
                        repo.language as keyof typeof languageColors
                      ]?.color || "transparent",
                  }}
                />
                {repo.language}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

