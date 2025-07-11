// src/contexts/CounterContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';

// CounterContext を作成します。
// ここで指定するデフォルト値 (null) は、Provider がない場合に useContext が返す値です。
const CounterContext = createContext(null);

/**
 * usePageCounter カスタムフック
 * 指定されたページのカウンター状態と更新関数を Context から取得します。
 */
const usePageCounter = (pageName) => {
  const context = useContext(CounterContext);

  // Context が提供されていない場合（Providerでラップされていない場合）にエラーをスロー
  if (!context) {
    throw new Error('usePageCounter must be used within a CounterProvider');
  }

  // Context から特定のページのカウンター値を取得
  const count = context.pageCounters[pageName];

  // 特定のページのカウンターを増加させる関数
  // Context から提供される setPageCounter 関数を利用します。
  // useCallback でメモ化し、不要な再生成を防ぎます。
  const increment = useCallback(() => {
    context.setPageCounter(pageName, count + 1);
  }, [pageName, count, context.setPageCounter]); // count も依存配列に入れ、最新の値を参照するようにします。

  return { count, increment };
};

/**
 * CounterProvider コンポーネント
 * 全てのページのカウンター状態を管理し、子孫コンポーネントに提供します。
 */
const CounterProvider = ({ children }) => {
  // 各ページのカウンターをオブジェクトとして一元管理
  const [pageCounters, setPageCounters] = useState({
    home: 0,
    about: 0,
    contact: 0,
  });

  // 特定のページのカウンターを更新する関数
  // この関数を Context で提供し、各ページコンポーネントが利用できるようにします。
  const setPageCounter = useCallback((pageName, value) => {
    setPageCounters(prevCounters => ({
      ...prevCounters,
      [pageName]: value,
    }));
  }, []); // 依存配列が空なので、この関数は一度だけ生成されます。

  // Context で提供する値
  const value = {
    pageCounters, // 全てのページのカウンター値
    setPageCounter, // 特定のページのカウンターを更新する関数
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};

// 外部から利用できるようにエクスポート
export { CounterProvider, usePageCounter, CounterContext };