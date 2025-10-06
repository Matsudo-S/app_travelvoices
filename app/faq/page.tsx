import Layout from '../components/layout/Layout'

export default function FAQPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>よくある質問</h1>
          
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>Q. 無料会員と有料会員の違いは何ですか？</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '1rem' }}>
                A. 無料会員は基本記事の閲覧が可能ですが、有料会員では全記事の閲覧、プレミアム記事の閲覧、記事の投稿・販売機能が利用できます。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>Q. 個別記事の購入はどのように行いますか？</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '1rem' }}>
                A. 記事詳細ページの「購入する」ボタンをクリックし、決済情報を入力して購入できます。クレジットカード、Google Pay、Amazon Pay、Paidyがご利用いただけます。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>Q. 記事の投稿・販売は誰でもできますか？</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '1rem' }}>
                A. 有料会員の方であれば、誰でも記事の投稿・販売が可能です。記事の価格は¥100〜¥5,000の範囲で設定できます。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>Q. 手数料はどのくらいかかりますか？</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '1rem' }}>
                A. 決済手数料3.6%（Stripe決済の場合）とプラットフォーム手数料10%がかかります。例：¥1,000の記事の場合、手数料合計¥136、投稿者への支払い¥864となります。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>Q. 有料会員の解約はどのように行いますか？</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '1rem' }}>
                A. マイページの「サブスクリプション設定」から解約手続きを行えます。解約後も現在の請求期間終了までは有料会員の機能をご利用いただけます。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>Q. 記事の内容に問題がある場合はどうすればよいですか？</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '1rem' }}>
                A. 記事詳細ページの「報告する」ボタンから問題を報告していただくか、お問い合わせフォームからご連絡ください。内容を確認後、適切な対応を行います。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>Q. 返金は可能ですか？</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '1rem' }}>
                A. 記事の内容に明らかな問題がある場合や、技術的な問題により記事が閲覧できない場合は返金対応いたします。詳細はお問い合わせフォームからご連絡ください。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2a2a2a' }}>Q. プライバシーは保護されますか？</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '1rem' }}>
                A. はい、お客様の個人情報は厳重に管理され、第三者に提供されることはありません。詳細はプライバシーポリシーをご確認ください。
              </p>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2a2a2a' }}>その他のご質問</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                上記で解決しないご質問がございましたら、お気軽にお問い合わせください。
              </p>
              <a 
                href="/contact" 
                style={{ 
                  backgroundColor: '#2a2a2a', 
                  color: 'white', 
                  padding: '0.8rem 1.5rem', 
                  textDecoration: 'none', 
                  borderRadius: '8px',
                  display: 'inline-block'
                }}
              >
                お問い合わせフォーム
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
