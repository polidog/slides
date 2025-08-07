# Server Actions + useActionState + Zod デモ

このプロジェクトは、React 19の`useActionState`フック、Next.jsのServer Actions、Zodバリデーションライブラリを組み合わせたフォーム処理のデモアプリケーションです。

## 機能概要

- **Server Actions**: サーバーサイドでの安全なフォームデータ処理
- **useActionState**: React 19の新しいフックを使ったフォーム状態管理
- **Zod バリデーション**: TypeScript型安全なスキーマバリデーション
- **エラーハンドリング**: フィールドレベルでのバリデーションエラー表示
- **UI/UX**: Tailwind CSSを使ったレスポンシブなフォームデザイン

## デモ内容

### 1. ユーザー登録フォーム
- 名前、メールアドレス、年齢の入力
- リアルタイムバリデーションとエラー表示
- 送信中のローディング状態表示

### 2. ユーザー削除フォーム
- UUID形式のバリデーション例
- 危険な操作の視覚的な区別
- テスト用のサンプルUUID提供

## セットアップ

まず、依存関係をインストールします：

```bash
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## プロジェクト構造

```
src/app/
├── actions.ts                     # Server Actions定義
├── components/
│   ├── UserForm.tsx              # ユーザー登録フォーム
│   └── DeleteUserForm.tsx        # ユーザー削除フォーム
└── page.tsx                      # メインページ
```

## 主要なコード例

### Server Actions (`actions.ts`)

```typescript
'use server'

import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  age: z.coerce.number().min(0, '年齢は0以上で入力してください')
})

export async function createUser(formData: FormData) {
  const validatedData = UserSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    age: formData.get('age')
  })
  
  // データ処理
  return { success: true, message: '登録完了' }
}
```

### useActionState の使用例 (`UserForm.tsx`)

```typescript
'use client'

import { useActionState } from 'react'
import { createUser } from '../actions'

export function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, initialState)
  
  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? '登録中...' : 'ユーザーを登録'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
```

## 技術スタック

- **Next.js 15**: App Router使用
- **React 19**: useActionStateフック
- **TypeScript**: 型安全性
- **Zod**: スキーマバリデーション
- **Tailwind CSS**: スタイリング

## 学習ポイント

1. **Server Actions**: `'use server'`ディレクティブの使い方
2. **useActionState**: フォーム状態管理の新しいアプローチ
3. **Zod**: バリデーションスキーマの定義とエラーハンドリング
4. **型安全性**: TypeScriptとZodの組み合わせ
5. **UX**: ローディング状態とエラー表示の実装
