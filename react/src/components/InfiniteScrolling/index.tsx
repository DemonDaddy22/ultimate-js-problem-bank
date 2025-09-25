'use client';

import { useCallback, useEffect, useRef } from 'react';
import Post from './components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setError, setPosts, updateIsEnd } from '@/reducer/posts';
import styles from '@/styles/infinite-scrolling.module.css';

const API_CONFIG = Object.freeze({
  URL: 'https://dummyjson.com/posts',
  PAGE_SIZE: 20,
});

const InfiniteScrolling: React.FC = () => {
  const observationNode = useRef<HTMLDivElement | null>(null);
  const containerNode = useRef<HTMLElement | null>(null);

  const { isEnd, posts } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  const fetchPosts = useCallback(async () => {
    if (isEnd) {
      return;
    }
    try {
      const response = await fetch(`${API_CONFIG.URL}?limit=${API_CONFIG.PAGE_SIZE}&skip=${posts.length}`);
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const { posts: dummyPosts = [] } = (await response.json()) ?? {};
      if (dummyPosts.length < API_CONFIG.PAGE_SIZE) {
        dispatch(updateIsEnd());
      }
      dispatch(setPosts(dummyPosts));
      dispatch(setError(null));
    } catch (_) {
      dispatch(setError('something went wrong'));
    }
  }, [dispatch, isEnd, posts.length]);

  useEffect(() => {
    const node = observationNode.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !isEnd) {
          fetchPosts();
        }
      },
      { threshold: 0, root: containerNode.current, rootMargin: '0px 0px 75% 0px' }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [isEnd, fetchPosts]);

  return (
    <section ref={containerNode} className={styles.posts}>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
      <div ref={observationNode} style={{ height: 1 }}></div>
    </section>
  );
};

export default InfiniteScrolling;
