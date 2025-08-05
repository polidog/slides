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
    font-size: 1.4em;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  h2 {
    font-size: 1.1em;
    margin-top: 0;
    margin-bottom: 0.4em;
  }
  h3 {
    font-size: 1.0em;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
  }
  p, li {
    font-size: 0.9em;
  }
  code {
    font-size: 0.8em;
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
---
<!-- _class: title -->

# React Server Components

@polidog

Shizuoka Tech #2

---

# 自己紹介

![bg right:42%](./images/polidog.jpg)

- @polidog
- パーティーハード株式会社という開発会社を経営しています。
- 清水市出身、神奈川県在住の**脱藩エンジニア**
- 4歳と0歳の男の子のパパ
- Symfony(PHP)が好き

---

# 注意事項

発表対象は、Reactちょっと知っている人向けの内容です。
React ServerComponentsの全てを網羅するものではありません。
React ServerComponentsの概要を知るためのものです。
少しでも興味を持ってもらえたら嬉しいです。

---
<!-- _class: title -->

# なぜReact Server Componentsを話すのか？


---

![bg](./images/printgraph.png)

<div class="qr-container">
  <img src="images/printgraph_qr.png" width="80px" />
</div>

---
<!-- _class: title -->

# Printgraphの開発を通じでバックエンドとフロントエンドを分離してWebAPIでつなぐ必要がないと思った

---
<!-- _class: title -->

# つまりPHPやRubyでバックエンドを作る時代が終わる

---

# そもそもReact Server Componentsとは？

- サーバ側で実行されるReactコンポーネント                 
- **データベースなどの内部APIに直接アクセス可能**         
- クライアント側では、JavaScriptを実行せずにHTMLを表示    
- ブラウザ向けのバンドルされたjsのサイズが軽減できる      

---

# React Server Componentsによって変わるwebアプリケーション開発

- React Server ComponentsによってPHPやRubyなどで作ってたバックエンドサーバがいらなくなる
- WebAPI( )などの仕様をバックエンド担当/フロントエンド担当で分離しなくてもいい
- APIの仕様による人間のコミュニケーションなどがなくなって、開発速度があがる

---

# 今日話すこと

- React Server Componentsとは？
- React Client Componentsとの違い
- Server Actionsの紹介
- Server Componentsのメリット, デメリット
- まとめ

---

---

# React Server Componentsとは？

- サーバ側で実行されるReactコンポーネント
- **データベースなどの内部APIに直接アクセス可能**
- クライアント側では、JavaScriptを実行せずにHTMLを表示
- ブラウザ向けのバンドルされたjsのサイズが軽減できる

--- 

# 従来のReact(Client Component)では...

```tsx
// 従来のReact（Client Component）
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then((data: Post[]) => setPosts(data));
  }, []);
  
  return <div>{/* ... */}</div>;
};
```

---

# React Server Componentsなら...

```tsx
// Server Component - APIエンドポイント不要！
import { db } from '@/lib/db';

interface Post {
  id: number;
  title: string;
  content: string;
}

async function Posts() {
  // サーバー側で直接データベースにアクセス
  const posts = await db.query<Post[]>('SELECT * FROM posts');
  
  // HTMLとして配信される（JavaScriptは送信されない）
  return (
    <div>
      {posts.map((post) => (
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

# SSR（Server Side Rendering）との違い

| 項目 | SSR | Server Components |
|---|---|---|
| レンダリング | 初回のみサーバー側 | 常にサーバー側 |
| JavaScript | 全てのコードが送信 | Server Componentのコードは送信されない |
| Hydration | 必要（サーバーとクライアントで同じコードを実行） | 不要（Server Componentはハイドレーションしない） |
| 状態管理 | 可能 | Server Component内では不可 |
| パフォーマンス | 初回表示は速いが、JSバンドルは大きい | 初回表示速く、JSバンドル小さい |


---

# SSR（Next.js Pages Router)
```tsx
// pages/posts.tsx - SSRの例
import { GetServerSideProps } from 'next';
import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Props {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const posts = await db.query<Post[]>('SELECT * FROM posts');
  return { props: { posts } };
}

export default function Posts({ posts }: Props) {
  const [likes, setLikes] = useState(0);
  // このコンポーネント全体がクライアントに送信される
  return <div>...</div>;
}
```

---

# Server Components
```tsx
// app/posts/page.tsx - Server Componentの例
import { db } from '@/lib/db';

interface Post {
  id: number;
  title: string;
  content: string;
}

async function Posts() {
  const posts = await db.query<Post[]>('SELECT * FROM posts');
  // このコンポーネントはサーバーで実行され、HTMLのみ送信
  return <div>...</div>;
}
```

---

# React Client Componentsとの違い

|  | Server Components | Client Components |
|---|---|---|
| 実行場所 | サーバー | ブラウザ |
| JavaScript | 送信されない | 送信される |
| 状態管理 | ❌ | ⭕️ (useState, useEffect) |
| イベント処理 | ❌ | ⭕️ (onClick等) |
| DB/ファイル | ⭕️ 直接アクセス | ❌ APIが必要 |

---

# Server Componentsの書き方

```tsx
// app/posts/page.tsx
// デフォルトでServer Component
import { db } from '@/lib/db';

interface Post {
  id: number;
  title: string;
  content: string;
}

async function PostList() {
  // サーバー側でデータベースに直接アクセス
  const posts = await db.query<Post[]>('SELECT * FROM posts');
  
  return (
    <div>
      {posts.map((post) => (
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

# Client Componentsの書き方

```tsx
// app/components/LikeButton.tsx
'use client'; // この宣言が必要

import { useState } from 'react';

interface LikeButtonProps {
  postId?: number;
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  
  return (
    <button onClick={() => setLikes(likes + 1)}>
      いいね！ {likes}
    </button>
  );
}
```

---

# Server ComponentsとClient Componentsの組み合わせ

```tsx
// Server Component (app/posts/[id]/page.tsx)
import { db } from '@/lib/db';
import LikeButton from '@/components/LikeButton';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Props {
  params: { id: string };
}

async function PostDetail({ params }: Props) {
  const post = await db.query<Post>(
    'SELECT * FROM posts WHERE id = ?', 
    [params.id]
  );
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Client Componentを組み込む */}
      <LikeButton postId={post.id} />
    </article>
  );
}
```

---

# 組み合わせの設計パターン①：メインコンテンツとインタラクション

```tsx
// app/products/[id]/page.tsx - Server Component
import { ProductInfo, ReviewList } from '@/components/server';
import { AddToCartButton, ReviewForm } from '@/components/client';

interface Props {
  params: { id: string };
}

async function ProductPage({ params }: Props) {
  // メインの商品情報はサーバーで取得（SEO重要・初期表示必須）
  const product = await db.query<Product>(
    'SELECT * FROM products WHERE id = ?', 
    [params.id]
  );
  const reviews = await db.query<Review[]>(
    'SELECT * FROM reviews WHERE product_id = ?', 
    [params.id]
  );
  
  return (
    <div>
      <ProductInfo product={product} />           {/* Server Component */}
      <AddToCartButton productId={product.id} />  {/* Client Component - ユーザー操作 */}
      <ReviewList reviews={reviews} />             {/* Server Component */}
      <ReviewForm productId={product.id} />       {/* Client Component - フォーム入力 */}
    </div>
  );
}
```

---

# 組み合わせの設計パターン②：段階的な情報読み込み

```tsx
// app/dashboard/page.tsx - Server Component
import { getUser, getCriticalStats } from '@/lib/api';
import { StatsSummary } from '@/components/server';
import { DetailedCharts, RealtimeNotifications } from '@/components/client';

interface User {
  id: string;
  name: string;
}

async function Dashboard() {
  // 重要な初期データはサーバーで取得
  const user = await getUser();
  const criticalStats = await getCriticalStats(user.id);
  
  return (
    <div>
      <h1>{user.name}のダッシュボード</h1>
      <StatsSummary stats={criticalStats} />      {/* Server Component */}
      
      {/* 詳細データはClient Componentで遅延読み込み */}
      <DetailedCharts userId={user.id} />         {/* Client Component */}
      <RealtimeNotifications userId={user.id} />  {/* Client Component */}
    </div>
  );
}

// components/client/DetailedCharts.tsx
'use client';
import { useState, useEffect } from 'react';
import { fetchDetailedStats } from '@/lib/api';

interface Props {
  userId: string;
}

export function DetailedCharts({ userId }: Props) {
  // ユーザー操作や時間経過で追加データを取得
  const [chartData, setChartData] = useState<ChartData | null>(null);
  
  useEffect(() => {
    // 初期表示後に詳細データを取得
    fetchDetailedStats(userId).then(setChartData);
  }, [userId]);
  
  return chartData ? <Chart data={chartData} /> : <Skeleton />;
}
```

---

# Server/Client Componentsの境界設計のベストプラクティス

- Server Componentsで処理すべきもの
  - **SEOが重要なメインコンテンツ**（記事本文、商品情報）
  - **初期表示に必須のデータ**（ユーザー情報、ページタイトル）
  - **重いデータ処理**（マークダウン変換、データ集計）
  - **機密情報を扱う処理**（API キー、データベース接続）
- Client Componentsで処理すべきもの
  - **ユーザーインタラクション**（クリック、フォーム入力）
  - **リアルタイム更新**（チャット、通知）
  - **ブラウザAPI使用**（位置情報、カメラ）
  - **副次的な情報の遅延読み込み**（関連商品、詳細グラフ）

--- 

# 重要な原則

- **「ページの主要な情報はServer Componentsで、インタラクティブな要素はClient Componentsで」**

---

# Server Actionsとは？

- フォーム送信やデータ更新をサーバー側で処理
- クライアント側のJavaScriptなしでも動作
- プログレッシブエンハンスメント対応

---

```tsx
// app/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  await db.query(
    'INSERT INTO posts (title, content) VALUES (?, ?)', 
    [title, content]
  );
  
  redirect('/posts');
}
```

---

# Server Actionsの使用例

```tsx
// app/posts/new/page.tsx (Server Component)
import { createPost } from '@/app/actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="タイトル" required />
      <textarea name="content" placeholder="内容" required />
      <button type="submit">投稿する</button>
    </form>
  );
}
```

---

# Client ComponentでのServer Actions

```tsx
'use client';
import { useFormStatus } from 'react-dom';
import { createPost } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? '送信中...' : '投稿する'}
    </button>
  );
}

export default function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="タイトル" />
      <textarea name="content" placeholder="内容" />
      <SubmitButton />
    </form>
  );
}
```

---

# 実際のユースケース①：ブログサイト

```tsx
// app/page.tsx - トップページ（Server Component）
import { db } from '@/lib/db';
import { CategoryList, PostGrid } from '@/components/server';
import { NewsletterForm } from '@/components/client';

interface Post {
  id: number;
  title: string;
  created_at: Date;
}

interface Category {
  id: number;
  name: string;
}

async function HomePage() {
  const recentPosts = await db.query<Post[]>(
    'SELECT * FROM posts ORDER BY created_at DESC LIMIT 10'
  );
  const categories = await db.query<Category[]>('SELECT * FROM categories');
  
  return (
    <main>
      <CategoryList categories={categories} />
      <PostGrid posts={recentPosts} />
      <NewsletterForm /> {/* Client Component */}
    </main>
  );
}
```

初期表示が高速で、SEOにも有利！

---

# 実際のユースケース②：ECサイトの商品詳細

```tsx
// app/products/[id]/page.tsx
import { getProduct, getReviews, getRelatedProducts } from '@/lib/api';
import { ProductInfo, ReviewList, RelatedProducts } from '@/components/server';
import { AddToCartButton } from '@/components/client';

interface Props {
  params: { id: string };
}

async function ProductDetail({ params }: Props) {
  // 複数のデータソースから並列取得
  const [product, reviews, relatedProducts] = await Promise.all([
    getProduct(params.id),
    getReviews(params.id),
    getRelatedProducts(params.id)
  ]);
  
  return (
    <>
      <ProductInfo product={product} />
      <AddToCartButton productId={product.id} /> {/* Client */}
      <ReviewList reviews={reviews} />
      <RelatedProducts products={relatedProducts} />
    </>
  );
}
```

---

# Server Componentsのメリット

- パフォーマンスの向上
  - **バンドルサイズの削減** - サーバー側のコードはクライアントに送信されない
  - **初期表示の高速化** - データ取得とレンダリングがサーバー側で完結
- 開発効率の向上
  - **APIエンドポイントの削減** - データベースに直接アクセス可能
  - **セキュリティの向上** - APIキーや機密情報をクライアントに露出しない
- SEOの改善
  - **完全なHTMLの配信** - 検索エンジンがコンテンツを正しく認識

---

# Server Componentsのデメリット

- 制限事項
  - **状態管理ができない** - useState, useEffectなどのHooksは使用不可
  - **イベントハンドラが使えない** - onClick等はClient Componentで
- 学習コスト
  - **新しい概念の理解** - Server/Client の使い分けが必要
  - **デバッグの複雑化** - サーバー側とクライアント側の切り分け
- インフラ要件
  - **Node.jsサーバーが必要** - 静的ホスティングでは使用不可

---

# Server ComponentsとClient Componentsの使い分け

- Server Componentsを使うべき場面
  - データ取得が必要なコンポーネント
  - 大きなライブラリを使用する場合（Markdown parser等）
  - 機密情報を扱う場合
- Client Componentsを使うべき場面
  - ユーザーインタラクションが必要な場合
  - ブラウザAPIを使用する場合
  - リアルタイムな状態更新が必要な場合

---

# まとめ

- React Server Componentsによって実現できること
  - **フルスタック開発の簡素化** - フロントエンドとバックエンドの境界が曖昧に
  - **パフォーマンスの最適化** - 必要最小限のJavaScriptのみクライアントへ
  - **開発体験の向上** - データ取得の記述がシンプルに
- 今後の展望
  - Next.js以外のフレームワークでも採用が進む
  - より多くのユースケースで活用される
  - エコシステムの充実

---

# 参考リンク

- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Server Components Demo](https://github.com/reactjs/server-components-demo)

