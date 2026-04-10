# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

プレゼンテーション資料をまとめたリポジトリ。スライドは **Marp** (Markdown Presentation Ecosystem) で作成されている。

## リポジトリ構成

イベントごとにトップレベルディレクトリを切る構成：

- `shizuoka-tech/` — Shizuoka Tech 勉強会向けの資料
  - `slide.md` — Marp スライド本体（Shizuoka Tech #2: React Server Components）
  - `lt.md` — LT スライド（Shizuoka Tech #1: 開発環境の話）
  - `images/` — スライド用画像（.gitignoreで管理、リポジトリには含まれない）
  - `examples/` — スライド内で紹介するデモコード

## Marp スライドの編集

- フロントマターで `marp: true` とテーマ・スタイルを定義
- `---` でスライドを区切る
- `<!-- _class: title -->` でタイトルスライドの中央揃え
- 背景画像は `![bg](path)` 構文
- すべてのコンテンツは日本語。技術用語は英語のまま保持

### プレビュー

Marp CLI または VS Code の Marp 拡張機能でプレビュー可能：

```bash
# Marp CLIでHTMLにエクスポート
npx @marp-team/marp-cli slide.md

# PDFにエクスポート
npx @marp-team/marp-cli slide.md --pdf
```

## サンプルプロジェクト

`shizuoka-tech/examples/zod-server-action/` は Next.js 15 + React 19 + Zod のデモアプリ。各サブプロジェクトに独自の `CLAUDE.md` があるのでそちらを参照。

```bash
cd shizuoka-tech/examples/zod-server-action
npm install
npm run dev    # 開発サーバー (Turbopack)
npm run lint   # ESLint
npm run build  # プロダクションビルド
```
