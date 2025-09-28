'use client';

import { useState } from 'react';
import FolderStructure from '../..';
import styles from '@/styles/FolderStructure/folder.module.css';

type FolderProps = {
  name: string;
  sub: Array<Directory> | null;
};

const Folder: React.FC<FolderProps> = ({ name, sub = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFolderOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <button className={styles.title} onClick={handleFolderOpen}>
        <p className={styles.folder}>{name}</p>
        <span className={isOpen ? styles.closeIcon : styles.openIcon}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' fill='#EFEFEF'>
            <path d='M297.4 201.4C309.9 188.9 330.2 188.9 342.7 201.4L502.7 361.4C515.2 373.9 515.2 394.2 502.7 406.7C490.2 419.2 469.9 419.2 457.4 406.7L320 269.3L182.6 406.6C170.1 419.1 149.8 419.1 137.3 406.6C124.8 394.1 124.8 373.8 137.3 361.3L297.3 201.3z' />
          </svg>
        </span>
      </button>
      {isOpen && sub?.length ? (
        <section className={styles.subDirectory}>
          <FolderStructure directory={sub} />
        </section>
      ) : null}
    </>
  );
};

export default Folder;
