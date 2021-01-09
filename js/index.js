// 画像を配列に設定
var imgList = [
    "images/img01.jpg",
    "images/img02.jpg",
    "images/img03.jpg",
    "images/img04.jpg"
];

// ----画像とドットナビの要素を自動で追加する-----------------------
for(var i = 0; i < imgList.length ; i++){
    // --画像------------------------
    // li要素を新規作成
    var slide = document.createElement("li"); 
    // li要素の中に画像タグを埋め込む
    // 完成形：<img src='image/img01.jpg'>
    slide.innerHTML = "<img src='" + imgList[i] + "'>";
    // li要素をクラス名「slider-inner」の子要素として追加
    document.getElementsByClassName("slider-inner")[0].appendChild(slide)
    // --ドットナビ--------------------
    // li要素を新規作成
    var nav = document.createElement("li");
    // プロパティ「data-nav-index」に数値を割り振る(nav = {data-nav-index: 1;})
    nav.setAttribute("data-nav-index",i); 
    // li要素をクラス名「nav」の子要素として追加
    document.getElementsByClassName("nav")[0].appendChild(nav);
}

// スライドの数を取得？
var length = imgList.length - 1;

// クラス「slider-inner」の中には4つの画像リストが入っているはずなので、それを取り出す
var imageSlide = document.getElementsByClassName("slider-inner")[0].getElementsByTagName("li");
// クラス「data-nav-index」の中には4つのドットが入っているはずなので、それを取り出す
var dotNavigation = document.getElementsByClassName("nav")[0].getElementsByTagName("li");
// 現在、◯番目の画像を表す変数
var nowIndex = 0;
// 現在表示されている画像とドットナビにクラス名をつける(class="xxxxxx")
imageSlide[nowIndex].classList.add("show");       // layout.cssのshowと対応
dotNavigation[nowIndex].classList.add("current"); // layout.cssのcurrentと対応

// アニメーション中かどうかを判断するフラグ(True:アニメーション中,False:アニメーション中ではない)
var isChanging = false;
var slideTimer;

// ----スライド切り替え時に実行する関数------------------------
function sliderSlide(val){
    // アニメーション中であればスライドの切り替えをしない
    if (isChanging === true){
        return false;
    }
    isChanging = true;

    // 切り替える→現在の画像とナビを消す→次の画像とナビを表示する
    // 現在の画像とナビを消す
    imageSlide[nowIndex].classList.remove("show");
    dotNavigation[nowIndex].classList.remove("current");
    nowIndex = val;
    // 次の画像とナビを表示する
    imageSlide[nowIndex].classList.add("show");
    dotNavigation[nowIndex].classList.add("current");

    // アニメーションが終わるタイミングでisChangingのステータスをfalseにする
    slideTimer = setTimeout(function(){
        isChanging = false;
    }, 600);

}

// ----ボタンに対するイベントリスナー------------------------
// 左矢印をクリックしたときのイベント
document.getElementById("arrow-prev").addEventListener("click",function(){
    var index = nowIndex - 1 ;
    if (index < 0){     // もし0番目のスライドから左に移るときは
        index = length; // 一番右に行ってくれ
    }
    sliderSlide(index); // スライド切り替え関数を呼び出す
},false);

// 右矢印をクリックしたときのイベント
document.getElementById("arrow-next").addEventListener("click",function(){
    var index = nowIndex + 1 ;
    if (index > length){     // もし3番目のスライドから右に移るときは
        index = 0; // 一番左に行ってくれ
    }
    sliderSlide(index); // スライド切り替え関数を呼び出す
},false);

// ドットナビをクリックしたときのイベント
for(var i = 0; i < dotNavigation.length; i++){
    dotNavigation[i].addEventListener("click",function(){
        var index = Number(this.getAttribute("data-nav-index"));
        sliderSlide(index);
    }, false);
}