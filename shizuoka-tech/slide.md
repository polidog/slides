---
marp: true
theme: gaia
paginate: true
backgroundColor: '#fff'
style: |
  section {
    padding: 40px 60px;
    justify-content: start;
  }
  h1 {
    font-size: 1.2em;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  h2 {
    font-size: 1.0em;
    margin-top: 0;
    margin-bottom: 0.4em;
  }
  h3 {
    font-size: 0.8em;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
  p, li {
    font-size: 0.9em;
  }
  p {
    margin-top: 0.3em;
  }
  code {
    font-size: 0.7em;
  }
  pre {
    margin-top: 0.5em;
  }
  table {
    font-size: 0.75em;
    margin-top: 0.5em;
  }
  table th, table td {
    padding: 0.3em 0.5em;
    font-size: 0.75em;
  }
  /* デフォルトのページ番号を非表示 */
  section::after {
    display: none;
  }
  /* ページ番号を右下に再配置 */
  section[data-marpit-pagination] {
    position: relative;
  }
  section[data-marpit-pagination]::after {
    content: attr(data-marpit-pagination);
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 0.8em;
    color: #666;
    display: block;
  }
  /* タイトルページを中央揃え */
  section.title {
    align-content: center;
  }
  /* QRコードを右下に配置 */
  .qr-container {
    position: absolute;
    bottom: 80px;
    right: 60px;
  }
  /* 強調テキスト */
  .impact {
    font-size: 1.5em;
    font-weight: bold;
    color: #ff6b6b;
  }
  .highlight {
    background-color: #fff3cd;
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
  }
---
<!-- _class: title -->

# React Server Components で
## API不要の開発体験

@polidog

Shizuoka Tech #1

---

# 自己紹介

![bg right:42%](./images/polidog.jpg)

- @polidog
- パーティーハード株式会社という開発会社を経営しています。
- 清水市出身、神奈川県在住
- 4歳と0歳の男の子のパパ
- Symfony(PHP)が好き

---

<!-- _class: title -->
# なぜReact Server Componentsの話をするのか？

---

![bg](./images/printgraph.png)
<div class="qr-container">
<img src="./images/printgraph_qr.png" width="100" alt="Printgraph QR Code">
</div>


---

## 実体験から

[**Printgraph**](https://printgraph.io) というサービスを開発

- React Server Components中心で実装
- **開発体験が予想以上に良かった**
- APIを書かない開発に感動

### 🎯 これは広めなければ！

---

# SPA開発あるある

## これ、全部経験ありませんか？

- 🤔 「このデータ、GET /users/:id/posts？POST /posts？」API設計で1日会議
- 🤯 「token、refreshToken、どこに保存する？localStorage？cookie？」
- 😤 「バックエンドでcreated_at、フロントでcreatedAt...」型のズレに悩む
- 🥺 「ローディング中...」が3秒も表示される
- 😱 「401エラーでリトライして、トークン更新して...」実装が複雑すぎる
- 😭 「フロントとバック、別々にデプロイしなきゃ...」面倒くさい

---
<!-- _class: title -->

# 昔はもっとシンプルだった

---

# PHPの時代（2000年代）

```php
<?php
// index.php - これだけで動く！
$posts = $db->query("SELECT * FROM posts");
?>
<html>
  <body>
    <?php foreach($posts as $post): ?>
      <article>
        <h2><?= $post['title'] ?></h2>
        <p><?= $post['content'] ?></p>
      </article>
    <?php endforeach; ?>
  </body>
</html>
```

### 👍 シンプル！早い！分かりやすい！

---

# そしてSPA時代へ（2010年代後半）

### フロントエンド（React）
```tsx
import { useState, useEffect } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

---


# そしてSPA時代へ（2010年代後半）

#### バックエンド（Symfony）

```php
<?php
// src/Controller/ApiController.php
namespace App\Controller;

use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ApiController extends AbstractController
{
    #[Route('/api/posts', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getPosts(EntityManagerInterface $em): JsonResponse
    {
        $posts = $em->getRepository(Post::class)->findAll();
        return $this->json($posts);
    }
}
```

---

<!-- _class: title -->
# 😰 フロントエンドとバックエンドが分離された結果、開発が複雑に...

---
<!-- _class: title -->

# 開発者の悲鳴

## 「APIエンドポイント作るのめんどくさい」
## 「型の二重管理つらい」
## 「フロントとバックで仕様認識がズレる」
## 「OpenAPI定義と実装が違ってる...」
## 「初期表示遅い」

---

# そこで登場！React Server Components

```tsx
// app/posts/page.tsx - これだけ！
export default async function PostsPage() {
  const posts = await db.query('SELECT * FROM posts');
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```


---

# サーバー上で実行されるReactコンポーネント
- **サーバー側でレンダリング**され、HTMLとして配信
- **データベース直接アクセス**が可能
- **JavaScript バンドルに含まれない**（バンドルサイズ削減）
- **機密情報**（APIキー等）を安全に使用可能

---

<!-- _class: title -->
# でも、Server Componentには制約がある

---

# できること
- ✅ **async/await** でデータ取得
- ✅ **データベース直接アクセス**
- ✅ **環境変数やAPIキー**を安全に使用
- ✅ **サーバー側ライブラリ**を利用

---

# できないこと
- ❌ **useState**, **useEffect** などのHooks
- ❌ **onClick**, **onChange** などのイベントハンドラ
- ❌ **ブラウザAPI** (localStorage, sessionStorageなど)
- ❌ **クライアント側ライブラリ**

### 🤔 **インタラクティブな機能はどうするの？**

---
<!-- _class: title -->

# そこで Client Component！

```tsx
'use client'; // この一行でClient Componentに！

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}
```

---

# Client Componentとは？

- **従来のReactコンポーネント**
  - RSCと区別するために「Client Component」と呼ぶように
- **ブラウザで実行**される
- **Hooks**（useState, useEffectなど）や**イベントハンドラ**が使える
- **JavaScriptバンドルに含まれる**

---

---

# 実際の使い方

### Server Component + Client Componentの組み合わせ

```tsx
// app/posts/page.tsx (Server Component)
import { db } from '@/lib/db';
import LikeButton from './LikeButton';

export default async function PostsPage() {
  const posts = await db.query('SELECT * FROM posts');
  
  return posts.map(post => (
    <article key={post.id}>
      <h2>{post.title}</h2>      {/* サーバーで生成 */}
      <p>{post.content}</p>      {/* サーバーで生成 */}
      <LikeButton postId={post.id} /> {/* クライアントで動作 */}
    </article>
  ));
}
```

---

# 実際の使い方

### Server Component + Client Componentの組み合わせ

```tsx
// app/posts/LikeButton.tsx
'use client'; // これでClient Componentになる

import { useState } from 'react';

export default function LikeButton({ postId }: { postId: number }) {
  const [likes, setLikes] = useState(0);
  
  return (
    <button onClick={() => setLikes(likes + 1)}>
      いいね！ {likes}
    </button>
  );
}
```

--- 

# 役割分担

- **Server Component**: データ取得、HTML生成
- **Client Component**: インタラクション、状態管理

---

# 🤔 SSRとは何が違うの？

## 従来のSSR（Server-Side Rendering）
- **ページ全体**をサーバーでレンダリング
- **すべてのJavaScript**がクライアントに送信される
- **Hydration**（サーバーHTMLにイベントを付与）が必要
- **データ取得後もコンポーネントのコード**がバンドルに含まれる

## React Server Components
- **コンポーネント単位**でサーバー実行を選択
- **Server ComponentのJS**はクライアントに送られない
- **必要な部分だけ**をClient Componentに
- **バンドルサイズを大幅削減**

### 🎯 **SSRは「どこで」レンダリングするか、RSCは「何を」レンダリングするか**

---

<!-- _class: title -->
# ⚠️ データ受け渡しの制約

---

# ⚠️ データ受け渡しの制約

## Server → Client Componentに渡せないもの
- ❌ **関数**（メソッドを含む）
- ❌ **Date オブジェクト**
- ❌ **undefined** 値
- ❌ **Symbol**
- ❌ **クラスのインスタンス**

---
# ⚠️ データ受け渡しの制約

## 渡せるもの
- ✅ **プリミティブ値**（string, number, boolean, null）
- ✅ **プレーンなオブジェクト**（JSONシリアライズ可能）
- ✅ **配列**

### 💡 **理由：propsはJSON.stringify()でシリアライズされるため**

---

<!-- _class: title -->
# Server Actions

---

# Server Actionsとは？

## サーバー側で実行される関数

- **'use server'** ディレクティブで宣言
- **フォームのaction属性**に直接指定可能
- **データベースアクセス**や**APIキー**が安全に使える
- **APIエンドポイントが不要**

### 🎯 **フォーム処理がこれまでになくシンプルに！**

---

# Server Actions - フォーム処理も簡単！

### Server Actionsの実装

```tsx
// app/posts/actions.ts
'use server';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', 
    [title, content]);
  
  redirect('/posts'); // リダイレクトも簡単
}
```

---

# Server Actions - フォーム処理も簡単！

### Formの実装

```tsx
// app/posts/new/page.tsx
import { createPost } from './actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="タイトル" />
      <textarea name="content" placeholder="内容" />
      <button type="submit">投稿</button>
    </form>
  );
}
```


---

# Server Actions + useActionState + Zod

### Server Actionsの実装

```tsx
// actions.ts - Server Actions用ファイル
'use server';
import { z } from 'zod';

