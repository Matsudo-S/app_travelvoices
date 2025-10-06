import Layout from '../components/layout/Layout'

export default function MyPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>マイページ</h1>
          
          {/* ユーザー情報 */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#2a2a2a' }}>プロフィール</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                👤
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#2a2a2a' }}>ユーザー名</h3>
                <p style={{ color: '#666' }}>travelvoices@example.com</p>
              </div>
            </div>
            <button style={{ 
              backgroundColor: '#2a2a2a', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              プロフィール編集
            </button>
          </div>

          {/* サブスクリプション情報 */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#2a2a2a' }}>サブスクリプション</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#2a2a2a' }}>有料会員プラン</h3>
                <p style={{ color: '#666' }}>¥980/月</p>
              </div>
              <div>
                <span style={{ backgroundColor: '#28a745', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                  アクティブ
                </span>
              </div>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>次回請求日: 2025年2月15日</p>
          </div>

          {/* 購入記事一覧 */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#2a2a2a' }}>購入記事一覧</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#2a2a2a' }}>沖縄の美しいビーチガイド</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>購入日: 2025年1月10日</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#2a2a2a', fontWeight: 'bold' }}>¥1,200</p>
                  <button style={{ backgroundColor: '#007bff', color: 'white', padding: '0.3rem 0.8rem', border: 'none', borderRadius: '4px', fontSize: '0.9rem' }}>
                    読む
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#2a2a2a' }}>京都の隠れた名所</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>購入日: 2025年1月5日</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#2a2a2a', fontWeight: 'bold' }}>¥800</p>
                  <button style={{ backgroundColor: '#007bff', color: 'white', padding: '0.3rem 0.8rem', border: 'none', borderRadius: '4px', fontSize: '0.9rem' }}>
                    読む
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ブックマーク記事一覧 */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#2a2a2a' }}>ブックマーク記事</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#2a2a2a' }}>東京の隠れたカフェ</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>ブックマーク日: 2025年1月12日</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button style={{ backgroundColor: '#6c757d', color: 'white', padding: '0.3rem 0.8rem', border: 'none', borderRadius: '4px', fontSize: '0.9rem', marginRight: '0.5rem' }}>
                    削除
                  </button>
                  <button style={{ backgroundColor: '#007bff', color: 'white', padding: '0.3rem 0.8rem', border: 'none', borderRadius: '4px', fontSize: '0.9rem' }}>
                    読む
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
