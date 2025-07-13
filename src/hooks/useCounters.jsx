// src/hooks/useCounters.jsx
import { useState, useCallback } from 'react';

const useCounters = () => {
  // 複数のカウンターの状態を単一のオブジェクトで管理
  const [homeCount, setHomeCount] = useState(0);
  const [aboutCount, setAboutCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  // 各カウンターの増加関数を useCallback でメモ化
  const incrementHome = useCallback(() => {
    setHomeCount(prevCount => prevCount + 1);
  }, []);

  const incrementAbout = useCallback(() => {
    setAboutCount(prevCount => prevCount + 1);
  }, []);

  const incrementContact = useCallback(() => {
    setContactCount(prevCount => prevCount + 1);
  }, []);

  // カウンターの状態と更新関数をオブジェクトとして返す
  return {
    homeCount, setHomeCount,
    aboutCount, setAboutCount,
    contactCount, setContactCount,
  };
};

export default useCounters;