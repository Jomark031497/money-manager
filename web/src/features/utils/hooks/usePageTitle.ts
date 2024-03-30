import { useEffect } from 'react';

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    if (!title) {
      window.document.title = 'hello.friend';
    } else {
      window.document.title = title;
    }
  }, [title]);
};
