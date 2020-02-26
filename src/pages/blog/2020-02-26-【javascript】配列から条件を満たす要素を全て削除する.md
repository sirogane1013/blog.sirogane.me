---
templateKey: blog-post
title: 【JavaScript】配列から条件を満たす要素を全て削除する
date: 2020-02-26T14:40:26.929Z
description: JavaScriptで配列から条件を満たす要素をすべて削除する方法について
featuredpost: true
featuredimage: /img/アセット 3.png
tags:
  - JavaScript
---
- 8/29 コメント欄でご指摘をいただいた通り、変数へ再代入を行っていた部分を修正しました。

## やりたいこと

配列の要素を見て行って、条件に合致するものを削除したい。

```javascript
let array = [1,2,3,4,5,6,7,8,9,10]; //5以下の数を削除したい
```

## (NGな方法)forEachとspliceを組み合わせる

下記のようなコードは正しく動作しない。

```javascript
let array = [1,2,3,4,5,6,7,8,9,10]; //5以下の数を削除したい
array.forEach((element, index) => {
    if (element <= 5) {
        array.splice(index, 1);
    }
})
document.writeln(array); // Output: 2,4,6,7,8,9,10
```
理由としては単純で、forEachで前から捜査していき、条件を満たす要素にたどり着いたとき、
![1.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/316990/39e5f137-5854-4d4c-3902-d3628d8805a6.png)
その要素は削除されて、配列の要素が1つ詰められる。
![2.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/316990/3397caef-7bc6-bde7-f66c-af33cb57e154.png)
forEachは、**上図の状態において**次の要素を参照するので、この場合2番目に処理されるのは"2"ではなく"3"になる。
![3.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/316990/7fc1732b-d837-d6b8-ee36-f173f02fec90.png)
つまり、**要素の削除が起こるとその次の要素に対する処理がスキップされる**ため、結果としてこんな配列になる。
![4.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/316990/17571af8-713f-6ea5-41db-2aded0966bf1.png)

## (正しい方法)filterを用いる
filterを使うことで正しい動作をさせることができる。ただし条件を反転する必要はある。

```javascript
const array = [1,2,3,4,5,6,7,8,9,10]; //5以下の数を削除したい
const newArray = array.filter(element => !(element <= 5));
document.writeln(newArray); // Output: 6,7,8,9,10
```
## まとめ
モダンな書き方に慣れ親しみたい

## 参考

- [Javascriptで指定した配列の要素を削除する](https://qiita.com/Sekky0905/items/598b47fea2106b8c140e)
- [Array.prototype.forEach() - JavaScript | MDN - Mozilla
](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
