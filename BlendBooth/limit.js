var limit = 1024 * 1024 * 3;
var input = document.getElementById('audio');

function sizeCheck() {
  var file = input.files;
  if (file.size > limit) {
    alert('ファイルサイズは３MB以下にしてください');
    input.value = '';
    return ;
  }
}

input.addEventListener('change',sizeCheck);
