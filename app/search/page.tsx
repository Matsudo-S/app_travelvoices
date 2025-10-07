import Layout from '../components/layout/Layout'

interface SearchPageProps {
  searchParams?: { prefecture?: string; category?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const prefectureParam = searchParams?.prefecture || ''
  const prefectures = prefectureParam ? prefectureParam.split(',') : []
  const category = searchParams?.category || ''
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>記事検索</h1>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {(prefectures.length || category) && (
              <div style={{ marginBottom: '1rem', color: '#555' }}>
                <strong>適用中の条件:</strong>
                {prefectures.length > 0 && <span style={{ marginLeft: 8 }}>都道府県: {prefectures.join('、')}</span>}
                {category && <span style={{ marginLeft: 12 }}>カテゴリ: {category}</span>}
              </div>
            )}
            <div style={{ marginBottom: '2rem' }}>
              <input 
                type="text" 
                placeholder="目的地やキーワードで検索..." 
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  fontSize: '1.1rem', 
                  border: '2px solid #ddd', 
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2a2a2a' }}>東京の旅</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>東京の隠れた名所を紹介</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#888' }}>¥500</span>
                  <button style={{ backgroundColor: '#2a2a2a', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                    詳細を見る
                  </button>
                </div>
              </div>
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2a2a2a' }}>京都の旅</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>京都の伝統的な文化体験</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#888' }}>¥800</span>
                  <button style={{ backgroundColor: '#2a2a2a', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                    詳細を見る
                  </button>
                </div>
              </div>
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2a2a2a' }}>沖縄の旅</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>沖縄の美しいビーチと文化</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#888' }}>¥1,200</span>
                  <button style={{ backgroundColor: '#2a2a2a', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                    詳細を見る
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
