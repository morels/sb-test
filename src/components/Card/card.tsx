import React, { PropsWithChildren } from 'react';
import styles from './card.module.css';

type Props = PropsWithChildren<{
  header?: React.ReactNode;
}>

export const Card = ({ header, children }: Props) => (
  <div className={styles.Container}>
    <div className={styles.Header}>
      {header}
    </div>
    <div className={styles.Content}>
      {children}
    </div>
    <div className={styles.Footer}>
      <p>All</p>
    </div>
  </div>
);

