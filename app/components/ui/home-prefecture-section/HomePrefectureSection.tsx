'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './home-prefecture-section.module.css'
import { PREFECTURES, CATEGORIES } from '../../../lib/constants'
import Button from '../button/button'

// 地域別都道府県データ
const REGIONS = {
  '北海道': ['北海道'],
  '東北': ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  '関東': ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  '甲信越': ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県'],
  '中部': ['岐阜県', '静岡県', '愛知県', '三重県'],
  '近畿': ['滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  '中国': ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  '四国': ['徳島県', '香川県', '愛媛県', '高知県'],
  '九州/沖縄': ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県']
}

const HomePrefectureSection = () => {
  const router = useRouter()
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null)

  const isDisabled = useMemo(() => selectedPrefectures.length === 0 && selectedCategories.length === 0, [selectedPrefectures, selectedCategories])

  // クリック外側を検知してexpandedRegionを閉じる
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // regionButton または prefectureList 内のクリックでなければ閉じる
      if (!target.closest(`.${styles.regionGroup}`) && expandedRegion) {
        setExpandedRegion(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [expandedRegion])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedPrefectures.length) params.set('prefecture', selectedPrefectures.join(','))
    if (selectedCategories.length) params.set('category', selectedCategories.join(','))
    router.push(`/search?${params.toString()}`)
  }

  const togglePrefecture = (name: string) => {
    setSelectedPrefectures((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    )
  }

  const removePrefecture = (name: string) => {
    setSelectedPrefectures((prev) => prev.filter((p) => p !== name))
  }

  const clearAllPrefectures = () => {
    setSelectedPrefectures([])
  }

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    )
  }

  const removeCategory = (name: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== name))
  }

  const clearAllCategories = () => {
    setSelectedCategories([])
  }

  const toggleRegion = (region: string) => {
    // 北海道は1つしかないので、クリックで直接選択
    if (region === '北海道') {
      togglePrefecture('北海道')
      return
    }
    setExpandedRegion(expandedRegion === region ? null : region)
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>都道府県・カテゴリから探す</h2>
        <p className={styles.subtitle}>気になるエリアやカテゴリを選択して、関連記事を検索できます。</p>


        <div className={styles.grid}>
          {/* 地図セクション */}
          <div className={styles.mapSection}>
            <div className={styles.mapHeader}>
              <h3 className={styles.mapTitle}>お探しの都道府県を選んでください</h3>
            </div>
            <div className={styles.mapWrapper}>
              <div className={styles.mapImageHolder}>
                <Image src="/japan-map.png" alt="日本地図（都道府県）" fill priority sizes="(min-width: 768px) 600px, 100vw" className={styles.mapImage} />
                
                {/* 地域ボタンを地図上に配置 */}
                <div className={styles.regionButtonsOverlay}>
                  {Object.entries(REGIONS).map(([region, prefectures]) => (
                    <div key={region} className={styles.regionGroup}>
                      <button 
                        className={`${styles.regionButton} ${expandedRegion === region ? styles.regionButtonActive : ''}`}
                        onClick={() => toggleRegion(region)}
                      >
                        {region}
                        <span className={styles.regionArrow}>
                          {expandedRegion === region ? '▼' : '▶'}
                        </span>
                      </button>
                      
                      {expandedRegion === region && (
                        <div className={styles.prefectureList}>
                          {prefectures.map((pref) => (
                            <button
                              key={pref}
                              className={`${styles.prefectureButton} ${selectedPrefectures.includes(pref) ? styles.prefectureButtonSelected : ''}`}
                              onClick={() => togglePrefecture(pref)}
                            >
                              {pref}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* カテゴリ選択セクション */}
          <div className={styles.controlsSection}>
            <div className={styles.controls}>
              <div className={styles.field}>
                <label className={styles.label}>カテゴリ（複数選択可）</label>
                <div className={styles.categoryGrid}>
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={`${styles.categoryButton} ${selectedCategories.includes(category) ? styles.categoryButtonSelected : ''}`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* 選択された都道府県表示（コンパクト版） */}
              {selectedPrefectures.length > 0 && (
                <div className={styles.compactSelectedSection}>
                  <div className={styles.compactSelectedHeader}>
                    <h4 className={styles.compactSelectedTitle}>選択した都道府県({selectedPrefectures.length})</h4>
                    <button className={styles.compactClearButton} onClick={clearAllPrefectures}>
                      すべて削除
                    </button>
                  </div>
                  <div className={styles.compactSelectedTags}>
                    {selectedPrefectures.map((pref) => (
                      <span key={pref} className={styles.compactSelectedTag}>
                        {pref}
                        <button 
                          className={styles.compactRemoveTag} 
                          onClick={() => removePrefecture(pref)}
                          aria-label={`${pref}を削除`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 選択されたカテゴリ表示（コンパクト版） */}
              {selectedCategories.length > 0 && (
                <div className={styles.compactSelectedSection}>
                  <div className={styles.compactSelectedHeader}>
                    <h4 className={styles.compactSelectedTitle}>選択したカテゴリ({selectedCategories.length})</h4>
                    <button className={styles.compactClearButton} onClick={clearAllCategories}>
                      すべて削除
                    </button>
                  </div>
                  <div className={styles.compactSelectedTags}>
                    {selectedCategories.map((cat) => (
                      <span key={cat} className={styles.compactSelectedTag}>
                        {cat}
                        <button 
                          className={styles.compactRemoveTag} 
                          onClick={() => removeCategory(cat)}
                          aria-label={`${cat}を削除`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                variant="frame" 
                className="secondary" 
                onClick={handleSearch}
                disabled={isDisabled}
              >
                記事を検索する
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePrefectureSection


