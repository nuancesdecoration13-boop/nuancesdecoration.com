import { useEffect, useState } from 'react';
import { SHOW_BLOG } from '../config';

const PREVIEW_STORAGE_KEY = 'nuances-blog-preview';

function getStoredBlogVisibility(): boolean {
  const storedValue = window.localStorage.getItem(PREVIEW_STORAGE_KEY);
  return storedValue === null ? SHOW_BLOG : storedValue === 'true';
}

export function useBlogVisibility(): boolean {
  const [isBlogVisible, setIsBlogVisible] = useState(getStoredBlogVisibility);

  useEffect(() => {
    const previewMode = new URLSearchParams(window.location.search).get('apercu');
    if (previewMode === 'nuances2026') {
      window.localStorage.setItem(PREVIEW_STORAGE_KEY, 'true');
      setIsBlogVisible(true);
    } else if (previewMode === 'off') {
      window.localStorage.setItem(PREVIEW_STORAGE_KEY, 'false');
      setIsBlogVisible(false);
    }
  }, []);

  return isBlogVisible;
}
