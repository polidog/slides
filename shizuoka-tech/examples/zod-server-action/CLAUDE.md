# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このプロジェクトは、React 19のuseActionStateフック、Next.js 15のServer Actions、Zodバリデーションを組み合わせたフォーム処理のデモアプリケーションです。Shizuoka Tech #2のプレゼンテーション用に作成された実装例です。

## 開発コマンド

```bash
# 開発サーバーの起動 (Turbopack使用)
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start

# ESLintの実行
npm run lint
```

## アーキテクチャと実装パターン

### Server Actions (`src/app/actions.ts`)

- `'use server'`ディレクティブを使用してサーバーサイドの処理を定義
- Zodスキーマを使用した入力検証とエラーハンドリング
- FormDataを直接受け取り、型安全な処理を実装
- ActionResult型で統一されたレスポンス形式（success, message, errors）

### Client Components (`src/app/components/`)

- `'use client'`ディレクティブを明示的に使用
- React 19のuseActionStateフックでフォーム状態管理
- フック戻り値: `[state, formAction, isPending]`
- isPending状態を使用した自動的なローディング表示とボタンの無効化

### バリデーションパターン

- Zodのcoerceを使用した型変換（例: `z.coerce.number()`）
- フィールドレベルのエラーメッセージを配列で管理
- ZodErrorをキャッチして、フィールドごとのエラーをRecord型で返却

### スタイリング

- Tailwind CSS v4を使用
- 入力フィールドには`text-gray-900`を追加して文字を濃く表示
- フォーカス時のリング効果とボーダー色の変更
- disabled状態の視覚的フィードバック

## 重要な実装詳細

### useActionStateの使用方法

```typescript
const [state, formAction, isPending] = useActionState(serverAction, initialState)
```

- formActionを`<form action={formAction}>`に設定
- isPendingでローディング状態を管理
- stateには前回のアクション結果が格納される

### エラーハンドリング

- Server Actionsでtry-catchブロックを使用
- Zodのparse失敗時はフィールドごとのエラーを返却
- クライアント側でstate.errorsをチェックして表示

## 技術スタック

- Next.js 15.4.5 (App Router)
- React 19.1.0
- TypeScript 5
- Zod 3.24.1
- Tailwind CSS 4
- ESLint 9