import React from 'react';
import clsx from 'clsx';
import styles from './title.module.css';

type Props = {
  className?: string;
};

export const Title: React.FC<Props> = ({ children, className }) => (
  <h1 className={clsx(styles.Title, className)}>{children}</h1>
);