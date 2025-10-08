'use client'

import Link from 'next/link'
import React from 'react'
import styles from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faXTwitter, faLine } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { 
  faShield, 
  faGift, 
  faBookmark, 
  faGlobe, 
  faArrowUp, 
  faComment 
} from '@fortawesome/free-solid-svg-icons'
import { NavigationItem } from '../../../types/navigation'

// Footerのナビゲーションデータを定義
export const footerNavigationItems: NavigationItem[] = [
  { href: '/about', mainText: 'コンセプト', subText: 'Concept', showInDrawer: true },
  { href: '/search', mainText: '記事検索', subText: 'Search', showInDrawer: true },
  { href: '/create-post', mainText: '記事作成', subText: 'Create', showInDrawer: true },
  { href: '/price', mainText: '料金プラン', subText: 'Price', showInDrawer: true },
  { href: '/mypage', mainText: 'マイページ', subText: 'My Page', showInDrawer: true },
  { href: '/contact', mainText: 'お問い合わせ', subText: 'Contact', showInDrawer: true },
  { href: '/faq', mainText: 'よくある質問', subText: 'FAQ', showInDrawer: true },
  { href: '/privacy', mainText: 'プライバシーポリシー', subText: 'Privacy', showInDrawer: true },
  { href: '/terms', mainText: '利用規約', subText: 'Terms', showInDrawer: true }
]

// SNSリンクデータを定義
export const footerSocialItems: NavigationItem[] = [
  { href: 'https://instagram.com', mainText: 'Instagram', subText: 'Instagram', showInDrawer: true },
  { href: 'https://x.com', mainText: 'X (Twitter)', subText: 'X', showInDrawer: true },
  { href: 'https://line.me', mainText: 'Line', subText: 'Line', showInDrawer: true }
]

// SNSアイコンデータを定義
export const footerSocialIcons: Record<string, { icon: IconDefinition; color: string }> = {
  instagram: { icon: faInstagram, color: '#E4405F' },
  x: { icon: faXTwitter, color: '#ffffff' },
  line: { icon: faLine, color: '#06C755' }
}

const Footer = () => {

  return (
    <footer className={styles.footer}>
      {/* 上部バー */}
      <div className={styles.footer__top}>
        <div className={styles.footer__scrollContainer}>
          <div className={styles.footer__scrollContent}>
            <div className={styles.footer__topItem}>
              <div className={styles.footer__icon}>
                <FontAwesomeIcon icon={faGift} />
              </div>
              <span>（案）初回ログインから2週間無料キャンペーン中</span>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className={styles.footer__main}>
        <div className={styles.footer__content}>
          {/* Travel Voicesについて */}
          <div className={`${styles.footer__section} ${styles.footer__about}`}>
            <h3 className={styles.footer__sectionTitle}>Travel Voices<span className={styles.footer__br}></span> 〜 あなたの旅には、きっと意味がある 〜</h3>
            <div className={styles.footer__sustainability}>
              <p>
                Travel Voicesは、<span className={styles.footer__br}></span>旅行の魅力を個々人の旅行の経験を通して提供します。<span className={styles.footer__br}></span>
                <Link href="/about" className={styles.footer__aboutLink}>詳細はこちら</Link>
              </p>
            </div>
          </div>

          {/* サービス・アカウント・サポート */}
          <div className={styles.footer__linksContainer}>
            {/* サービス */}
            <div className={styles.footer__section}>
              <h3 className={styles.footer__sectionTitle}>サービス</h3>
              <ul className={styles.footer__links}>
                <li><Link href="/about" className={styles.footer__conceptLink}>コンセプト</Link></li>
                <li><Link href="/search" className={styles.footer__searchLink}>記事検索</Link></li>
                <li><Link href="/create-post" className={styles.footer__createLink}>記事作成</Link></li>
                <li><Link href="/price" className={styles.footer__priceLink}>料金プラン</Link></li>
              </ul>
            </div>

            {/* アカウント */}
            <div className={styles.footer__section}>
              <h3 className={styles.footer__sectionTitle}>アカウント</h3>
              <ul className={styles.footer__links}>
                <li><Link href="/mypage" className={styles.footer__mypageLink}>マイページ</Link></li>
                <li><Link href="/404" className={styles.footer__errorLink}>404ページ（確認用。あとで消す）</Link></li>
              </ul>
            </div>

            {/* サポート */}
            <div className={styles.footer__section}>
              <h3 className={styles.footer__sectionTitle}>サポート</h3>
              <ul className={styles.footer__links}>
                <li><Link href="/contact" className={styles.footer__contactLink}>お問い合わせ</Link></li>
                <li><Link href="/faq" className={styles.footer__faqLink}>よくある質問</Link></li>
                <li><Link href="/privacy" className={styles.footer__privacyLink}>プライバシーポリシー</Link></li>
                <li><Link href="/terms" className={styles.footer__termsLink}>利用規約</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* ソーシャルメディアリンク */}
        <div className={styles.footer__social}>
          <Link href="https://instagram.com" className={styles.footer__socialLink} aria-label="Instagram">
            <FontAwesomeIcon icon={footerSocialIcons.instagram.icon} style={{ color: footerSocialIcons.instagram.color }} />
          </Link>
          <Link href="https://x.com" className={styles.footer__socialLink} aria-label="X (Twitter)">
            <FontAwesomeIcon icon={footerSocialIcons.x.icon} style={{ color: footerSocialIcons.x.color }} />
          </Link>
          <Link href="https://line.me" className={styles.footer__socialLink} aria-label="Line">
            <FontAwesomeIcon icon={footerSocialIcons.line.icon} style={{ color: footerSocialIcons.line.color }} />
          </Link>
        </div>
      </div>

      {/* 下部セクション */}
      <div className={styles.footer__bottom}>
        <div className={styles.footer__bottomContent}>
          <div className={styles.footer__copyright}>
            <p>Copyright&nbsp;&copy;&nbsp;2025&nbsp;Travel Voices | このサイトは日本の消費者を対象としています。</p>
            <p>詳細については、<Link href="/privacy" className={styles.footer__privacyLink}>プライバシーポリシー</Link>をご覧ください。</p>
          </div>
          <div className={styles.footer__bottomLinks}>
            <div className={styles.footer__bottomLinksRow}>
              <Link href="/terms" className={styles.footer__termsLink}>利用規約</Link>
              <Link href="/privacy" className={styles.footer__privacyLink}>プライバシーポリシー</Link>
            </div>
            <div className={styles.footer__bottomLinksColumn}>
              <Link href="/sitemap" className={styles.footer__sitemapLink}>サイトマップ</Link>
            </div>
          </div>
        </div>
      </div>

      {/* フローティングアクションボタン */}
      <div className={styles.footer__floating}>
        <button className={styles.footer__floatingButton} aria-label="ブックマーク">
          <FontAwesomeIcon icon={faBookmark} />
        </button>
        <button className={styles.footer__floatingButton} aria-label="トップに戻る" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        
      </div>
    </footer>
  )
}

export default Footer
