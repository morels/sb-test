import React, { PropsWithChildren } from 'react';

import styles from './list.module.css';

type Props = PropsWithChildren<{}>;

export const List = ({ children }: Props) => (
  <ul className={styles.Container}>
    {children}
  </ul>
);