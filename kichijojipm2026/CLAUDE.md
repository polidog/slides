# kichijojipm2026

吉祥寺.pm 2026 の登壇スライド。Marp で作る。

## 構成
- `slides.md` — 本体。これだけ編集すればよい
- `themes/ptyhard.css` — 自作テーマ `ptyhard`
- `.marprc.yml` — themeSet を `./themes` に指定済み

## コマンド
- `npm run dev` — localhost:8080 でライブプレビュー
- `npm run pdf` — `dist/slides.pdf`（Speaker Deck 入稿用）
- `npm run png` — 画像書き出し

## スライドのクラス
`<!-- _class: xxx -->` をスライド先頭に書く。
- 指定なし … 見出し＋箇条書き（本編）
- `lead` … 表紙・章扉・締め。中央寄せ大文字
- `impact` … アクセント色ベタ塗りで一言だけ叩きつける
- `dark` … 黒背景
- `full` … 画像1枚

表紙・締めでは `<!-- _footer: '' -->` と `<!-- _paginate: false -->` も併記する。

## デザイン方針
- 参考: https://speakerdeck.com/polidog/2025kichijoujipm（去年の登壇）
- 1スライド1メッセージ。箇条書きは最大4〜5行まで
- 色は `themes/ptyhard.css` の `:root` 変数のみで管理する。
  個別スライドにインラインスタイルを書かない
- 日本語フォントは Hiragino Kaku Gothic ProN 前提

## 禁止事項
- `slides.md` に生HTMLでレイアウトを組まない（Marp ディレクティブとテーマCSSで解決する）
- テーマを増やさない。調整は `ptyhard.css` に集約
