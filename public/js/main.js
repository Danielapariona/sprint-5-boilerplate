$('#add-theme').on('click', function () {
  $('.ui.small.modal')
  .modal('show');
})

$('.reply-comment-js').on('click', function() {

  const parentComment = $(this).parent().parent().parent().attr('id');
  // console.log(parentComment);
  $("#"+ parentComment + " .form-comments-js").toggle();
  $('.author-comment').focus();
})



