import { useState, useEffect } from 'react';
import { ApiService } from '../services/api';

export const useFeed = (search, category, location) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const refetch = () => setTick(t => t + 1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    ApiService.posts.getFeed({ search, category, location })
      .then(response => {
        if (isMounted) {
          setPosts(response.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to fetch feed:", err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [search, category, location, tick]);

  return { posts, loading, refetch };
};

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    ApiService.alerts.getAlerts().then(data => {
      if (isMounted) {
        setAlerts(data);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return { alerts, loading };
};

export const useProfile = (username) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      ApiService.user.getProfile(),
      ApiService.posts.getUserPosts(username)
    ]).then(([userData, postsData]) => {
      if (isMounted) {
        setUser(userData);
        setPosts(postsData);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [username]);

  return { user, posts, loading };
};
