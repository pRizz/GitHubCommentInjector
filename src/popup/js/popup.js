const commentsKey = "settings.commentsKey";

function getComments(callback) {
  chrome.storage.sync.get(commentsKey, function(storage){
    if (!storage) { return }
    callback(storage[commentsKey]);
  });
}

angular.module("commentInjectorApp", [])
  .controller("CommentListController", function($scope) {
    var commentListController = this;
    commentListController.comments = [];

    getComments(function(comments) {
      if (!comments || comments.length == 0) { return }

      commentListController.comments = comments.map(item => ({ text: item }));
      $scope.$apply()
    });

    function saveComments() {
      chrome.storage.sync.set({
        "settings.commentsKey": commentListController.comments.map(item => item.text)
      });
    }

    commentListController.addComment = function() {
      if (!commentListController.commentText || commentListController.commentText.length == 0) { return }
      commentListController.comments.push({text:commentListController.commentText});
      commentListController.commentText = "";
      saveComments();
    };

    commentListController.delete = function(commentToDelete) {
      var oldComments = commentListController.comments;
      commentListController.comments = [];
      angular.forEach(oldComments, function(comment) {
        if (comment != commentToDelete) commentListController.comments.push(comment);
      });
      saveComments();
    };
  });
