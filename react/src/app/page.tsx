import FolderStructure from '@/components/FolderStructure';
import ReduxProvider from '@/store/ReduxProvider';
import styles from '@/styles/page.module.css';
import { directory } from '../components/FolderStructure/data';
import FolderStructureContextProvider from '@/context/FolderStructureContext';
import FileName from '@/components/FolderStructure/components/Filename';

const Home = () => {
  return (
    <main className={styles.main}>
      <ReduxProvider>
        <FolderStructureContextProvider>
          <aside className={styles.directory}>
            <FolderStructure directory={directory} />
          </aside>
          <FileName />
        </FolderStructureContextProvider>
      </ReduxProvider>
    </main>
  );
};

export default Home;
