## Overview

Next.js App Router + Supabase + Stripe 学習用アプリ。2024 年のベストプラクティスに寄せたディレクトリ構成で、UI コンポーネント、ページ、型、ユーティリティ、スタイルを分離しています。

## Tech Stack

- Next.js (App Router)
- TypeScript
- Supabase
- Jest + Testing Library
- CSS Modules + Tailwind (必要箇所のみ)

## Directory Structure (key parts)

```text
app/
├─ api/                     # App Router の API ルート
│  └─ hello/route.ts
├─ components/
│  ├─ ui/                  # 再利用 UI コンポーネント
│  │  ├─ button/
│  │  │  ├─ page.tsx            # Button 本体 (default export)
│  │  │  ├─ button.module.css   # Button 専用スタイル
│  │  │  └─ button.test.tsx     # Button テスト
│  │  ├─ card/
│  │  │  ├─ page.tsx
│  │  │  ├─ card.module.css
│  │  │  └─ card.test.tsx
│  │  └─ lesson-card/
│  │     ├─ page.tsx
│  │     ├─ lesson-card.module.css
│  │     └─ lesson-card.test.tsx
│  └─ layout/              # レイアウト関連（header/footer など）
├─ hooks/                  # カスタムフック
├─ lib/                    # DB 接続/共通ユーティリティ/型 (Supabase)
│  ├─ db.ts
│  ├─ lessons.ts
│  └─ database.types.ts
├─ lesson/[id]/            # 動的ルートのページごとの領域
│  ├─ page.tsx                  # 詳細ページ (default export 必須)
│  └─ lesson-detail.module.css  # ページ専用スタイル
├─ styles/                 # グローバルスタイル
│  ├─ css/
│  │  ├─ reset.css              # 最初に読み込む（ブラウザ差異のリセット）
│  │  ├─ base.css               # 要素のベーススタイル
│  │  └─ global.css             # プロジェクト全体の共通クラス
│  ├─ globals.css               # Tailwind や CSS 変数の土台
│  └─ theme.ts
├─ types/
│  └─ index.d.ts           # アプリ共通の型 (Lesson など)
├─ page.tsx                # トップページ
├─ layout.tsx              # ルートレイアウト（グローバル CSS 読み込み）
└─ favicon.ico
public/
  └─ images/, fonts/ 等
```

## What goes where (フォルダごとの役割)

- `app/`
  - App Router の基点。ページやレイアウトはこの直下に配置。
- `app/api/`
  - サーバーサイドの API ルート。ファイルは `route.ts` を default export なしで定義。
- `app/components/ui/`
  - 再利用 UI コンポーネント群。各コンポーネントは専用フォルダを作り、以下 3 点を基本セットにします。
    - `page.tsx`: コンポーネント実体（default export）
    - `<name>.module.css`: そのコンポーネント専用の CSS Modules
    - `<name>.test.tsx`: コンポーネントの単体テスト
- `app/components/layout/`
  - レイアウト系（ヘッダー、フッターなど）を UI と分離して配置。
- `app/hooks/`
  - 再利用可能なカスタムフックを配置。
- `app/lib/`
  - DB クライアント作成、ドメインロジック、ユーティリティ。
  - `database.types.ts` は Supabase の型。`createServerComponentClient<Database>` で利用。
- `app/lesson/[id]/`
  - 動的ページの領域。ページ専用の CSS はここに `*.module.css` で置くと保守しやすい。
  - `page.tsx` は必ず default export の React Component。
- `app/styles/css/`
  - グローバルで共有する CSS。読み込み順は `reset.css → base.css → global.css`。
  - 読み込みは `app/layout.tsx` で行います（Details below）。
- `app/styles/globals.css`
  - Tailwind、CSS 変数、`@layer` の土台。`reset/base/global` はここでは import しません（重複回避）。
- `app/types/`
  - 共通型定義（例: `Lesson`）。DB の実型は `lib/database.types.ts` に準拠。
- `public/`
  - 画像・フォントなどの静的ファイル。

## CSS Loading Order

`app/layout.tsx` で以下の順序で読み込みます。

```ts
import "./styles/css/reset.css";
import "./styles/css/base.css";
import "./styles/css/global.css";
import "./styles/globals.css";
```

- `reset.css` でブラウザ差異をリセット（例: `a { text-decoration: none; }` など）
- その後 `base.css` と `global.css` で共通の見た目を定義
- 最後に `globals.css` で Tailwind や CSS 変数をセット

## Routing & Pages

- ページは `app/` 配下に置き、必ず `default export` の React コンポーネントにする
- 動的ルートは `app/lesson/[id]/page.tsx` のようにフォルダで表現

## Components Convention (UI)

- 各 UI は `app/components/ui/<name>/` にフォルダを作成
- ファイル構成の例

```text
app/components/ui/button/
├─ page.tsx              # default export の React コンポーネント
├─ button.module.css     # CSS Modules（コンポーネント専用）
└─ button.test.tsx       # 単体テスト
```

## Supabase Tips

- サーバーコンポーネントでは `createServerComponentClient<Database>({ cookies })` を**関数内で**生成
- これにより "cookies was called outside a request scope" を回避

## Scripts

```bash
npm run dev      # 開発サーバ
npm run build    # 本番ビルド（ESLint/型チェック含む）
npm run test     # ユニットテスト
```

## How to add a new UI component

1. `app/components/ui/<name>/` を作る
2. `page.tsx` を default export で作成
3. `<name>.module.css` を作成して import
4. `<name>.test.tsx` を作成
5. 使うページで `import <Name> from "@/app/components/ui/<name>/page"` して利用

## How to add a page with local styles

1. `app/<route>/page.tsx` を作成
2. 同じフォルダに `<route>.module.css` を置き、`import styles from './<route>.module.css'`
3. default export の React Component を返す

---

以上のルールに従うことで、スケールしても見通しの良い構成と保守性を維持できます。
