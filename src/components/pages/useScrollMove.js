import { useState, useEffect, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

const useScrollMove = ({ page, path, dom }) => {
  const history = useHistory();
  const [scrollInfos, setScrollInfos] = useState(() => localStorage.getItem(`${page}_scroll_pos`));
  const match = useRouteMatch(path);
  const scrollSave = useCallback(() => {
    const scrollPos = window.scrollY;
    console.log(scrollPos);
    setScrollInfos(scrollPos);
    return localStorage.setItem(`${page}_scroll_pos`, scrollPos);
  }, [dom]);

  const scrollRemove = useCallback(() => {
    setScrollInfos(0);
    localStorage.removeItem(`${page}_scroll_pos`);
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (match?.isExact && location.pathname !== path) {
        scrollSave();
      }
    });
  }, [history, scrollSave, match]);

  return { scrollInfos, scrollRemove };
};

export default useScrollMove;