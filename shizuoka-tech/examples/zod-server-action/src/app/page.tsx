import { UserForm } from './components/UserForm'
import { DeleteUserForm } from './components/DeleteUserForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Server Actions + useActionState + Zod デモ
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">概要</h2>
            <p className="text-gray-600 mb-4">
              このデモでは、React 19のuseActionStateフックとServer Actions、
              Zodバリデーションを組み合わせた実装例を紹介しています。
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Server Actions</strong>: サーバーサイドでの安全なデータ処理</li>
              <li><strong>useActionState</strong>: フォーム状態とPending状態の管理</li>
              <li><strong>Zod</strong>: TypeScript型安全なスキーマバリデーション</li>
              <li><strong>エラーハンドリング</strong>: フィールドレベルでのバリデーションエラー表示</li>
            </ul>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <UserForm />
            </div>

            <div>
              <DeleteUserForm />
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">機能説明</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">ユーザー登録フォーム</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 名前、メール、年齢のバリデーション</li>
                  <li>• リアルタイムエラー表示</li>
                  <li>• 送信中のローディング状態</li>
                  <li>• 成功・失敗メッセージの表示</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">ユーザー削除フォーム</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• UUID形式のバリデーション</li>
                  <li>• エラーハンドリングの例</li>
                  <li>• テスト用のサンプルUUID提供</li>
                  <li>• 危険な操作の視覚的な区別</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
