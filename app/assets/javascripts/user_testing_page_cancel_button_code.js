

function cancel_changes_to_comment(cancelButton){

  //get whole block 
  var commentBlock = $(cancelButton).parent();

  //hide save and cancel buttons, and hide text area. 

  commentBlock.children(".save_comment").hide();

  commentBlock.children(".dont_change_comment").hide();

  commentBlock.children(".comment_ta").hide();

  //show edit and delete buttons, and show text.

  commentBlock.children(".edit_comment").show();

  commentBlock.children(".delete_comment").show();

  commentBlock.children(".comment_p").show();

  $('textarea.comment_ta').val(commentBlock.children(".comment_p").text());



}