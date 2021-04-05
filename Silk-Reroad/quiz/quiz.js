function init() {
  var number = 0; // Current quiz Number
  var csvquestion; // Questions read from "quiz.csv"

  function prepare(n) { // Prepare Question Page of Number n
    var qn = csvquestion[n];
    for (var id of ["title", "q", "choice0", "choice1", "choice2"]) {
      document.getElementById(id).innerHTML = qn[id];
    }
    document.forms[0].reset(); // Reset radio buttons
  }

  function judge() {
    var input = document.forms[0].q1.value;
    var selection = parseInt(input);
    var q = csvquestion[number];
    var ans = q.a;
    var output = document.getElementById("output");
    output.innerHTML = "";
    if (input == "") {
      alert('ボタンが選択されていません。');
      return;
    } else if (selection == ans) {
      output.innerHTML = "正解です: "
    } else {
      output.innerHTML = "不正解です: ";
    }
    output.innerHTML += q["comment" + selection];
  }

  function prev() {
    number = Math.max(0, number - 1);
    prepare(number);
  }

  function next() {
    number = Math.min(number + 1, csvquestion.length - 1);
    prepare(number);
  }
  fetch("./quiz.csv").
  then(function(resp) {
    return resp.text().then(function(text) {
      csvquestion = new CSV(text, {
        header: true
      }).parse();
      prepare(0);
    });
  });
  document.getElementById("judge").addEventListener("click", judge);
  document.getElementById("prev").addEventListener("click", prev);
  document.getElementById("next").addEventListener("click", next);
  // prepare(0);
}
window.onload = init;
