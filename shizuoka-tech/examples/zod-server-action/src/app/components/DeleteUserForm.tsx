'use client'

import { useActionState } from 'react'
import { deleteUser, type ActionResult } from '../actions/user-actions'

const initialState: ActionResult = {
  success: false,
  message: ''
}

export function DeleteUserForm() {
  const [state, formAction, isPending] = useActionState(deleteUser, initialState)

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border-l-4 border-red-500">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">ユーザー削除</h2>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            ユーザーID（UUID形式）
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
            placeholder="例: 123e4567-e89b-12d3-a456-426614174000"
            disabled={isPending}
          />
          <p className="mt-1 text-xs text-gray-500">
            正しいUUID形式で入力してください
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? '削除中...' : 'ユーザーを削除'}
        </button>
      </form>

      {/* 結果メッセージ */}
      {state.message && (
        <div className={`mt-4 p-3 rounded-md ${
          state.success 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {state.message}
        </div>
      )}

      {/* 使用例 */}
      <div className="mt-6 p-3 bg-gray-100 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">テスト用UUID例:</h3>
        <code className="text-xs bg-white p-2 rounded border block">
          123e4567-e89b-12d3-a456-426614174000
        </code>
        <p className="mt-1 text-xs text-gray-600">
          このUUIDをコピーしてテストできます
        </p>
      </div>
    </div>
  )
}