function init() {
  var number = 0;
  var csvtext;

  function prepare(n) {
    var tn = csvtext[n];
    for (var id of ["text", "image", "back_image"]) {
      document.getElementById(id).innerHTML = tn[id];
    }
    document.getElementById("image").setAttribute("src", "image/" + tn.image);
    document.getElementById("back_image").setAttribute("src", "back_image/" + tn.back_image);
  }

  function backP() {
    number = Math.max(0, number - 1);
    prepare(number);
  }

  function nextP() {
    number = Math.min(number + 1, csvtext.length - 1);
    prepare(number);
  }
  fetch("./text.csv").
  then(function(resp) {
    return resp.text().then(function(text) {
      csvtext = new CSV(text, {
        header: true
      }).parse();
      prepare(0);
    });
  });
  document.getElementById("backP").addEventListener("click", backP);
  document.getElementById("nextP").addEventListener("click", nextP);
}
window.onload = init;

//ポップアップをキー入力で閉じる操作
document.addEventListener('keydown', (event) => {
  //エスケープを押したらっていう操作がキーコードで指定するやり方しか分からなかった
  if (event.keyCode == 27) {
    $('.js-modal').fadeOut();
  return false;}
});
//ポップアップをキー入力で閉じる操作ここまで