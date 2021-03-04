function init() {
  var limit = 1024 * 1024 * 3;
  var fileInput = document.getElementById('audio');

  function sizeCheck() {
    var files = fileInput.files;
    if (files[0].size > limit) {
      alert('ファイルサイズは3MB以下にしてください');
      fileInput.value = '';
      return;
    }
    window.confirm(files[0].name + 'を投稿します。')
    console.log(files[0].name);
    fileInput.value = '';
  }
  fileInput.addEventListener('change',sizeCheck);
}
window.onload = init;