// Zodスキーマで型安全なバリデーション
const schema = z.object({
  name: z.string().min(3, 'ユーザー名は3文字以上必要です'),
  email: z.string().email('有効なメールアドレスを入力してください')
});

export async function createUser(prevState: any, formData: FormData) {
  const result = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email')
  });
  
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  
  // バリデーション通過後の処理
  await db.user.create({ data: result.data });
  return { success: true };
}
```

---

# Server Actions + useActionState + Zod

### フォーム側の実装

```tsx
// UserForm.tsx - Client Component
'use client';
import { useActionState } from 'react';
import { createUser } from './actions';

export default function UserForm() {
  const [state, formAction] = useActionState(createUser, null);
  
  return (
    <form action={formAction}>
      <input name="name" placeholder="ユーザー名" />
      {state?.errors?.name && <p>{state.errors.name[0]}</p>}
      
      <input name="email" placeholder="メールアドレス" />
      {state?.errors?.email && <p>{state.errors.email[0]}</p>}
      
      <button type="submit">登録</button>
      {state?.success && <p>登録完了！</p>}
    </form>
  );
}
```

### 🎯 **バリデーションもReact標準のHookで！**

---

# まとめ

## React Server Components + Server Actions = API不要開発

- 🚀 **開発が劇的に速くなる**
  - APIエンドポイントの設計・実装が不要
  - フロントとバックの型の二重管理から解放
  - データベースから画面まで一気通貫で実装
- 🎯 **エンジニアに求められるスキルの変化**
  - **フロントエンドエンジニア** → DBやサーバー側の知識が必要に
  - **バックエンドエンジニア** → React/TypeScriptの習得が必須に
  - **フルスタックWebアプリケーションエンジニア** が当たり前の時代へ

---

<!-- _class: title -->
# おまけ

---

# 型安全なデータベースアクセス

## Prismaと組み合わせると...

### DBスキーマもTypeScriptの型として扱える！

```tsx
// DBスキーマが変更されたら...
const posts = await prisma.post.findMany();

