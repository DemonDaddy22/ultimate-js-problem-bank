import styles from '@/styles/infinite-scrolling.module.css';

type PostProps = {
  post: Post;
};

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className={styles.post}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
