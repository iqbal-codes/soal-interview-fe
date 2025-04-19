"use client";

import { useState } from "react";
import styles from "./SearchBar.module.scss";
import { FaSearch } from "react-icons/fa";

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

  return (
    <form onSubmit={handleSubmit} className={`${styles.container}`}>
      {!isTop && <h1>Github Explorer</h1>}
      <div className={styles.inputContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username, Eg. octocat, microsoft, etc."
          className={`${styles.input} ${isTop && styles.top}`}
        />
      </div>
    </form>
  );
}
