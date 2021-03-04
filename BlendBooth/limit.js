function init() {
  var limit = 1024 * 1024 * 3;
  var fileInput = document.getElementById('audio');
  var fileSend = document.getElementById('submit');

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
  fileSend.addEventListener('onclick', send);
}
window.onload = init;
