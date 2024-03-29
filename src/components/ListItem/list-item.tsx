import React from 'react';
import { Icon } from 'components/Icon';
import { IconNames } from 'icons/index';

import styles from './list-item.module.css';

type Props = {
  iconName: IconNames;
  label: string;
  text: string | React.ReactNode;
};

export const ListItem = ({ iconName, label, text }: Props) => (
  <li className={styles.Container}>
    <div className={styles.Left}>
      <Icon name={iconName} />
    </div>
    <div className={styles.Right}>
      <p className={styles.Text}>
        {label}
      </p>
      <div className={styles.ValueContainer}>
        {React.isValidElement(text)
          ? text
          : <p className="Subheadline">{text}</p>
        }
      </div>
    </div>
  </li>
);