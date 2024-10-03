import React from 'react';
import styles from '../../MyInfo.module.css';

interface UserInfoProps {
  avatarUrl: string;
  name: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ avatarUrl, name }) => {
  return (
    <div className={styles.userContainer}>
      <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.avatar} />
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
};

export default UserInfo;