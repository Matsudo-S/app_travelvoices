import Layout from '../components/layout/Layout'

export default function AboutPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>コンセプト</h1>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#2a2a2a' }}>Travel Voices について</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#555' }}>
              Travel Voicesは、旅行の魅力を個々人の旅行の経験を通して提供します。
              あなたの旅には、きっと意味がある。そんな想いを込めて、一人ひとりの旅行体験を価値あるコンテンツとして共有できるプラットフォームを目指しています。
            </p>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>私たちのミッション</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#555' }}>
              旅行は単なる移動ではなく、人生を豊かにする体験です。私たちは、そんな貴重な体験を
              記録し、共有し、他の人々の旅の参考となるような価値ある情報として提供します。
            </p>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>サービス内容</h3>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              <li>旅行記事の投稿・共有</li>
              <li>個別記事の購入・販売</li>
              <li>有料会員による全記事閲覧</li>
              <li>旅行体験のコミュニティ</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
