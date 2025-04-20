"use client";

import { useState } from "react";
import styles from "./SearchBar.module.scss";
import { FaSearch } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (username: string) => void;
  isTop?: boolean;
}

export default function SearchBar({
  onSearch,
  isTop,
  initialValue = "",
}: SearchBarProps) {
  const [username, setUsername] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  const handleClear = () => {
    setUsername("");
  };

  return (
    <div className={`${styles.container}`}>
      {!isTop && (
        <div className={styles.githubExplorer}>
          <FaGithub size="2.5rem" /> <h1>Github Explorer</h1>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          inputMode="search"
          type="search"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username, Eg. octocat, microsoft, etc."
          className={`${styles.input} ${isTop && styles.top}`}
        />
        {username && (
          <AiOutlineCloseCircle
            className={styles.closeIcon}
            onClick={handleClear}
            size={24}
          />
        )}
      </form>
    </div>
  );
}

