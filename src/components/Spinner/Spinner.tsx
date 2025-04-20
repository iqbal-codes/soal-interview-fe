import React from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  color = "#9198A1",
}) => {
  const spinnerSize = size === "small" ? 24 : size === "medium" ? 32 : 48;

  return (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <svg
        width={spinnerSize}
        height={spinnerSize}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.path}
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="3"
          stroke={color}
        />
      </svg>
    </div>
  );
};

export default Spinner;
