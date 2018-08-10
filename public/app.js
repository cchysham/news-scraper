
  $.getJSON("/articles", function (data) {
    console.log(data);
    // console.log(data[0].link);
    // For each one
    for(var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $(".article-container").append(`<div class="card">
        <div class="card-header">
          <h3>
            <a class="article-link" target="_blank" rel="noopener noreferrer" href="${data[i].link}">${data[i].title}</a>
            <a class="btn btn-success save data-_id="${data[i]._id}">Save Article</a>
          </h3>
        </div>
        <div class="card-body" data-_id="${data[i]._id}">${data[i].summary}</div>
      </div>`);
    }
    });

$(document).on("click", ".card-body", function () {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", ".save", function () {
  var thisId = $(this).attr("data-_id");
  $.ajax({
    method: "PUT",
    url: "/api/articles/" + thisId,
  }).then(function (data) {
    if (data) {
      window.location.href = '/';
    }
  }).catch(function (err) {
    alert(err);
  });
});


$(document).on("click", ".clear", function () {
  $.ajax({
    method: "DELETE",
    url: "/delete",
  }).then(function (data) {
    if (data) {
      window.location.href = '/';
    }
  }).catch(function (err) {
    alert(err);
  });
});

