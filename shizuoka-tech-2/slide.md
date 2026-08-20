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
  /* タイトルページ内の画像（QRコードなど）を中央揃え */
  section.title img {
    display: block;
    margin: 0 auto;
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
  /* アーキテクチャ図 */
  .arch {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    margin-top: 0.8em;
    font-size: 0.72em;
    text-align: center;
    line-height: 1.35;
  }
  .arch-row {
    border: 2px solid #999;
    border-radius: 0.4em;
    padding: 0.4em 0.6em;
    background: #f7f7f7;
  }
  .arch-arrow {
    color: #888;
    font-size: 0.85em;
    line-height: 1;
  }
  .arch-relayer {
    border: 3px solid #2b6cb0;
    border-radius: 0.4em;
    padding: 0.45em 0.6em;
    background: #ebf4ff;
  }
  .arch-label {
    font-weight: bold;
    color: #2b6cb0;
    margin-bottom: 0.35em;
  }
  .arch-cols {
    display: flex;
    gap: 0.35em;
  }
  .arch-cols + .arch-cols {
    margin-top: 0.35em;
  }
  .arch-cols > div {
    flex: 1;
    border: 1.5px solid #2b6cb0;
    border-radius: 0.3em;
    padding: 0.35em 0.4em;
    background: #fff;
  }
  .arch-cols > .arch-usephp {
    border-color: #ff6b6b;
    background: #fff3cd;
    font-weight: bold;
  }
---
<!-- _class: title -->

# RelayerというPHPのフレームワークを作った

@polidog

Shizuoka Tech #2

---

# 自己紹介

![bg right:42%](./images/polidog.jpg)

- @polidog
- Webアプリケーション開発者
- パーティーハード株式会社という開発会社を経営しています。
- 清水市出身、神奈川県在住
- 5歳と1歳の男の子のパパ

---

<!-- _class: title -->
# 去年、React Server Componentsの話をしました

<p style="text-align: center;">https://speakerdeck.com/polidog/react-server-components</p>

<div class="qr-container">

![w:200](./images/qr-rsc-speakerdeck.png)

</div>

---

<!-- _class: title -->
# RSC（Next.js）を推してたのに、なんで今年はPHPのフレームワーク？

---

# Next.jsは好き。でも、しんどくなってきた

- npmパッケージが重い。node_modulesと依存更新に疲れた
- RSCはサーバーで動く。ブラウザ前提のパッケージは `window is not defined` で壊れるし、常駐プロセスなのでモジュール内にstateを持つライブラリはメモリリークの温床になる
- PHPならFrankenPHPでシングルバイナリ化までできる。デプロイはファイル1個
- そして今のPHPは普通にモダン。型も静的解析も常駐ランタイムもある

### だったら、あの開発体験をPHPで作ればいいのでは？

---

<!-- _class: title -->

# 今こそ、Hypertext Preprocessorとしての PHPの価値を見直すべきでは？

<p style="text-align: center; color: #666;">PHPは最初から、ハイパーテキストを作るための言語だった</p>

---

# 今のPHPフレームワークへの不満

## Controllerで値を集めて、viewに渡す。以上。

- MVCの構造は20年ずっと変わっていない
- Twig / Bladeはしょせんテンプレートエンジンで、JSX/TSXの表現力に勝てない
- コンポーネント指向で書けないから、結局「SPA + API」構成に逃げがち

---

<!-- _class: title -->
# コア技術のusePHP

### ReactライクにPHPを書けるようにするライブラリ。まずはここから

---

# ReactライクにかけるPHP、usePHP

## 独自拡張子 `.psx`

```php
// src/Pages/page.psx
return fn () => (
    <section className="card">
        <h1>It works</h1>
        <p>これは {date('Y')} 年のページです。</p>
    </section>
);
```

- `{ ... }` でPHP式を埋め込み、PascalCaseタグはコンポーネント
- `className` はReact流（`class` に自動変換）
- コンパイルすると `H::section(...)` のPHPコードに変換される

---

# コンパイルするとこうなる

```php
// コンパイル前（.psx）
return fn () => (
    <section className="card">
        <h1>It works</h1>
        <p>これは {date('Y')} 年のページです。</p>
    </section>
);
```

```php
// コンパイル後
return fn () => H::section(className: 'card', children: [
    H::h1(children: 'It works'),
    H::p(children: ['これは ', date('Y'), ' 年のページです。']),
]);
```

### 魔法じゃない。属性は名前付き引数、子要素は `children` のただの関数呼び出し

---

# コンポーネントは関数スタイルとクラススタイル

```php
// 関数スタイル — src/Components/Card.psx
return fn (array $props) => (
    <div className="card">
        <h3>{$props['title']}</h3>
        <div>{$props['children'] ?? null}</div>
    </div>
);
```

```php
// クラススタイル — コンストラクタで依存が自動注入される
final class UserDetailPage extends PageComponent
{
    public function __construct(private readonly UserRepository $users) {}
    public function render(): Element
    {
        return <h1>{$this->users->find($this->getParam('id'))->name}</h1>;
    }
}
```

- どちらもPascalCaseタグで使える。propsは連想配列、子要素は `children`。シンプルなら関数、依存が多ければクラス

---

# 条件分岐もループも、ただのPHP式

## Twig/Bladeのような専用構文（`{% if %}` / `@foreach`）はない

- 条件分岐 → 値を返す三項演算子で書く

```php
{$loggedIn ? <a href="/logout">Logout</a> : <a href="/login">Login</a>}
```

- ループ → 要素の配列を返す `array_map` で書く

```php
<ul>{array_map(fn ($x) => <li>{$x['name']}</li>, $items)}</ul>
```

### JSXと同じ流儀。`{ }` に書けるのは式だけ。新しいテンプレート構文を覚えなくていい

---

# useStateもある

```php
return fc(function () {
    [$count, $setCount] = useState(0);
    return (
        <div>
            <span>Count: {$count}</span>
            <button onClick={fn () => $setCount($count + 1)}>+</button>
        </div>
    );
});
```

- `fc()` でラップした関数コンポーネントの中でだけHooksが使える
- セッターは `onClick` に紐づく。実体はサーバーへのリクエスト

### 見た目はReactのカウンター。でも状態はサーバー側にある

---

# useEffectと状態の保存先

```php
useEffect(function () use ($tab) {
    error_log("tab: {$tab}");
    return fn () => error_log('cleanup');
}, [$tab]); // $tabが変わったときだけ実行
```

- depsの意味はReactと同じ：`null` は毎回、`[]` は初回だけ、値は変更時
- `useRouter()` で現在URLや `[id]` の動的セグメントも取れる

| StorageType | 状態の保存先 |
|---|---|
| `Session`（既定） | サーバーセッション。ページ遷移をまたいで残る |
| `Memory` | リクエストごとにリセット |
| `Snapshot` | 署名付きでHTMLに埋め込む（サーバーはステートレス） |

---

# 複雑なUIは本物のReactで書ける（React Islands）

```php
use Polidog\Relayer\React\Island;
return fn () => (
    <section>
        {Island::mount('Chart', ['points' => $data])}
    </section>
);
```

```js
// クライアント側でコンポーネントを登録
window.relayerIslands.register('Chart', (el, props) => {
    createRoot(el).render(<Chart {...props} />);
});
```

- チャートやエディタなど、複雑なUIが必要な場所だけReactをマウントできる。propsは `data-react-props` にJSONで渡る

---

<!-- _class: title -->
# このusePHPを核にしたフルスタックフレームワークが、Relayer

---

# Relayer

## Next.js App Router風の規約で書けるPHPフルスタックフレームワーク

- ルーティング・API・認証・キャッシュ・DBをひとつのbootエントリにまとめる規約重視の設計
- `src/Pages/` のディレクトリ構成がそのままURLになる（`[id]` は動的セグメント）
- ビュー層にusePHPを使うので、すべてコンポーネントで書ける
- Server Actionsみたいな機構がある

```bash
composer require polidog/relayer
vendor/bin/relayer init
php -S 127.0.0.1:8000 -t public
```

---

# Relayerの技術構成

<div class="arch">
  <div class="arch-row"><strong>ブラウザ</strong> — HTML + usephp.js（プログレッシブエンハンスメント）/ React Islands</div>
  <div class="arch-arrow">▲▼ HTTP</div>
  <div class="arch-row"><strong>CDN</strong> — Defer + Cache-Control でキャッシュを最大化</div>
  <div class="arch-arrow">▲▼</div>
  <div class="arch-relayer">
    <div class="arch-label">Relayer 本体（PHP）</div>
    <div class="arch-cols">
      <div><strong>ルーティング</strong><br>src/Pages/ がそのままURLに</div>
      <div><strong>Server Actions</strong><br>フォーム処理 + CSRF自動</div>
      <div><strong>Validation</strong><br>Zodライクなスキーマ検証</div>
    </div>
    <div class="arch-cols">
      <div class="arch-usephp"><strong>usePHP</strong> — .psx をPHPコードにコンパイルするビュー層（← さっき説明したやつ）</div>
    </div>
  </div>
  <div class="arch-arrow">▲▼ SQL</div>
  <div class="arch-row"><strong>Tehilim</strong> — スキーマファーストなDBツールキット（後半で解説）</div>
</div>

---

# ディレクトリがそのままURLになる

```
src/Pages/
├── layout.psx          # 全ページ共通レイアウト
├── page.psx            # /
├── users/
│   ├── page.psx        # /users
│   └── [id]/page.psx   # /users/42
├── (admin)/            # URLに出ないグループ化
└── _private/           # ルーティング対象外
```

- `layout.psx` は階層ごとに重なる。Next.jsのlayoutと同じ感覚
- URLの衝突は初回リクエストではなく `routes:compile` 時にエラーになる

---

# APIは route.php を置くだけ

```php
// src/Pages/api/users/route.php
return [
    'GET'  => fn (UserRepository $users): Response
        => Response::json(['users' => $users->all()]),
    'POST' => function (Request $req, UserRepository $users): Response {
        $users->create($req->allPost());
        return Response::json(['ok' => true], 201);
    },
];
```

- HTTPメソッドをキーにしたハンドラマップを返すだけ
- 引数の型を見て Request・サービス・PageContext が自動で注入される

---

# Server Actionsみたいな機構もある

```php
return function (PageContext $ctx, UserRepository $users): Closure {
    $save = $ctx->action('save', function (array $form) use ($users, $ctx): void {
        $users->create($form['name']);
        $ctx->redirect('/users'); // 303 See Other
    });

    return fn () => (
        <form action={$save}>
            <input name="name" />
            <button>save</button>
        </form>
    );
};
```

### フォーム処理をクロージャで直接書く。APIエンドポイントは不要、CSRFも自動

---

# Zodライクなバリデーションが標準装備

```php
use Polidog\Relayer\Validation\Validator;

$schema = Validator::object([
    'email' => Validator::string()->trim()->email(),
    'name'  => Validator::string()->trim()->min(1, '名前は必須です。'),
    'age'   => Validator::int()->min(0)->optional(),
]);

$result = $schema->safeParse($form);
if (!$result->success) {
    $errors = $result->errors; // フィールド単位のエラー
    return; // 同じページを再描画
}
```

### 失敗したらそのまま再描画、成功したらPRG。Server Actionsと相性がいい

---

# 認証もビルトイン

```php
// クラススタイル — 属性でページ保護。#[Auth(roles: ['admin'])] でロール必須も
#[Auth]
final class DashboardPage extends PageComponent { /* ... */ }
```

```php
// 関数スタイル — requireAuth()。未認証ならリダイレクト
return function (PageContext $ctx): Closure {
    $user = $ctx->requireAuth(); // requireAuth(['admin']) でロール必須
    return fn () => <h1>ようこそ {$user->displayName}</h1>;
};
```

- `UserProvider` を実装してDIに登録すると `$auth->attempt($email, $password)` でログインできる
- セッションログインもトークン認証（Firebase / Cognito）も、同じ仕組みで書ける

---

# Deferコンポーネント

## 「ログイン名だけ動的」なページ、CDNに乗せられますか？

- セッションを使うと `Set-Cookie` が付き、ページ丸ごとキャッシュ不可に

```php
return fc(
    fn (array $props) => <UserHeader />,
    defer: new Defer(name: 'user-header', cacheControl: 'private, no-store'),
);
```

- ページには `<UserHeaderDeferred fallback={<HeaderSkeleton />} />` と置く
- SSR時はfallbackだけ描画 → あとから `GET /_defer/user-header` で本体を取得
- ページ本体はCDNキャッシュ、この部分だけ `private, no-store`

### 動的な部分だけを切り出せば、ページは丸ごとCDNに乗る

---

# Deferはクライアント側でもキャッシュできる

## localStorageにキャッシュ（opt-in）

```php
#[Defer(name: 'feed', localCache: true, localCacheTtl: 60)]
```

- リロード・タブをまたいで保持される
- `localCacheTtl`（秒）で有効期限を指定 — HTTPの `Cache-Control` とは独立
- キャッシュ破棄は `DEFER_CACHE_VERSION` のバンプ or `clearDeferCache()`

### CDNとブラウザの2層キャッシュで、動的部分の再取得も最小限にできる

---

# 細かいところもひととおり揃えてある

- HTTPキャッシュ — ページ単位で `Cache-Control` / ETagを宣言。`If-None-Match` が一致すれば描画もDBアクセスもせず304
- セッションは遅延起動 — 状態を触らないページは `Set-Cookie` を吐かないのでCDNに乗る
- i18n — 依存ゼロの多言語化。ロケール解決はURLプレフィックス → セッション → Cookie → Accept-Language
- ミドルウェア / CORS / HTTPクライアント / ロガー
- ページ単位のJS読み込み — `$ctx->js('/assets/chart.js', defer: true)`
- サービスはSymfony DIコンテナでオートワイヤ
- プロファイラ（dev環境限定）、CLIコマンド、.envカスケード

### 全部ドキュメントに書いてあります → https://relayer.polidog.jp/

---

<!-- _class: title -->
# DBを支えるTehilim

---

# スキーマファーストなDBツールキット、Tehilim

- 同じく自作の、Prisma風ワークフローのDBツールキット
- 方針は「データは連想配列、型はPHPDoc」。ORMのクラスマッピングはしない
- 型安全はPHPStanに委ねる、静的解析前提の設計

```bash
composer require polidog/tehilim
vendor/bin/tehilim init                    # スキーマ生成
vendor/bin/tehilim generate                # 型付きクライアント生成
vendor/bin/tehilim migrate dev --name init # マイグレーション実行
```

### スキーマから型付きクライアントを生成して使う

---

# schema.tehilim にスキーマを書く

```
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
```

### ほぼPrismaのschema。`?` でnull許可、`@relation` でリレーション

---

# クエリもPrisma風

```php
$found = $db->user->findUnique(['where' => ['email' => 'alice@example.com']]);

$posts = $db->post->findMany([
    'where' => [
        'OR' => [
            ['title' => ['contains' => 'PHP']],
            ['body'  => ['contains' => 'PHP']],
        ],
        'published' => true,
    ],
    'orderBy' => ['createdAt' => 'desc'],
    'take'    => 20,
]);
```

- `findUnique` / `findMany` / `insert` など、`where` 演算子も `select` / `include` もPrisma流

---

# 連想配列なのにPHPStanで型が見える

```php
$row = $db->user->findUnique([
    'where'  => ['id' => 1],
    'select' => ['email', 'name'],
]);
// PHPStanにはこう見えている:
// array{email: string, name: string|null, id: int}|null

echo $row['email']; // OK
echo $row['age'];   // PHPStanがエラーにする
```

- 行データはプレーンな連想配列で、型情報は `@phpstan-type` で供給する
- PHPStan拡張が `select` の内容から戻り値のarray shapeを絞り込む

---

# RelayerとTehilimの連携

```php
final class UsersPage extends PageComponent
{
    public function __construct(private readonly TehilimClient $db) {}

    public function render(): Element
    {
        $users = $this->db->user->findMany([
            'include' => ['posts' => ['where' => ['published' => true]]],
        ]);
        return <ul>{array_map(fn($u) => <li>{$u['name']}</li>, $users)}</ul>;
    }
}
```

- 型付きクライアントをDIで注入して使う。`include` でリレーションも取れる
- プロファイラはdev環境だけ注入するので、本番コードに計測機構が載らない

---

# これからはAIと一緒に書く時代

## RelayerはAI協働を前提に設計してある

- 規約は `RELAYER.md` の1ファイルに集約。ファイル規約も各種契約も「やらないこと」も全部ここ
- `AGENTS.md` / `CLAUDE.md` は2行のポインタファイルで、どのAIツールから入っても同じ規約に辿り着く
- `relayer init` で `.claude/` にrelayer-routingスキルとrelayer-reviewerサブエージェントを生成する
- 生成コードはrelayer-reviewerが規約に沿っているかチェックする

### 規約重視のフレームワークは、AIが迷わない

---

# まとめ

- PHPでもRSCみたいなコンポーネントベースの開発体験が欲しくて、Relayerを作った
  - すべてコンポーネントで書けて、Server Actionsみたいな機構もある。Defer + CDNキャッシュ
- DBはTehilim。スキーマファースト + PHPStanで型安全
- 規約重視だからAIが迷わない。AI時代を前提にしたフレームワーク

### 気になったら、一度触ってみてください

---

<!-- _class: title -->
# ぜひチュートリアルをやってみてください

### Todoアプリを作りながらRelayerを体験できます
### https://relayer.polidog.jp/docs/todo-app

---

# 参考リンク

- [Relayer Documentation](https://relayer.polidog.jp/)
- [PHPStan](https://phpstan.org/)
- [PHP Manual: session_cache_limiter](https://www.php.net/manual/en/function.session-cache-limiter.php)

---

<!-- _class: title -->
# ご清聴ありがとうございました
