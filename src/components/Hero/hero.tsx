import React, { PropsWithChildren } from 'react';
import styles from './hero.module.css';

type Props = PropsWithChildren<{}>;

export const Hero = ({ children }: Props) => (
  <div className={styles.Hero}>
    {children}
  </div>
);
