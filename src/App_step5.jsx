// src/App.jsx
import React, { useEffect, useContext } from 'react'; // useContext を新しくインポートします。
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
// Context から CounterProvider, usePageCounter, CounterContext をインポートします。
import { CounterProvider, usePageCounter, CounterContext } from './contexts/CounterContext.jsx';

// 暗めの背景色の配列を定義 (変更なし)
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
// homeCount と setHomeCount を props で受け取る代わりに、usePageCounter を使用します。
const Home = () => {
  // usePageCounter フックを使って Context から Home のカウンター状態と更新関数を取得
  const { count: homeCount, increment: incrementHome } = usePageCounter('home');

  // homeCount が変更されたときにログを出力
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
        <button onClick={incrementHome} style={{ padding: '8px 15px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          カウントアップ
        </button>
        <p style={{ fontSize: '0.8em', color: '#ccc' }}>（別のページへ移動して戻ってもカウントは維持されます！）</p>
      </div>
    </div>
  );
};

// --- About ページ ---
// aboutCount と setAboutCount を props で受け取る代わりに、usePageCounter を使用します。
const About = () => {
  // usePageCounter フックを使って Context から About のカウンター状態と更新関数を取得
  const { count: aboutCount, increment: incrementAbout } = usePageCounter('about');

  // aboutCount が変更されたときにログを出力
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
        <button onClick={incrementAbout} style={{ padding: '8px 15px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          カウントアップ
        </button>
        <p style={{ fontSize: '0.8em', color: '#ccc' }}>（別のページへ移動して戻ってもカウントは維持されます！）</p>
      </div>
    </div>
  );
};

// --- Contact ページ ---
// contactCount と setContactCount を props で受け取る代わりに、usePageCounter を使用します。
const Contact = () => {
  // usePageCounter フックを使って Context から Contact のカウンター状態と更新関数を取得
  const { count: contactCount, increment: incrementContact } = usePageCounter('contact');

  // contactCount が変更されたときにログを出力
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
        <button onClick={incrementContact} style={{ padding: '8px 15px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          カウントアップ
        </button>
        <p style={{ fontSize: '0.8em', color: '#ccc' }}>（別のページへ移動して戻ってもカウントは維持されます！）</p>
      </div>
    </div>
  );
};

// --- メインアプリケーションコンポーネント ---
function App() {
  const location = useLocation();
  // useContext フックを使って CounterContext から全てのページのカウンター状態を取得します。
  const { pageCounters } = useContext(CounterContext);

  // ロケーションまたはカウンターが変化したら背景色を更新する副作用
  useEffect(() => {
    let currentCount = 0;
    // 現在のパスに応じて、対応するカウンター値を取得
    switch (location.pathname) {
      case '/':
        currentCount = pageCounters.home;
        break;
      case '/about':
        currentCount = pageCounters.about;
        break;
      case '/contact':
        currentCount = pageCounters.contact;
        break;
      default:
        currentCount = 0; // ページが見つからない場合など
    }

    // カウンターの値に応じて、colors配列から背景色を選択
    const colorIndex = currentCount % darkBackgroundColors.length;
    const selectedColor = darkBackgroundColors[colorIndex];

    document.body.style.backgroundColor = selectedColor;
    document.body.style.color = '#ffffff'; // 文字色を白に変更して見やすくする

    console.log(`[App] 現在のパス: ${location.pathname}, カウント: ${currentCount}, 背景色: ${selectedColor}`);

    // クリーンアップ関数: Appコンポーネントがアンマウントされるときに実行される
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [location.pathname, pageCounters]); // 依存配列に pageCounters を追加し、値が変更されたら副作用が再実行されるようにします。

  return (
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

      {/* ルートの定義 - 各ページはもはや props を直接受け取りません */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h2 style={{ textAlign: 'center', color: '#FF6347' }}>ページが見つかりません</h2>} />
      </Routes>
    </div>
  );
}

// Appコンポーネントを BrowserRouter と CounterProvider でラップします。
const AppWithRouter = () => (
  <Router>
    {/* CounterProvider で App コンポーネントをラップすることで、
        App およびその子孫コンポーネントが Context の値にアクセスできるようになります。 */}
    <CounterProvider>
      <App />
    </CounterProvider>
  </Router>
);

export default AppWithRouter;