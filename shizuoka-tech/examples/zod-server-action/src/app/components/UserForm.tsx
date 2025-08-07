'use client'

import { useActionState } from 'react'
import { createUser, type ActionResult } from '../actions/user-actions'

const initialState: ActionResult = {
  success: false,
  message: ''
}

export function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, initialState)

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">ユーザー登録フォーム</h2>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            名前
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="山田太郎"
            disabled={isPending}
          />
          {state.errors?.name && (
            <div className="mt-1">
              {state.errors.name.map((error, index) => (
                <p key={index} className="text-sm text-red-600">{error}</p>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="taro@example.com"
            disabled={isPending}
          />
          {state.errors?.email && (
            <div className="mt-1">
              {state.errors.email.map((error, index) => (
                <p key={index} className="text-sm text-red-600">{error}</p>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            年齢
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="0"
            max="120"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="25"
            disabled={isPending}
          />
          {state.errors?.age && (
            <div className="mt-1">
              {state.errors.age.map((error, index) => (
                <p key={index} className="text-sm text-red-600">{error}</p>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? '登録中...' : 'ユーザーを登録'}
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

      {/* 読み込み状態のインジケーター */}
      {isPending && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">処理中です...</span>
        </div>
      )}
    </div>
  )
}