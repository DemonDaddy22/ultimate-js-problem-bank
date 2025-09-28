type DirectoryItem = 'file' | 'folder';

type Directory = {
  id: number;
  type: DirectoryItem;
  name: string;
  sub: Array<Directory> | null;
};
