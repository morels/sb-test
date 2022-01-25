import React from 'react';
import Image from 'next/image';
import styles from './icon.module.css';
import { IconNames, icons } from 'icons/index';

type Props = {
  name: IconNames;
};

const DEFAULT_SIZE = 48;

export const Icon = ({ name }: Props) => (
  <Image
    className={styles.Icon}
    src={icons[name].src}
    alt={icons[name].alt}
    width={DEFAULT_SIZE}
    height={DEFAULT_SIZE} />
);