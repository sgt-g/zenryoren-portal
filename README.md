# 第8部会ポータル

全国旅館ホテル生活衛生同業組合連合会 第8部会の公式ポータルサイト。

和モダン・ミニマルなテイストで、災害時対応・AI時代の備え・直販強化・感謝伝達・地方創生の5つの柱を紹介します。

## ファイル構成

```
.
├── index.html         # メインページ
├── assets/
│   ├── style.css      # スタイル
│   └── main.js        # スクロール演出・フィルタ等
└── README.md
```

すべて静的ファイルで、外部依存は Google Fonts のみ。サーバ側処理はありません。

## ローカル確認

任意の静的サーバで配信してください。例：

```bash
# Python
python3 -m http.server 8080
# あるいは
npx serve .
```

ブラウザで `http://localhost:8080` を開いて確認できます。

## GitHub Pages デプロイ手順

1. このリポジトリを GitHub に push します。
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<owner>/<repo>.git
   git push -u origin main
   ```

2. GitHub 上のリポジトリで **Settings → Pages** を開きます。
3. **Build and deployment** → **Source** を `Deploy from a branch` に設定。
4. **Branch** を `main` / `/ (root)` に設定して **Save**。
5. 数十秒〜数分後、`https://<owner>.github.io/<repo>/` で公開されます。

独自ドメインを使う場合は `CNAME` ファイルを追加し、DNS の CNAME レコードを `<owner>.github.io` に向けてください。

## 編集ポイント

- 配色トークン: `assets/style.css` 冒頭の `:root` ブロック
- 取り組みコピー: `index.html` の `.initiative` 各ブロック
- お知らせ: `index.html` の `.news` の `<li>` を追加 / 削除
- 画像差し替え: `<div class="ph ...">` を `<img>` に置き換えてください

## クレジット

- 書体: Noto Sans JP / Noto Serif JP / Inter Tight（Google Fonts）
- 運営: 全国旅館ホテル生活衛生同業組合連合会 第8部会
