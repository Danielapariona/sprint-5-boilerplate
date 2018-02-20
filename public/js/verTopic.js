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
      $.each(response, function (i, obj) {
        const selector = $('.comments .form-comments-js');
        console.log(selector);
        const author = obj.author_name;
        const content = obj.content;
        templateMessage(selector, idMessage = 0, idTopic = 0, author, content)
      })
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
        <a class="author" href="../views/verTopic.html?topic_id=${id}">${content}</a>
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
        <!-- Comentarios -->
        <div class="comments form-comments-js">
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
