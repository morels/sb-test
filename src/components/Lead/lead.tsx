import React from 'react';
import clsx from 'clsx';
import styles from './lead.module.css';

type Props = {
  className?: string;
};

export const Lead: React.FC<Props> = ({ children, className }) => (
  <p className={clsx('Lead', styles.Lead, className)}>{children}</p>
);