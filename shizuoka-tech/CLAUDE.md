# CLAUDE.md

このファイルは、このリポジトリのコードを扱う際にClaude Code (claude.ai/code) に対する指針を提供します。

## プロジェクト概要

これは「Shizuoka Tech #2」で発表するReact Server Componentsについての Marp プレゼンテーションです。プレゼンテーションは日本語で書かれており、Marp の Gaia テーマをカスタムスタイリングで使用しています。

## ファイル構成

- `slide.md` - スライドの内容を含むメインのMarpプレゼンテーションファイル
- `images/` - プレゼンテーション画像が格納されたディレクトリ：
  - `polidog.jpg` - スピーカーのプロフィール画像
  - `printgraph.png` - Printgraphデモ用の背景画像
  - `printgraph_qr.png` - PrintgraphのQRコード
  - `ptyhard.jpg` - フッター用の会社ロゴ
  - `1.png` - アーキテクチャ図

## プレゼンテーション構成

プレゼンテーションは以下の構造で構成されています：
1. タイトルスライドとスピーカー紹介
2. 自己紹介と背景
3. 動機（なぜReact Server Componentsなのか）
4. コア概念の説明とコード例
5. SSRとClient Componentsとの比較
6. Server Actionsの説明
7. 実際のユースケース
8. ベストプラクティスと推奨事項

## Marp設定

プレゼンテーションでは以下を使用：
- **テーマ**: Gaia
- **カスタムスタイリング**: フロントマターに埋め込まれたCSSで：
  - コンテンツ密度向上のためのフォントサイズ縮小
  - カスタムパディングとマージン
  - ページ番号を右下に再配置
  - 会社ロゴを左下に配置
  - `_class: title`によるタイトルスライドの中央揃え
  - `.qr-container`によるQRコードの配置

## コード例

すべてのコード例はTypeScript (.tsx) を使用し、以下を含む：
- 適切なインターフェース定義
- PropsとデータのType注釈
- Next.js App Routerパターン
- Server Components vs Client Componentsパターン

## スタイリングガイドライン

スライドを修正する際：
- 中央揃えのタイトルスライドには `<!-- _class: title -->` を使用
- 背景画像は `![bg](path)` 構文を使用
- 特定の位置に配置する画像はHTML `<div>` コンテナを使用
- テーブルはより良いコンテンツ密度のため縮小フォントサイズ（0.75em）を使用
- コードブロックは可読性のため0.8emフォントサイズを維持

## 言語コンテキスト

- すべてのコンテンツは日本語
- 技術用語は英語のまま保持されることが多い（React Server Componentsなど）
- コードコメントと説明は日本語