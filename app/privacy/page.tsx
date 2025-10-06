import Layout from '../components/layout/Layout'

export default function PrivacyPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>プライバシーポリシー</h1>
          
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '2rem' }}>
              最終更新日: 2025年1月15日
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>1. 個人情報の収集について</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                当サービスでは、以下の個人情報を収集する場合があります：
              </p>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '2rem' }}>
                <li>お名前、メールアドレス、電話番号</li>
                <li>決済情報（クレジットカード情報は第三者決済サービスにて管理）</li>
                <li>プロフィール情報、投稿内容</li>
                <li>アクセスログ、IPアドレス、Cookie情報</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>2. 個人情報の利用目的</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                収集した個人情報は、以下の目的で利用いたします：
              </p>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '2rem' }}>
                <li>サービスの提供・運営</li>
                <li>ユーザー認証・アカウント管理</li>
                <li>決済処理・課金管理</li>
                <li>カスタマーサポート</li>
                <li>サービス改善・新機能開発</li>
                <li>不正利用の防止</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>3. 個人情報の第三者提供</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
                ただし、以下の場合は例外とします：
              </p>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '2rem', marginTop: '1rem' }}>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要な場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要な場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>4. 個人情報の管理</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスは、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
                また、個人情報を取り扱う従業員を限定し、定期的な教育・研修を実施いたします。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>5. Cookieの使用</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスでは、ユーザーエクスペリエンスの向上のため、Cookieを使用する場合があります。
                Cookieの使用を希望されない場合は、ブラウザの設定でCookieを無効にすることができます。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>6. 個人情報の開示・訂正・削除</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                お客様は、当サービスが保有する個人情報について、開示・訂正・削除を求めることができます。
                その場合は、お問い合わせフォームからご連絡ください。本人確認を行った上で、適切に対応いたします。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>7. プライバシーポリシーの変更</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスは、必要に応じて本プライバシーポリシーを変更する場合があります。
                変更後のプライバシーポリシーは、当サービス上に掲載した時点で効力を生じるものとします。
              </p>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2a2a2a' }}>お問い合わせ</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。
              </p>
              <p style={{ fontSize: '1.1rem', color: '#555' }}>
                メール: privacy@travelvoices.com<br />
                お問い合わせフォーム: <a href="/contact" style={{ color: '#007bff' }}>/contact</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
