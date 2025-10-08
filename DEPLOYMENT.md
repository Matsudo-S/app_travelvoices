# デプロイメント設定

## GitHub Actions 自動デプロイ設定

### 必要な GitHub Secrets

GitHub リポジトリの Settings > Secrets and variables > Actions で以下のシークレットを設定してください：

1. **VERCEL_TOKEN**
   - Vercel ダッシュボード > Settings > Tokens で作成
   - 新しいトークンを作成し、値をコピー

2. **ORG_ID**
   - Vercel ダッシュボード > Settings > General で確認
   - Team ID または Personal Account ID

3. **PROJECT_ID**
   - Vercel プロジェクトの Settings > General で確認
   - Project ID をコピー

### 設定手順

1. Vercel ダッシュボードにログイン
2. プロジェクトの Settings に移動
3. 各 ID をコピーして GitHub Secrets に設定
4. 新しいトークンを作成して VERCEL_TOKEN に設定

### 自動デプロイの動作

- `main` ブランチへの push で自動デプロイ
- Pull Request でもプレビューデプロイ
- ビルドエラーがある場合はデプロイが停止

### トラブルシューティング

- ビルドが失敗する場合は GitHub Actions のログを確認
- Vercel の設定が正しいか確認
- 依存関係のインストールに問題がないか確認
