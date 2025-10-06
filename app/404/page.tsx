import Layout from '../components/layout/Layout'
import Button from '../components/ui/button/button'
import styles from './not-found.module.css'

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>ページが見つかりません</h1>
          <p className={styles.description}>
            申し訳ございません。お探しのページは存在しないか、移動または削除された可能性があります。
          </p>
          
          <div className={styles.helpCard}>
            <h2 className={styles.helpTitle}>以下の方法をお試しください</h2>
            <ul className={styles.helpList}>
              <li>URLを再度確認してください</li>
              <li>ブラウザの戻るボタンを使用してください</li>
              <li>トップページから目的のページを探してください</li>
              <li>検索機能をご利用ください</li>
            </ul>
          </div>

          <div className={styles.buttonGroup}>
            <Button href="/" variant="frame" className="primary">
              トップページに戻る
            </Button>
            <Button href="/search" variant="frame" className="secondary">
              記事を検索
            </Button>
            <Button href="/contact" variant="frame" className="accent">
              お問い合わせ
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
