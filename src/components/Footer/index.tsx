import styles from './styles.module.css';

import SvgGitHub from 'assets/github-fill.svg?react';

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <a
        href="https://github.com/willswats/react-pomodoro"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SvgGitHub />
      </a>
      <a
        href="https://williamwatson.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        williamwatson.dev
      </a>
    </footer>
  );
};
