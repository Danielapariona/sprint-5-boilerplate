$('#add-theme').on('click', function () {
  $('.ui.small.modal')
    .modal('show');
})

$('.reply-comment-js').on('click', function () {
  const parentComments = $(this).parent().parent().parent().attr('id');
  $("#" + parentComments + " .comments").append(`
    <form class="ui reply form">
      <div class="ui form">
        <div class="field">
          <label>Por:</label>
          <input type="text" class="author-comment">
        </div>
      </div>
      <br>
      <div class="field">
        <label>Mensaje</label>
        <textarea></textarea>
      </div>
      <div class="ui blue labeled submit icon button">
        <i class="icon edit"></i> Agregar comentario
      </div>
    </form>`
  );
  $("#" + parentComments + " .form-comments-js").toggle();
  $('.author-comment').focus();
});





