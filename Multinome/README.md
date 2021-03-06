Multi nome
===============
### [Multi nome](https://ryusei-jp-y.github.io/portfolio/Multinome/index.html)
## 概要
PWAを導入したメトロノームのWebアプリケーションです。メトロノームには、基本的な機能としてテンポを設定する機能とそれに合わせて一定のリズムで音を再生する機能を持たせています。更に、既存のメトロノームアプリには無かった機能として、テンポに合わせてモバイル端末を振動させる機能も持たせています（AndroidOSのみの機能です）。

本Webアプリではモバイル端末で利用しやすいようPWAを導入しているため、ネイティブアプリのように利用することが可能です。また、OSやブラウザごとに動作の違いはありますが基本的な機能に関してはクロスプラットフォーム対応です。詳細な動作環境に関しては以下の[動作環境](#動作環境)に記載しています。

![Multi nome アイコン](image/appicon192x192.png)

## 構成
本作品のファイル構成は以下の通りです。
```
Multinome
├── README.md
├── favicon.ico
├── index.html
├── nome.css
├── manifest.json
├── nome.js
├── register_sw.js
├── serviceworker.js
├── image
│   ├── appicon*.png（省略）
│   ├── soundicon.png
│   └── vibicon.png
└── vue
    ├── vue.js
    └── vue.min.js
```

## 使用言語等
本作品を作成するにあたり使用した言語、技術は以下の通りです。
* JavaScript
  - vue.js
* HTML5
* CSS3

## 動作環境
各OSでの動作、推奨環境は以下の通りです。
* AndroidOS
  - GoogleChrome（推奨）
  - Firefox
* iOS（振動機能未対応）
  - GoogleChrome
  - Firefox
  - safari（推奨）
  
本アプリはWebブラウザ上で動作するため、基本的な機能は全ての環境で利用することが可能です。しかし、テストが不十分であるため動作確認ができていないOS,ブラウザがあります。また、ブラウザにより端末にインストールができない場合があります。
