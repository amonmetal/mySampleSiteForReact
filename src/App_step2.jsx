// src/App.jsx
import React, { useState } from 'react'; // useState をインポート
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // 必要であればCSSを読み込む

// 各ページコンポーネントの定義
// --- Home ページ ---
const Home = () => {
  const [homeCount, setHomeCount] = useState(0); // Homeページのカウンター状態

  return (
    <div>
      <h2>ホーム</h2>
      <p>ようこそ！ここはホームです。</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>ホームページのカウンター</h3>
        <p>現在のカウント: <strong>{homeCount}</strong></p>
        <button onClick={() => setHomeCount(homeCount + 1)}>
          カウントアップ
        </button>
      </div>
    </div>
  );
};

// --- About ページ ---
const About = () => {
  const [aboutCount, setAboutCount] = useState(0); // Aboutページのカウンター状態

  return (
    <div>
      <h2>このサイトについて</h2>
      <p>このサイトはReactとReact Routerの基本を学ぶためのサンプルです。</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>サイトについてページのカウンター</h3>
        <p>現在のカウント: <strong>{aboutCount}</strong></p>
        <button onClick={() => setAboutCount(aboutCount + 1)}>
          カウントアップ
        </button>
      </div>
    </div>
  );
};

// --- Contact ページ ---
const Contact = () => {
  const [contactCount, setContactCount] = useState(0); // Contactページのカウンター状態

  return (
    <div>
      <h2>お問い合わせ</h2>
      <p>ご意見・ご感想はこちらへ。</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>お問い合わせページのカウンター</h3>
        <p>現在のカウント: <strong>{contactCount}</strong></p>
        <button onClick={() => setContactCount(contactCount + 1)}>
          カウントアップ
        </button>
      </div>
    </div>
  );
};

// --- メインアプリケーションコンポーネント ---
function App() {
  return (
    <Router>
      <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>React SPA 体験サイト</h1>
        <nav style={{ marginBottom: '30px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'space-around' }}>
            <li style={{ margin: '0 10px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>ホーム</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <Link to="/about" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>このサイトについて</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <Link to="/contact" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>お問い合わせ</Link>
            </li>
          </ul>
        </nav>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

        {/* ルートの定義 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* 存在しないパスへのアクセスを考慮する場合 */}
          <Route path="*" element={<h2 style={{ textAlign: 'center', color: 'red' }}>ページが見つかりません</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;