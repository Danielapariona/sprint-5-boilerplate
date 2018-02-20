$('#add-theme').on('click', function () {
  $('.ui.small.modal')
    .modal('show');
})

$(document).on('click', '.reply-comment-js', function () {
  const parentComments = $(this).parent().parent().parent().attr('id');
  const comments = $("#" + parentComments + " .form-comments-js");

  if (comments.hasClass('hidden')) {
    comments.removeClass('hidden');
    comments.addClass('content-block');
    const idTopic = parentComments;
    $.ajax({
      url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${idTopic}/responses`,
      contentType: 'application/json',
      method: 'GET',
      success: function (response) {
        $.each(response, function (i, obj) {
          const author = obj.author_name;
          const content = obj.content;
          const idMessage = obj.id;
          const idTopic = obj.topic_id;
          if (author == undefined && content == undefined) {
            console.log('vacio');
            //comments.append(`<p>No hay respuestas</p>`);
          } else {
            // Muestra todos los mensajes desde la API
            templateMessage(comments, idMessage, idTopic, author, content)
          }
        })
        comments.append(`
          <form class="ui reply form">
            <div class="ui form">
              <div class="field">
                <label>Por:</label>
                <input type="text" class="author-comment" id="answer-author-js">
              </div>
            </div>
            <br>
            <div class="field">
              <label>Mensaje</label>
              <textarea id="answer-comment"></textarea>
            </div>
            <div class="ui blue labeled submit icon button" id="submit-comment">
              <i class="icon edit"></i> Agregar comentario
            </div>
          </form>`
        );
      },
      fail: function (request) {
        if (request) {
          alert(request.message);
          console.log(request.message);
        }
      }
    });

    $('.author-comment').focus();

  } else if (comments.hasClass('content-block')) {
    comments.removeClass('content-block');
    comments.addClass('hidden');
    const form = $("#" + parentComments + " .form-comments-js" + " form");
    form.remove();
  }
});

const $containerComments = $('#container-comments-js');
$.ajax({
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics',
  contentType: 'application/json',
  method: 'GET',
  success: function (response) {
    $.each(response.reverse(), function (i, obj) {
      const id = obj.id;
      const author = obj.author_name;
      const content = obj.content;
      const responseCount = obj.responses_count;
      templateComment(id, author, content, responseCount)
    })
  },
  fail: function (request) {
    if (request) {
      alert(request.message);
    }
  }
});

function templateComment(id = 0, author, content, responseCount = 0) {
  $('#container-comments-js').prepend(
    `<div class="comment" id="${id}">
      <a class="avatar">
        <img src="assets/images/matt.jpg">
      </a>
      <div class="content">
        <a class="author" href="../views/verTopic.html?topic_id=${id}">${content}</a>
        <div class="metadata">
          <span class="date">Today at 5:42PM</span>
        </div>
        <div class="text">
          <span>Autor: ${author}</span>
        </div>
        <div class="actions">
          <span>${responseCount}</span>
          <span>Respuestas</span>
          <a class="reply reply-comment-js">Responder</a>
        </div>
      </div>
      <!-- Comentarios -->
      <div class="comments form-comments-js hidden">
      </div>
    </div>`
  );
}

function templateMessage(selector, idMessage=0, idTopic=0, author, content) {
  selector.prepend(`
    <div class="comment" data-response="${idMessage}" data-topic="${idTopic}">
      <a class="avatar">
        <img src="assets/images/jenny.jpg">
      </a>
      <div class="content">
        <a class="author">${author}</a>
        <div class="metadata">
          <span class="date">Just now</span>
        </div>
        <div class="text">
          ${content}
        </div>
      </div>
    </div>`
  );
}

$('#post-topic').on('click', function () {
  const author = $('#post-author').val();
  const content = $('#post-content').val();

  const topic = {
    "author_name": author,
    "content": content
  }

  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics`,
    method: 'POST',
    data: topic,
    success: function (response) {
      console.log('enviado');
      $('.ui.small.modal')
        .modal('hide');
      templateComment(id = 0, author, content, responseCount = 0)
    },
    fail: function (request) {
      if (request) {
        alert(request.message);
      }
    }
  });
})


$(document).on('click', '#submit-comment', function () {
  console.log('submit comentario');
  const author = $('#answer-author-js');
  const content = $('#answer-comment');
  const idTopic = $(this).parent().parent().parent().attr('id');

  // Selector mediante el id, para agregar el formulario
  let message = $("#" + idTopic + " .form-comments-js");
  console.log(message);
  
  const answer = {
    "author_name": author.val(),
    "content": content.val()
  }

  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${idTopic}/responses`,
    method: 'POST',
    data: answer,
    success: function (response) {
      console.log('enviado');
      author.focus();
      // Agrega al DOM
      templateMessage(message, idMessage=0, topic=0, answer.author_name, answer.content);
    },
    fail: function (request) {
      if (request) {
        alert(request.message);
      }
    }
  });
})