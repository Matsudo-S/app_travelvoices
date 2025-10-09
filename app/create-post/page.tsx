import Layout from '../components/layout/Layout'
import RouteMapSection from './components/route-map/RouteMapSection'

export default function CreatePostPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 24px 80px', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div>
            <h1 style={{ fontSize: '2.75rem', margin: 0, color: '#0f172a', fontWeight: 700 }}>記事作成</h1>
            <p style={{ marginTop: '12px', color: '#475569', fontSize: '1rem' }}>
              訪問した場所を登録し、ルートを決めて旅の記録を投稿しましょう。
            </p>
          </div>

          <RouteMapSection />
        </div>
      </div>
    </Layout>
  )
}
