function init() {
  var limit = 1024 * 1024 * 3;
  var input = document.getElementById('audio');

  function sizeCheck() {
    var files = input.files;
    if (files[0].size > limit) {
      alert('ファイルサイズは3MB以下にしてください');
      input.value = '';
      return;
    }
  }
  input.addEventListener('change', sizeCheck);

  function send(){
    console.log(files[0].name);
  }
}
window.onload = init;
