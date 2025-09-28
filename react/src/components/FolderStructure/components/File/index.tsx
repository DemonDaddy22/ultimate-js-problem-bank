'use client';

import { FolderStructureContext } from '@/context/FolderStructureContext';
import styles from '@/styles/FolderStructure/file.module.css';
import { useContext } from 'react';

type FileProps = {
  name: string;
};

const File: React.FC<FileProps> = ({ name }) => {
  const { setSelectedFile } = useContext(FolderStructureContext);

  return (
    <button className={styles.file} onClick={() => setSelectedFile(name)}>
      {name}
    </button>
  );
};

export default File;
