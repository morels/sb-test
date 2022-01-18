import React, { PropsWithChildren } from "react";
import styles from './base-layout.module.css';

type Props = PropsWithChildren<{
  footer?: React.ReactNode;
}>;

export const BaseLayout = ({ children, footer }: Props) => (
  <div className={styles.container}>
    <main className={styles.main}>
      {children}
    </main>
    {footer}
  </div>
);