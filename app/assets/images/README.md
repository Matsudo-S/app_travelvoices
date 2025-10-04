# Images Directory

このディレクトリは、アプリケーションで使用する画像ファイルを格納します。

## ディレクトリ構造

```
app/assets/images/
├── README.md (このファイル)
├── logos/          # ロゴ画像
├── icons/          # アイコン画像
├── backgrounds/    # 背景画像
├── avatars/        # アバター画像
└── ui/             # UI要素の画像
```

## 使用方法

### Next.js Image コンポーネントでの使用例

```tsx
import Image from "next/image";
import logoImage from "@/assets/images/logos/logo.png";

export default function Header() {
  return <Image src={logoImage} alt="Logo" width={100} height={50} />;
}
```

### CSS での使用例

```css
.hero {
  background-image: url("@/assets/images/backgrounds/hero-bg.jpg");
}
```

## 命名規則

- **ファイル名**: ケバブケース (例: `hero-background.jpg`)
- **ディレクトリ名**: 複数形で統一 (例: `logos`, `icons`)
- **説明性**: ファイル名から用途が分かるようにする

## 最適化

- **WebP 形式**: 可能な限り WebP 形式を使用
- **適切なサイズ**: 用途に応じた適切な解像度で保存
- **圧縮**: 画像圧縮ツールを使用してファイルサイズを最適化
