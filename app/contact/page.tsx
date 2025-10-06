import Layout from '../components/layout/Layout'

export default function ContactPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>お問い合わせ</h1>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <form>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  お名前 <span style={{ color: 'red' }}>*</span>
                </label>
                <input 
                  type="text" 
                  required
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
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  メールアドレス <span style={{ color: 'red' }}>*</span>
                </label>
                <input 
                  type="email" 
                  required
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  お問い合わせ種別 <span style={{ color: 'red' }}>*</span>
                </label>
                <select 
                  required
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    fontSize: '1.1rem', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                >
                  <option value="">選択してください</option>
                  <option value="technical">技術的な問題</option>
                  <option value="payment">支払い・決済について</option>
                  <option value="account">アカウントについて</option>
                  <option value="content">コンテンツについて</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  件名 <span style={{ color: 'red' }}>*</span>
                </label>
                <input 
                  type="text" 
                  required
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  お問い合わせ内容 <span style={{ color: 'red' }}>*</span>
                </label>
                <textarea 
                  required
                  rows={8}
                  placeholder="お問い合わせ内容を詳しくお書きください"
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    fontSize: '1.1rem', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" required />
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    プライバシーポリシーに同意します <span style={{ color: 'red' }}>*</span>
                  </span>
                </label>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#2a2a2a', 
                    color: 'white', 
                    padding: '1rem 3rem', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  送信する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
