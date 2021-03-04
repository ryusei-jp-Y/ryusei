function init() {
  var limit = 1024 * 1024 * 3;
  var fileInput = document.getElementById('audio');

  function sizeCheck() {
    var files = fileInput.files;
    if (files[0].size > limit) {
      alert('ファイルサイズは3MB以下にしてください');
      input.value = '';
      return;
    }
  }
  fileInput.addEventListener('change', sizeCheck;

  function send(){
    console.log(files[0].name);
  }
  document.getElementById('submit').addEventListener('onclick',send
}
window.onload = init;
