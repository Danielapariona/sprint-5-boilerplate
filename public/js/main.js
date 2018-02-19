$('#add-theme').on('click', function () {
  $('.ui.small.modal')
    .modal('show');
})

$(document).on('click','.reply-comment-js',function () {
  console.log($(this));
  const parentComments = $(this).parent().parent().parent().attr('id');
  const comments = $("#" + parentComments + " .form-comments-js");

  if (comments.hasClass('hidden')) {
    comments.removeClass('hidden');
    comments.addClass('content-block');

    
    /* comments.append(`
      <form class="ui reply form" id="form-comment">
        <div class="ui form">
          <div class="field">
            <label>Por:</label>
            <input type="text" class="author-comment" id="author-js">
          </div>
        </div>
        <br>
        <div class="field">
          <label>Mensaje</label>
          <textarea id="comments-js"></textarea>
        </div>
        <div class="ui blue labeled submit icon button" id="submit-comment">
          <i class="icon edit"></i> Agregar comentario
        </div>
      </form>`
    ); */
    $('.author-comment').focus();




  } else if (comments.hasClass('content-block')) {
    comments.removeClass('content-block');
    comments.addClass('hidden');
    const form = $("#" + parentComments + " .form-comments-js" + " form");
    form.remove();
  }
});

/* $(document).on('click', ,function () {
  console.log('soy el boton');
  const $author = $('#author-js').val();
  const $comment = $('#comments-js').val();
  $('#form-comment').parent().prepend(`
      <div class="comment">
      <a class="avatar">
        <img src="assets/images/jenny.jpg">
      </a>
      <div class="content">
        <a class="author">${$author}</a>
        <div class="metadata">
          <span class="date">Just now</span>
        </div>
        <div class="text">
          ${$comment}
        </div>
      </div>
    </div>`
  );
}); */

const $containerComments = $('#container-comments-js');
$.ajax({
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics',
  contentType: 'application/json',
  method: 'GET',
  success: function (response) {
    $.each(response, function (i, obj) {
      const id = response[i].id;
      const author = response[i].author_name;
      const content = response[i].content;
      const responseCount = response[i].responses_count;
      templateComment(id, author, content, responseCount)
    })
  },
  fail: function (request) {
    if (request) {
      alert(request.message);
    }
  }
});


function templateComment(id, author, content, responseCount) {
  $('#container-comments-js').append(
    `<div class="comment" id="${id}">
      <a class="avatar">
        <img src="assets/images/matt.jpg">
      </a>
      <div class="content">
        <a class="author">${author}</a>
        <div class="metadata">
          <span class="date">Today at 5:42PM</span>
        </div>
        <div class="text">
          ${content}
        </div>
        <div class="actions">
          <span>${responseCount}</span>
          <span>Respuestas</span>
          <a class="reply reply-comment-js">Responder</a>
        </div>
      </div>
      <div class="comments form-comments-js hidden">
        <div class="comment">
          <a class="avatar">
            <img src="assets/images/jenny.jpg">
          </a>
          <div class="content">
            <a class="author">Jenny Hess</a>
            <div class="metadata">
              <span class="date">Just now</span>
            </div>
            <div class="text">
              Elliot you are always so right :)
            </div>
          </div>
        </div>
        <div class="comment">
          <a class="avatar">
            <img src="assets/images/jenny.jpg">
          </a>
          <div class="content">
            <a class="author">Jenny Hess</a>
            <div class="metadata">
              <span class="date">Just now</span>
            </div>
            <div class="text">
              Elliot you are always so right :)
            </div>
          </div>
        </div>
        <div class="comment">
          <a class="avatar">
            <img src="assets/images/jenny.jpg">
          </a>
          <div class="content">
            <a class="author">Jenny Hess</a>
            <div class="metadata">
              <span class="date">Just now</span>
            </div>
            <div class="text">
              Elliot you are always so right :)
            </div>
          </div>
        </div>
        <br>
      </div>
    </div>`
  );
}


