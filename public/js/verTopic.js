var topicId = getParameterByName('topic_id');


if (topicId) {
  alert("El topic ID es:" + topicId);
  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}`,
    contentType: 'application/json',
    method: 'GET',
    success: function (response) {
      console.log(response);
      const id = response.id;
      const author = response.author_name;
      const content = response.content;
      templateComment(id, author, content, responseCount = 0)
    },
    fail: function (request) {
      if (request) {
        alert(request.message);
        console.log(request.message);
      }
    }
  });

  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
    contentType: 'application/json',
    method: 'GET',
    success: function (response) {
      console.log(response);
      const selector = $('.form-comments-js');
      $.each(response.reverse(), function (i, obj) {
        const author = obj.author_name;
        const content = obj.content;
        templateMessage(selector, idMessage = 0, idTopic = 0, author, content)
      })
      formResponse(selector);
    },
    fail: function (request) {
      if (request) {
        alert(request.message);
        console.log(request.message);
      }
    }
  });
}


function templateComment(id = 0, author, content, responseCount = 0) {
  $('#container-comments-js').append(
    `<div class="comment" id="${id}">
      <a class="avatar">
        <img src="../assets/images/matt.jpg">
      </a>
      <div class="content">
        <span class="author">${content}</span>
        <div class="metadata">
          <span class="date">Today at 5:42PM</span>
        </div>
        <div class="text">
          <span>Autor: ${author}</span>
        </div>
        <!--<div class="actions">
          <span>${responseCount}</span>
          <span>Respuestas</span>
          <a class="reply reply-comment-js">Responder</a>-->
        </div>
        <div class="comments">
          <form class="ui reply form">
            <div class="ui form">
              <div class="field">
                <label>Por:</label>
                <input type="text" class="author-comment" id="author-message">
              </div>
            </div>
            <br>
            <div class="field">
              <label>Mensaje</label>
              <textarea id="content-message"></textarea>
            </div>
            <div class="ui blue labeled submit icon button" id="submit-comment">
              <i class="icon edit"></i> Agregar comentario
            </div>
          </form><br>
          <div class="form-comments-js">
            <!-- Comentarios -->
          </div>
        </div>
      </div>
    </div>`
  );
}

function templateMessage(selector, idMessage = 0, idTopic = 0, author, content) {
  selector.prepend(`
    <div class="comment" data-response="${idMessage}" data-topic="${idTopic}">
      <a class="avatar">
        <img src="../assets/images/jenny.jpg">
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

/* function formResponse(selector) {
  selector.append(`
    `
  );
} */

$(document).on('click', '#submit-comment', function () {
  const author = $('#author-message').val();
  const content = $('#content-message').val();

  const message = {
    "author_name": author,
    "content": content
  }

  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
    method: 'POST',
    data: message,
    success: function (response) {
      console.log('enviado');

      const selector = $('.form-comments-js');
      templateMessage(selector, idMessage = 0, idTopic = 0, message.author_name, message.content);
    },
    fail: function (request) {
      if (request) {
        alert(request.message);
      }
    }
  });
})