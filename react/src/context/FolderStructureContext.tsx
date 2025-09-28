'use client';

import { createContext, useState } from 'react';

type ContextType = {
  selectedFile: string;
  setSelectedFile: (file: string) => void;
};

export const FolderStructureContext = createContext<ContextType>({
  selectedFile: '',
  setSelectedFile: () => {},
});

const FolderStructureContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <FolderStructureContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </FolderStructureContext.Provider>
  );
};

export default FolderStructureContextProvider;
