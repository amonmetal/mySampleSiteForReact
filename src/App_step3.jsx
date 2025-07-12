// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'; // useLocation をインポート
import './App.css';

// 暗めの背景色の配列を定義
const darkBackgroundColors = [
  '#2c3e50', // 暗い青（ピーターリバー）
  '#34495e', // 少し明るい暗い青（アスペルトス）
  '#1abc9c', // 暗い緑（ターコイズ）
  '#27ae60', // 暗い緑（ネフライト）
  '#8e44ad', // 暗い紫（アメジスト）
  '#c0392b', // 暗い赤（アルザスレッド）
  '#e67e22', // 暗いオレンジ（キャロット）
  '#d35400', // 暗いオレンジ（パンプキン）
  '#7f8c8d', // 暗いグレー（アバノス）
  '#535c68', // さらに暗いグレー（ネロ）
];

// 各ページコンポーネントの定義
// --- Home ページ ---
// homeCount と setHomeCount を props で受け取る
const Home = ({ homeCount, setHomeCount }) => {
  // Homeコンポーネント自体はカウンターの状態を持たない
  // useEffectは、Appから渡された homeCount が変化したときにログを出す
  useEffect(() => {
    console.log(`[Home] カウンターが ${homeCount} になりました。`);
  }, [homeCount]);

  return (
    <div>
      <h2>ホーム</h2>
      <p>ようこそ！ここはホームです。</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #777', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <h3>ホームページのカウンター（状態保持）</h3>
        <p>現在のカウント: <strong>{homeCount}</strong></p>
        <button onClick={() => setHomeCount(homeCount + 1)} style={{ padding: '8px 15px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          カウントアップ
        </button>
        <p style={{ fontSize: '0.8em', color: '#ccc' }}>（別のページへ移動して戻ってもカウントは維持されます！）</p>
      </div>
    </div>
  );
};

// --- About ページ ---
// aboutCount と setAboutCount を props で受け取る
const About = ({ aboutCount, setAboutCount }) => {
  useEffect(() => {
    console.log(`[About] カウンターが ${aboutCount} になりました。`);
  }, [aboutCount]);

  return (
    <div>
      <h2>このサイトについて</h2>
      <p>このサイトはReactとReact Routerの基本を学ぶためのサンプルです。</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #777', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <h3>サイトについてページのカウンター（状態保持）</h3>
        <p>現在のカウント: <strong>{aboutCount}</strong></p>
        <button onClick={() => setAboutCount(aboutCount + 1)} style={{ padding: '8px 15px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          カウントアップ
        </button>
        <p style={{ fontSize: '0.8em', color: '#ccc' }}>（別のページへ移動して戻ってもカウントは維持されます！）</p>
      </div>
    </div>
  );
};

// --- Contact ページ ---
// contactCount と setContactCount を props で受け取る
const Contact = ({ contactCount, setContactCount }) => {
  useEffect(() => {
    console.log(`[Contact] カウンターが ${contactCount} になりました。`);
  }, [contactCount]);

  return (
    <div>
      <h2>お問い合わせ</h2>
      <p>ご意見・ご感想はこちらへ。</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #777', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <h3>お問い合わせページのカウンター（状態保持）</h3>
        <p>現在のカウント: <strong>{contactCount}</strong></p>
        <button onClick={() => setContactCount(contactCount + 1)} style={{ padding: '8px 15px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          カウントアップ
        </button>
        <p style={{ fontSize: '0.8em', color: '#ccc' }}>（別のページへ移動して戻ってもカウントは維持されます！）</p>
      </div>
    </div>
  );
};

// --- メインアプリケーションコンポーネント ---
function App() {
  // Appコンポーネントで各ページのカウンター状態を管理
  const [homeCount, setHomeCount] = useState(0);
  const [aboutCount, setAboutCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  // 現在のロケーション（URLパス）を取得
  const location = useLocation();

  // ロケーションまたはカウンターが変化したら背景色を更新する副作用
  useEffect(() => {
    let currentCount = 0;
    // 現在のパスに応じて、対応するカウンター値を取得
    switch (location.pathname) {
      case '/':
        currentCount = homeCount;
        break;
      case '/about':
        currentCount = aboutCount;
        break;
      case '/contact':
        currentCount = contactCount;
        break;
      default:
        currentCount = 0; // ページが見つからない場合など
    }

    // カウンターの値に応じて、colors配列から背景色を選択
    const colorIndex = currentCount % darkBackgroundColors.length; //割り切れない場合のあまりは割られる数そのものになる、という基本的な剰余演算のルールに基づく。
    const selectedColor = darkBackgroundColors[colorIndex];

    document.body.style.backgroundColor = selectedColor;
    document.body.style.color = '#ffffff'; // 文字色を白に変更して見やすくする

    console.log(`[App] 現在のパス: ${location.pathname}, カウント: ${currentCount}, 背景色: ${selectedColor}`);
  }, [location.pathname, homeCount, aboutCount, contactCount]); // 依存配列: パスまたは各カウンターが変化したときのみ実行

  return (
    // <Router> は App の外側、または App の中で useLocation より上位に配置する必要がある
    // 今回は App コンポーネント自体が <Router> の子孫になるように配置されている前提
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #555', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.5)', backgroundColor: 'rgba(255,255,255,0.1)', color: '#eee' }}>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>React SPA 体験サイト</h1>
      <nav style={{ marginBottom: '30px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '5px' }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'space-around' }}>
          <li style={{ margin: '0 10px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#87CEEB', fontWeight: 'bold' }}>ホーム</Link>
          </li>
          <li style={{ margin: '0 10px' }}>
            <Link to="/about" style={{ textDecoration: 'none', color: '#87CEEB', fontWeight: 'bold' }}>このサイトについて</Link>
          </li>
          <li style={{ margin: '0 10px' }}>
            <Link to="/contact" style={{ textDecoration: 'none', color: '#87CEEB', fontWeight: 'bold' }}>お問い合わせ</Link>
          </li>
        </ul>
      </nav>

      <hr style={{ border: 'none', borderTop: '1px solid #777', margin: '20px 0' }} />

      {/* ルートの定義 - 各ページにそれぞれのカウンターと更新関数を props で渡す */}
      <Routes>
        <Route path="/" element={<Home homeCount={homeCount} setHomeCount={setHomeCount} />} />
        <Route path="/about" element={<About aboutCount={aboutCount} setAboutCount={setAboutCount} />} />
        <Route path="/contact" element={<Contact contactCount={contactCount} setContactCount={setContactCount} />} />
        <Route path="*" element={<h2 style={{ textAlign: 'center', color: '#FF6347' }}>ページが見つかりません</h2>} />
      </Routes>
    </div>
  );
}

// Appコンポーネントを BrowserRouter でラップする
// これにより、Appコンポーネント内で useLocation を使用できるようになる
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;