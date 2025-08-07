'use server'

import { z } from 'zod'

// Zodスキーマを定義
const UserSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(50, '名前は50文字以内で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  age: z.coerce.number().min(0, '年齢は0以上で入力してください').max(120, '年齢は120以下で入力してください')
})

// Server Actionの戻り値の型を定義
export interface ActionResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

// ユーザー作成のServer Action
export async function createUser(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  // FormDataからデータを取得
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: formData.get('age')
  }

  try {
    // Zodでバリデーション
    const validatedData = UserSchema.parse(rawData)
    
    // 実際のデータベース処理をシミュレート（遅延あり）
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 成功時の処理
    console.log('ユーザー作成:', validatedData)
    
    return {
      success: true,
      message: `${validatedData.name}さんのアカウントが正常に作成されました！`
    }
  } catch (error) {
    // Zodのバリデーションエラーを処理
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      
      error.errors.forEach((err) => {
        const field = err.path[0] as string
        if (!errors[field]) {
          errors[field] = []
        }
        errors[field].push(err.message)
      })

      return {
        success: false,
        message: 'バリデーションエラーが発生しました',
        errors
      }
    }

    // その他のエラー
    return {
      success: false,
      message: '予期しないエラーが発生しました'
    }
  }
}

// UUID形式のバリデーションスキーマ
const UserIdSchema = z.string().uuid('正しいユーザーIDを指定してください')

// ユーザー削除のServer Action
export async function deleteUser(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const userId = formData.get('userId') as string
  
  try {
    const validatedId = UserIdSchema.parse(userId)
    
    // 削除処理をシミュレート
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      success: true,
      message: `ユーザー（ID: ${validatedId}）が削除されました`
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message
      }
    }

    return {
      success: false,
      message: 'ユーザーの削除に失敗しました'
    }
  }
}