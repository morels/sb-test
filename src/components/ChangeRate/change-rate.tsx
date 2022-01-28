import React from 'react';
import { Icon } from 'components/Icon';
import { IconNames } from 'icons/index';
import styles from './change-rate.module.css';

type Props = {
  currencyFrom: IconNames;
  currencyTo: IconNames;
  text: string;
  percentage: string;
  percentageColor?: string;
}
export const ChangeRate = ({ currencyFrom, currencyTo, text, percentage, percentageColor }: Props) => (
  <div className={styles.Container}>
    <div className={styles.Icons}>
      <Icon name={currencyFrom} />
      <Icon name={currencyTo} />
      <span className={styles.Arrow} />
    </div>
    <div className={styles.TextContainer}>
      <p className={styles.Text}>{text}</p>
      <p
        className={styles.Percentage}
        style={percentageColor ? { color: percentageColor } : undefined}
      >{percentage}</p>
    </div>
  </div>
);
