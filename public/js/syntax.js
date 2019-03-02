window.onload = function () {
    var codeMirror = CodeMirror.fromTextArea(document.getElementById('config'), {
        mode: "yaml",
        theme: "nord",
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        styleActiveSelected: true,
    }).setSize("100%", "100%");
    var codeMirror = CodeMirror.fromTextArea(document.getElementById('data'), {
        mode: "javascript",
        theme: "nord",
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        styleActiveSelected: true,
    }).setSize("100%", "100%");
    var codeMirror = CodeMirror.fromTextArea(document.getElementById('result'), {
        mode: "javascript",
        theme: "nord",
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {"Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()); }},
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        styleActiveLine: false,
        styleActiveSelected: false,
    }).setSize("100%", "100%");

    document.getElementById("defaultTab").click();

}
$(document).on('keyup keydown change', '.editor', function(){
  var myCodeMirror = CodeMirror(function(elt) {
      $('.editor').replaceWith(elt);
  }, {value: $('.editor').val(),
      lineNumbers: true,
      theme: "nord",
      lineWrapping: true,
      mode: "yaml"});
});
$(document).on('keyup keydown change', '.editor2', function(){
  var myCodeMirror = CodeMirror(function(elt) {
      $('.editor2').replaceWith(elt);
  }, {value: $('.editor2').val(),
      lineNumbers: true,
      theme: "nord",
      lineWrapping: true,
      mode: "javascript"});
});
$(document).on('keyup keydown change', '.result', function(){
  var myCodeMirror = CodeMirror(function(elt) {
      $('.result').replaceWith(elt);
  }, {value: $('.result').val(),
      lineNumbers: true,
      lineWrapping: true,
      theme: "nord",
      mode: "javascript"});
});

function tabResult(evt, result) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tabactive", "");
  }
  document.getElementById(result).style.display = "block";
  evt.currentTarget.className += " tabactive";
}