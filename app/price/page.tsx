import Layout from '../components/layout/Layout'

export default function PricePage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>料金プラン</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {/* 無料会員 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: '2px solid #ddd' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>無料会員</h2>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745', marginBottom: '1.5rem' }}>¥0</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ 基本記事の閲覧</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ 記事の検索</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ ブックマーク機能</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ コメント機能</li>
              </ul>
              <button style={{ 
                width: '100%', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                padding: '1rem', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}>
                無料で始める
              </button>
            </div>

            {/* 有料会員 */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: '2px solid #007bff', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                おすすめ
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>有料会員</h2>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff', marginBottom: '1.5rem' }}>¥980/月</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ 全記事の閲覧可能</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ プレミアム記事の閲覧</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ 記事の投稿・販売</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ 優先サポート</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>✓ 広告なし</li>
              </ul>
              <button style={{ 
                width: '100%', 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '1rem', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}>
                有料会員になる
              </button>
            </div>
          </div>

          {/* 個別記事購入について */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#2a2a2a' }}>個別記事の購入</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#555' }}>
              有料会員にならずに、気になる記事だけを個別に購入することも可能です。
              記事の価格は投稿者が設定し、¥100〜¥5,000の範囲で販売されています。
            </p>
            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2a2a2a' }}>手数料について</h3>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                <li>決済手数料: 3.6%（Stripe決済の場合）</li>
                <li>プラットフォーム手数料: 10%</li>
                <li>例：¥1,000の記事の場合、手数料合計¥136、投稿者への支払い¥864</li>
              </ul>
            </div>
          </div>

          {/* 支払い方法 */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#2a2a2a' }}>支払い方法</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💳</div>
                <div>クレジットカード</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
                <div>Google Pay</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒</div>
                <div>Amazon Pay</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
                <div>Paidy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
