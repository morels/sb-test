import React, { PropsWithChildren } from 'react';
import styles from './layouted-content.module.css';

type Props = PropsWithChildren<{
  mobileInverted?: boolean;
}>;

export const LayoutedContent = ({ mobileInverted, children }: Props) => (
  <div className={styles.LayoutedContent} data-mobile-inverted={mobileInverted}>
    {children}
  </div>
)