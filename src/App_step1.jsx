// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // 必要であればCSSを読み込む（Viteの初期CSSをベースに調整してもOKです）

// 各ページコンポーネント
const Home = () => (
  <div>
    <h2>ホーム</h2>
    <p>ようこそ！ここはホームです。</p>
  </div>
);

const About = () => (
  <div>
    <h2>このサイトについて</h2>
    <p>このサイトはReactとReact Routerの基本を学ぶためのサンプルです。</p>
  </div>
);

const Contact = () => (
  <div>
    <h2>お問い合わせ</h2>
    <p>ご意見・ご感想はこちらへ。</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">ホーム</Link>
            </li>
            <li>
              <Link to="/about">このサイトについて</Link>
            </li>
            <li>
              <Link to="/contact">お問い合わせ</Link>
            </li>
          </ul>
        </nav>

        <hr />

        {/* ルートの定義 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* 存在しないパスへのアクセスを考慮する場合 */}
          <Route path="*" element={<h2>ページが見つかりません</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;