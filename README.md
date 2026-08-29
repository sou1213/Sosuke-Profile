# Sou-Profile

高橋壮介のプロフィール、現在取り組んでいること、制作物をまとめる静的ポートフォリオサイトです。

## 公開先

- Cloudflare Pages: https://sou-profile.pages.dev/
- GitHub Pages: https://sou1213.github.io/Sou-Profile/

## ページ

- `index.html`: プロフィールと現在の学習テーマ
- `work.html`: 制作中・公開中のプロジェクト

画面上部の共通ナビゲーションからHomeとWorkを移動できます。ダーク／ライトテーマの選択は両ページで共有されます。

## ローカル確認

静的サーバーでリポジトリのルートを配信してください。

```powershell
python -m http.server 4173
```

ブラウザで `http://127.0.0.1:4173/` を開きます。

## テスト

```powershell
node --test test/site.test.mjs
```

## Cloudflare Pages向けビルド

```powershell
node scripts/build-cloudflare-pages.mjs
```

出力先は `dist/cloudflare-pages/` です。Pages Functionsや外部ストレージを使わない静的サイトとしてDirect Uploadします。
