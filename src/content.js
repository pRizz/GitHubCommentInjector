// Inserts a comment button in the comment toolbar in GitHub Pull Requests.
// This code is highly dependent on the layout/structure of the GitHub HTML, so may break at any time ;_;

const commentsKey = "settings.commentsKey";

chrome.storage.sync.get(commentsKey, function(storage){
  if (!storage) { return }
    
  function onLoad () {
    insertCommentButtons(storage[commentsKey]);
  }
  
  document.addEventListener('DOMContentLoaded', onLoad, false);
});

/// comments: [String]
function insertCommentButtons(comments) {
  comments.forEach(insertCommentButton);
}

function insertCommentButton(commentText) {
  let commentButton = document.querySelector("#partial-new-comment-form-actions > button.btn.btn-primary");
  if (!commentButton) { return }

  let newButton = commentButton.cloneNode();
  newButton.innerText = commentText;
  newButton.onclick = function() {
    document.getElementById("new_comment_field").value = commentText;
  }
  document.getElementById("partial-new-comment-form-actions").appendChild(newButton);
}
