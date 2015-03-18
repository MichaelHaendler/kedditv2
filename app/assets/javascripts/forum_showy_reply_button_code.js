

//idea:
//get the location thing working
//get history into here (via the html, onclick)
//note: we're replying to a comment that already exists, no? 
//yes! when you click submit, make sure ajax is turning said reply into a proper commet. 
function reply_to_this_comment(replyButton,userName){

  console.log("222yippie!!!!");

  //get comment
  //commentBlock is the entirety of this particular comment. 
  var commentBlock = $(replyButton).parent();

  //if it exists (that is, there is a history, and it's not an original, stand alone comment) aka we're replying to someone
  //elses reply. 
  // if(commentBlock.children(".loc_of_comment_in_forum").length){
  //   //get the user name and val and append it to the already existing string. 
  //   var new_history = commentBlock.children(".loc_of_comment_in_forum").value + "@" + userName + "*" + commentBlock.children(".edit_comment").attr("id").substr(1);

  // }
  // //if there is no history (standalone comment )
  // else{
  //   var new_history = userName + "*" + commentBlock.children(".edit_comment").attr("id").substr(1);

  // }

  var temp_loc_of_comment_in_forum = commentBlock.children(".hiddenHistoryValue").attr('value');

  console.log("userName is: " + userName);

  console.log(commentBlock);

  console.log("temp_loc_of_comment_in_forum is: " + temp_loc_of_comment_in_forum);

  commentBlock.append(comment_object_body("reply",userName,temp_loc_of_comment_in_forum));

  //commentBlock.append(replyCommentBlock(userName,history_string));

}

function replyCommentBlock(userName,history_string){

  var comment = comment_object_body_v2("reply",userName,history_string);

}

// function replyCommentBlock(userName){



//     var comment = $("<div id = comment_container_reply class = comment_container></div>");

//     comment.append("<p id = comment_reply class = comment_p></p>");

//     //comment_ta means comment_textarea
//     comment.append("<textarea id = T_reply  class = 'comment_ta' ></textarea>");

//     comment.append("<div class = user_name_reply > 22--" + userName + "</div>");

//     comment.append("<br>");

//     comment.append("<button id = E_reply class = 'edit_comment' onclick=edit_comment(this);>edit2</button>");

//     comment.append("<button id = D_reply class = 'delete_comment' onclick = delete_this_comment(this);>delete2</button>");

//     comment.append("<button id = S_reply class = 'save_comment';>save2</button>");

//     comment.append("<button id = C_reply class = 'dont_change_comment' onclick = cancel_reply_comment(this);>cancel2</button>");

//     // comment.append("<button id = R_reply class = 'reply_to_comment' onclick = reply_to_this_comment(this);>reply2</button>");
//     comment.append("<button id = R_reply class = 'reply_to_comment';>reply2</button>");


//     //not save and not cancel. everything else though 
//     comment.children(".comment_reply").hide();
//     comment.children(".edit_comment").hide();
//     comment.children(".delete_comment").hide();
//     comment.children(".reply_to_comment").hide();

//     return comment;


// }

//needs to delete entire comment block that it belongs to 
function cancel_reply_comment(cancelButton){

  console.log("inside of cancel_reply_comment");

  var commentBlock = $(cancelButton).parent();

  //destroy comment block 
  commentBlock.remove();
}

function getNumber(string){

  var start = 21;//# of chars in 'delete_comment_button'

  var end = string.length;

  var num = parseInt(string.slice(start,end));

  console.log("returning number " + num);

  return num;
}

