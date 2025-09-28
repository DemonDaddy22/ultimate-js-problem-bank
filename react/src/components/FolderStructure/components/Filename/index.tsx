'use client';

import { useContext } from 'react';
import { FolderStructureContext } from '@/context/FolderStructureContext';
import styles from '@/styles/FolderStructure/filename.module.css';

const FileName: React.FC = () => {
  const { selectedFile } = useContext(FolderStructureContext);

  return <h1 className={styles.fileName}>{selectedFile}</h1>;
};

export default FileName;
