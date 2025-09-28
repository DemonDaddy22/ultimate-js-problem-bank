import File from './components/File';
import Folder from './components/Folder';

type FolderStructureProps = {
  directory: Array<Directory>;
};

const FolderStructure: React.FC<FolderStructureProps> = ({ directory }) => {
  return directory.map(item =>
    item.type === 'file' ? (
      <File key={item.id} name={item.name} />
    ) : (
      <Folder key={item.id} name={item.name} sub={item.sub} />
    )
  );
};

export default FolderStructure;
