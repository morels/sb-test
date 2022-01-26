import React, { CSSProperties, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './container.module.css';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const Container = ({ children, className, ...props }: Props) => (
  <section
    className={clsx(styles.Container, className)}
    {...props}
  >
    {children}
  </section>
);