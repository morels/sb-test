import React from 'react';
import { Icon } from 'components/Icon';
import { IconNames } from 'icons/index';
import styles from './change-rate.module.css';

type Props = {
  currencyFrom: IconNames;
  currencyTo: IconNames;
  text: string;
  percentage: string;
}
export const ChangeRate = ({ currencyFrom, currencyTo, text, percentage }: Props) => (
  <div className={styles.Container}>
    <div className={styles.Icons}>
      <Icon name={currencyFrom} />
      <Icon name={currencyTo} />
      <span className={styles.Arrow} />
    </div>
    <div className={styles.TextContainer}>
      <p className={styles.Text}>{text}</p>
      <p className={styles.Percentage}>{percentage}</p>
    </div>
  </div>
);
