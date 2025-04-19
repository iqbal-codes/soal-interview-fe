import Image from "next/image";
import styles from "./UserBanner.module.scss";
import { User } from "@/types/globals.type";
import { formatNumber } from "@/utils/strings";

interface UserBannerProps {
  user: User;
}

export default function UserBanner({ user }: UserBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.avatarContainer}>
        <Image
          src={user?.avatar_url}
          alt={`${user?.name}'s avatar`}
          className={styles.avatar}
          width={120}
          height={120}
        />
      </div>
      <div className={styles.userInfo}>
        <h2 className={styles.name}>{user?.name || user?.login}</h2>
        <p className={styles.bio}>{user?.bio}</p>
        <div className={styles.stats}>
          <span className={styles.stat}>
            <strong>{formatNumber(user?.followers)}</strong> followers
          </span>
          <span className={styles.stat}>
            <strong>{formatNumber(user?.following)}</strong> following
          </span>
          <span className={styles.stat}>
            <strong>{formatNumber(user?.public_repos)}</strong> public repos
          </span>
        </div>
      </div>
    </div>
  );
}
