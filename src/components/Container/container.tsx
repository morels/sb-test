import React, { CSSProperties, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from 'container.module.css';

type Props = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}>;

export const Container = ({ style, children, ...props }: Props) => (
  <section
    className={clsx(styles.Container, style)}
    {...props}
  >
    {children}
  </section>
);