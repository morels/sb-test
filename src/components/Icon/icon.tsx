import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { IconNames, icons } from 'icons/index';
import styles from './icon.module.css';

type Props = {
  name: IconNames;
  className?: string;
};

const DEFAULT_SIZE = 48;

export const Icon = ({ name, className }: Props) => (
  <Image
    className={clsx(styles.Icon, className)}
    src={icons[name].src}
    alt={icons[name].alt}
    width={DEFAULT_SIZE}
    height={DEFAULT_SIZE} />
);