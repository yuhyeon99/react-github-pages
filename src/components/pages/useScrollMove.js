import { useState, useEffect, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router';


const useScrollMove = ({ page, path, dom }) => {
  const history = useHistory();
  const [scrollInfos, setScrollInfos] = useState(() => localStorage.getItem(`${page}_scroll_pos`));
  const match = useRouteMatch(path);

  // 현재 스크롤 위치를 localstorage에 저장시키는 함수
  const scrollSave = () => {
    const scrollPos = window.scrollY;
    console.log(scrollPos);
    setScrollInfos(scrollPos);
    return localStorage.setItem(`${page}_scroll_pos`, scrollPos);
  };
  
  const scrollRemove = () => {
    setScrollInfos(0);
    localStorage.removeItem(`${page}_scroll_pos`);
    
  };

  useEffect(() => {
    // listen 은 경로가 변경되면 실행되는 함수
    return history.listen((location) => {
      if (match?.isExact && location.pathname !== path) {
        scrollSave();
      }
    });
  }, [history, scrollSave, match]);

  return { scrollInfos, scrollRemove };
};

export default useScrollMove;