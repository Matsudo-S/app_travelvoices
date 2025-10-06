import Layout from '../components/layout/Layout'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '8rem', marginBottom: '2rem', color: '#2a2a2a' }}>404</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>ページが見つかりません</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#666', marginBottom: '3rem' }}>
            申し訳ございません。お探しのページは存在しないか、移動または削除された可能性があります。
          </p>
          
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>以下の方法をお試しください</h2>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'left', paddingLeft: '2rem' }}>
              <li>URLを再度確認してください</li>
              <li>ブラウザの戻るボタンを使用してください</li>
              <li>トップページから目的のページを探してください</li>
              <li>検索機能をご利用ください</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/" 
              style={{ 
                backgroundColor: '#2a2a2a', 
                color: 'white', 
                padding: '1rem 2rem', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontSize: '1.1rem',
                display: 'inline-block'
              }}
            >
              トップページに戻る
            </Link>
            <Link 
              href="/search" 
              style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '1rem 2rem', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontSize: '1.1rem',
                display: 'inline-block'
              }}
            >
              記事を検索
            </Link>
            <Link 
              href="/contact" 
              style={{ 
                backgroundColor: '#6c757d', 
                color: 'white', 
                padding: '1rem 2rem', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontSize: '1.1rem',
                display: 'inline-block'
              }}
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
