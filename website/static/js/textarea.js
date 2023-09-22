$(document).ready(function() {
  let $textareas = $('textarea');

  $textareas.on('input', function(e) {
    let $textarea = $(this);
    $textarea.css('height', '3.125rem');
    let scHeight = $textarea[0].scrollHeight;
    $textarea.css('height', scHeight + 'px');

    $('#lists').masonry('reloadItems');
    $('#lists').masonry('layout');
  });
});