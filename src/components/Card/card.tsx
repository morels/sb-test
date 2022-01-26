import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './card.module.css';

type Props = PropsWithChildren<{
  header?: React.ReactNode;
  className?: string;
}>

export const Card = ({ header, children, className }: Props) => (
  <div className={clsx(styles.Container, className)}>
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

