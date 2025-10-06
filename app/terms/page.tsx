import Layout from '../components/layout/Layout'

export default function TermsPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>利用規約</h1>
          
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '2rem' }}>
              最終更新日: 2025年1月15日
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第1条（適用）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                本利用規約（以下「本規約」といいます。）は、Travel Voices（以下「当サービス」といいます。）が提供するサービス（以下「本サービス」といいます。）の利用条件を定めるものです。
                登録ユーザーの皆さま（以下「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第2条（利用登録）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                本サービスにおいては、登録希望者が本規約に同意の上、当サービスの定める方法によって利用登録を申請し、当サービスがこれを承認することによって、利用登録が完了するものとします。
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
              </p>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '2rem', marginTop: '1rem' }}>
                <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、当サービスが利用登録を相当でないと判断した場合</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第3条（ユーザーIDおよびパスワードの管理）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
                ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
                当サービスは、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第4条（禁止事項）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '2rem' }}>
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</li>
                <li>当サービス、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>本サービスによって得られた情報を商業的に利用する行為</li>
                <li>当サービスの運営を妨害するおそれのある行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正、不正行為、不正使用に関与する行為</li>
                <li>その他、当サービスが不適切と判断する行為</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第5条（本サービスの提供の停止等）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                当サービスは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '2rem' }}>
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当サービスが本サービスの提供が困難と判断した場合</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第6条（利用制限および登録抹消）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                当サービスは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
              </p>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', paddingLeft: '2rem' }}>
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>料金等の支払債務を怠った場合</li>
                <li>当サービスからの連絡に対し、一定期間返答がない場合</li>
                <li>本サービスについて、最終の利用から一定期間利用がない場合</li>
                <li>その他、当サービスが本サービスの利用を適当でないと判断した場合</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第7条（退会）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                ユーザーは、当サービスの定める退会手続により、本サービスから退会できるものとします。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第8条（保証の否認および免責事項）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                当サービスは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当サービスとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第9条（サービス内容の変更等）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第10条（利用規約の変更）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第11条（個人情報の取扱い）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                当サービスは、本サービスの利用によって取得する個人情報については、当サービスのプライバシーポリシーに従い適切に取り扱うものとします。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第12条（通知または連絡）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                ユーザーと当サービスとの間の通知または連絡は、当サービスの定める方法によって行うものとします。当サービスは、ユーザーから、当サービスが別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第13条（権利義務の譲渡の禁止）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                ユーザーは、当サービスの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2a2a2a' }}>第14条（準拠法・裁判管轄）</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                本規約の解釈にあたっては、日本法を準拠法とします。
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                本サービスに関して紛争が生じた場合には、当サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。
              </p>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2a2a2a' }}>お問い合わせ</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
                本利用規約に関するお問い合わせは、以下までご連絡ください。
              </p>
              <p style={{ fontSize: '1.1rem', color: '#555' }}>
                メール: legal@travelvoices.com<br />
                お問い合わせフォーム: <a href="/contact" style={{ color: '#007bff' }}>/contact</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
