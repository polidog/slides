---
marp: true
theme: default
paginate: true
---

<!-- _class: title -->
# 開発環境を新しくしている話

@polidog
Shizuoka Tech #1

---

<!-- _class: title -->
# ここ10年近く開発環境は変わっていなかった

---

# 現在の開発環境

| カテゴリ | ツール | 用途 |
|---------|--------|------|
| OS | Mac | すべての開発環境 |
| IDE(エディタ) | PHPStorm, VSCode | PHP開発, フロントエンド開発 |
| ターミナル | iTerm | コマンドライン作業 |

---

<!-- _class: title -->
# このままでいいのか？


---

# Vim使えるような立派なプログラマになりたい
### もう20年ぐらいvimが使えないのがコンプレックスなのでこのタイミングで解消したい


---

# そんな中で見つけたこの記事

---

# Get in losers, we're moving to Linux!

David Heinemeier Hansson の記事より
https://world.hey.com/dhh/get-in-losers-we-re-moving-to-linux-5e1b93cd

---

# Get in losers, we're moving to Linux!

## なぜ今、Linux？

開発者たちの間でLinuxへの切り替えに対する関心が急速に高まっている

3つの要因が重なって生まれた動き：
1. Linuxの大幅な改善
2. 強力なミニPCの普及  
3. Appleと開発者コミュニティとの関係悪化

---

# Get in losers, we're moving to Linux!

## Linux人気の高まりの背景

- **Linuxの大幅な改善**
  - ユーザビリティとパフォーマンスが向上
  
- **強力なミニPCの普及**
  - 手頃な価格で高性能なハードウェア
  
- **Appleへの不満**
  - 開発者コミュニティとAppleの関係が悪化

---

# Get in losers, we're moving to Linux!

## 注目すべき動向

### Arch Linuxが中心的存在
新しいLinuxユーザーの多くがArch Linuxに注目

### インフルエンサーの影響
- PewDiePie（YouTuber）
- ThePrimeagen（開発者）
- Typecraft（コンテンツクリエイター）
- Gabe Newell（ValveのCEO、Steam Deck推進）

---

# Get in losers, we're moving to Linux!

## 具体的な成果

### ゲーム対応
Protonを通じて**20,000以上**のゲームがLinuxで動作可能
  m
### 豊富なソフトウェア
Arch User Repository（AUR）に**90,000以上**のパッケージ

---

# Get in losers, we're moving to Linux!

## 結論

> 大きな変化が起きる窓が開いている。
> 最初は徐々に、そして突然に。
> Linux界隈に朝が来たような感覚だ！

**ただし...**
Linuxは依然としてニッチな存在
AppleとMicrosoftが市場シェアを支配している現実も

---

# Get in losers, we're moving to Linux!
## まとめ

- 開発者コミュニティでLinuxへの関心が高まっている
- 技術的・経済的な条件が整いつつある
- インフルエンサーたちも後押し
- でも、まだメインストリームには遠い

**あなたはどう思う？**

---

<!-- _class: title -->
# omakub
https://omakub.org/

---
# omakubとは？

**Omakub** - Ubuntu 24.04+向けの開発環境セットアップツール

- DHH（Ruby on Rails作者）が作成
- **1コマンドでUbuntuを完全な開発環境に変換**
- 美しくモダンな開発システムを即座に構築
- Linux初心者でも使いやすい統一された環境

「おまかせ」の精神で厳選されたツール群を提供


---


# 自分はどういう行動を取ったのか？

- Windows laptopマシンにubuntuを入れてomakubで環境構築
- Mac Book ProにLazyvim, Zellij, Alacrittyなどomakubと同じような環境を用意する
- もちろん開発もlazyvimで行うようにしている(Symfonyのプロジェクト以外)

---

# AI時代だからこそターミナル中心の開発を

- Claude Codeな時代だからこそターミナル中心な開発環境
- LinuxとMacではそこまで差がでないので違和感なく使える
- lazyvimはまじでIDE
- lazyvimの操作方法、zellijの使い方、わからないことはみんなCalude(or ChatGPT)に聞けば解決できる？

---

# あなたもLinux中心な開発環境にしませんか？