posts[0].title;  // ✅ 型安全
posts[0].title;  // ❌ コンパイル時にエラー！
```

### 🎯 **DBスキーマ変更時も**
### **エディタレベルで即座にエラーを検知**

- SQLのタイポによる実行時エラーから解放
- スキーマ変更の影響をコード全体で自動チェック
- IDEの補完機能でDBカラム名も間違えない

---

# 実際に使ってみよう！

## 1. Next.jsプロジェクトの作成

```bash
npx create-next-app@latest my-app --app
cd my-app
```

プロンプトで聞かれる選択：
- **TypeScript?** → Yes
- **ESLint?** → Yes
- **Tailwind CSS?** → お好みで
- **App Router?** → Yes（必須）

---

# 2. Server Componentでデータ取得

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
  // 直接データベースにアクセス！
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  
  return (
    <div>
      <h1>記事一覧</h1>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}
```

### 🎯 **ポイント：async/awaitで直接データ取得！**

---

# 3. Client Componentでインタラクション追加

```tsx
// app/posts/LikeButton.tsx
'use client'; // この一行でClient Componentに！

import { useState } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  
  return (
    <button 
      onClick={() => setLiked(!liked)}
      style={{ color: liked ? 'red' : 'gray' }}
    >
      {liked ? '♥' : '♡'} いいね
    </button>
  );
}
```

---

# 4. 組み合わせて使う

```tsx
// app/posts/page.tsx
import LikeButton from './LikeButton';

export default async function PostsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  
  return (
    <div>
      <h1>記事一覧</h1>
      {posts.slice(0, 5).map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <LikeButton /> {/* Client Componentを配置 */}
        </article>
      ))}
    </div>
  );
}
```

---

# 5. Server Actionsでフォーム処理

```tsx
// app/posts/new/page.tsx
async function createPost(formData: FormData) {
  'use server'; // Server Actionの宣言
  
  const title = formData.get('title');
  const body = formData.get('body');
  
  // データベースに保存（実際の処理）
  console.log('投稿を作成:', { title, body });
  
  // リダイレクト等の処理
}

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="タイトル" required />
      <textarea name="body" placeholder="本文" required />
      <button type="submit">投稿する</button>
    </form>
  );
}
```

---

# 6. Zodでバリデーション追加

```bash
npm install zod
```

```tsx
// app/posts/new/page.tsx
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  body: z.string().min(10, '本文は10文字以上必要です')
});

async function createPost(formData: FormData) {
  'use server';
  
  const result = PostSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body')
  });
  
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  
  // 成功時の処理
  return { success: true };
}
```

---


# よくある質問

## Q: 既存のSPAプロジェクトはどうする？
A: 段階的に移行可能！新機能からRSCで実装

## Q: APIが本当に不要？
A: 外部連携やモバイルアプリ用には必要。でもフロントエンドとバックエンド間では不要！

## Q: 学習コストは？
A: SPAを知っていれば1週間で基本をマスター

## Q: デメリットは？
A: Node.jsサーバーが必要（Vercelなどで解決）

---


# 参考リンク

- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Printgraph](https://printgraph.io) - RSCで作った実例

## スライド資料
https://github.com/polidog/slides/shizuoka-tech
