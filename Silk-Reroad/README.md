Silk-Re:road
===============
### [Silk-Re:road](https://ryusei-jp-y.github.io/portfolio/Silk-Reroad/index.html)
## 概要
東北公益文科大学が地元地域と連携し、情報の観点から地域活性化を図るプロジェクト(Shonai Koueki Infomation Project)の一環として作成したWebサービス（デモ版）です。本サービスは以下の4つのパートで構成されており、それらがシナリオゲーム風に進行していく中で「松が丘開墾場（山形県鶴岡市）」の歴史的情報や観光情報を楽しみながら知ることができます。

#### 構成パート一覧
* シナリオパート
    - 物語を進めていくパート
* マップパート
    - 位置情報を用いて実際に歩いて松ヶ岡開墾場を体験するパート
* VRパート
    - 360°パノラマ画像を用いて実際の景色を体感することができるパート
* クイズパート
    - それまでの物語等で得た知識を用いてクイズを行うパート
<img src="image/mashiro.PNG" alt="ましろちゃん" width="300">

## 構成
本作品のファイル構成は以下の通りです。（一部省略）
```
Silk-Reroad
├── README.md
├── bgm_sample.mp3
├── index.html
├── yousan.css
├── yousan.js
├── text.csv
├── text.ods
├── loading.gif
├── title.PNG
├── back_image
│   └── room.jpg
├── image
│   ├── back.png
│   ├── mashiro.PNG
│   └── next.png
├── lib
│   └── csv.min.js
├── map
│   ├── パノラマ画像表示.html（省略）
│   ├── panorama.css
│   ├── panorama.js
│   ├── skip.css
│   ├── skip.geojson
│   ├── vrmap.html
│   ├── vrmap.js
│   ├── 360picture
│   │   └── 360度画像.JPG（省略）
│   ├── aframe-master
│   │   └── A-Frame設定ファイル（省略）
│   └── src
│       └── leaflet設定ファイル（省略）
└── quiz
    ├── mashiro.PNG
    ├── quiz.css
    ├── quiz.csv
    ├── quiz.html
    ├── quiz.js
    └── lib
        └── csv.min.js

```

## 使用言語等
本作品を作成するにあたり使用した言語、技術は以下の通りです。
* JavaScript
  - leaflet.js
  - jQuery
* HTML5
  - A-Frame
* CSS3

## 動作環境
インターネット接続,GPS受信が可能なモバイル端末で利用することができます。
