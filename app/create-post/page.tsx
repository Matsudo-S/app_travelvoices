import Layout from '../components/layout/Layout'

export default function CreatePostPage() {
  return (
    <Layout>
      <div style={{ padding: '120px 20px 80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>記事作成</h1>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <form>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  タイトル
                </label>
                <input 
                  type="text" 
                  placeholder="記事のタイトルを入力してください" 
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
                  目的地
                </label>
                <input 
                  type="text" 
                  placeholder="旅行先の目的地を入力してください" 
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
                  記事内容
                </label>
                <textarea 
                  placeholder="旅行の体験や感想を詳しく書いてください（Markdown形式対応）" 
                  rows={10}
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  画像アップロード
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple
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
                  公開設定
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" name="visibility" value="public" defaultChecked />
                    公開
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" name="visibility" value="private" />
                    非公開（売り出す前に設定する用）
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  価格設定（円）
                </label>
                <input 
                  type="number" 
                  placeholder="0" 
                  min="0"
                  style={{ 
                    width: '200px', 
                    padding: '1rem', 
                    fontSize: '1.1rem', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  style={{ 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    padding: '1rem 2rem', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                  }}
                >
                  下書き保存
                </button>
                <button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#2a2a2a', 
                    color: 'white', 
                    padding: '1rem 2rem', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                  }}
                >
                  投稿する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
