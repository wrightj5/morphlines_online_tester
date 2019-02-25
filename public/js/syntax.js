window.onload = function () {
    var codeMirror = CodeMirror.fromTextArea(document.getElementById('config'), {
        mode: "yaml",
        theme: "monokai",
        lineNumbers: true,
    });
    var codeMirror = CodeMirror.fromTextArea(document.getElementById('data'), {
        mode: "javascript",
        theme: "monokai",
        lineNumbers: true,
    });
}
$(document).on('keyup keydown change', '.editor', function(){
  var myCodeMirror = CodeMirror(function(elt) {
      $('.editor').replaceWith(elt);
  }, {value: $('.editor').val(),
      lineNumbers: true,
      theme: "monokai",
      mode: "yaml"});
});
$(document).on('keyup keydown change', '.editor2', function(){
  var myCodeMirror = CodeMirror(function(elt) {
      $('.editor2').replaceWith(elt);
  }, {value: $('.editor2').val(),
      lineNumbers: true,
      theme: "monokai",
      mode: "javascript"});
});
