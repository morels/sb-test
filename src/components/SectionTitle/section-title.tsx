import React from 'react';
import styles from './section-title.module.css';

export const SectionTitle: React.FC = ({ children }) => (
  <h2 className={styles.SectionTitle}>{children}</h2>
);