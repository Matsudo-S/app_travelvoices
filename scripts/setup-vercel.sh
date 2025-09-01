#!/bin/bash

echo "🚀 Vercelプロジェクトの設定情報を取得中..."

# Vercel CLIがインストールされているかチェック
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLIがインストールされていません。"
    echo "npm install -g vercel を実行してください。"
    exit 1
fi

# プロジェクトがリンクされているかチェック
if [ ! -f ".vercel/project.json" ]; then
    echo "📝 Vercelプロジェクトをリンクします..."
    vercel link
fi

# プロジェクト情報を取得
echo "📋 プロジェクト情報を取得中..."
PROJECT_INFO=$(vercel project ls --json)

echo ""
echo "✅ 以下の情報をGitHub Secretsに設定してください："
echo ""

# Vercel Token
echo "🔑 VERCEL_TOKEN:"
echo "https://vercel.com/account/tokens から新しいトークンを作成"
echo ""

# Project ID
echo "📦 VERCEL_PROJECT_ID:"
cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4
echo ""

# Org ID
echo "🏢 VERCEL_ORG_ID:"
cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4
echo ""

echo "📝 環境変数も設定してください："
echo "NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app"
echo "STRIPE_SECRET_KEY=sk_live_..."
echo "STRIPE_PUBLISHABLE_KEY=pk_live_..."
echo "SUPABASE_URL=your-supabase-url"
echo "SUPABASE_ANON_KEY=your-supabase-anon-key"
echo "STRIPE_SIGNING_SECRET=whsec_..."
echo ""
echo "🔗 GitHub Secrets設定URL:"
echo "https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions"
