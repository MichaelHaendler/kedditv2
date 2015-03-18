
	// otherUsers_user_name
	// otherUsers_post_id_rel_to_user (get from comment)
	// user_name
	// sub_keddit_name
	// forum_unique_num
	// forum_title
	// submission (the post itself)

//just like other save EXCEPT it has the additional parameters from the user that you are replying to. 
//function save_reply_comment(saveButton){

//otherUsersPostIdRelToUser and otherUsersUserName
function reply_save_comment(saveButton ,userName, subKedditName, forumUniqueNum, forumTitle){

	console.log("(reply_save_comment)------");

	//the first parent call gets us the parent for this comment block. The second parent call gets
	//us the top div that our reply is nested in. 

	// console.log("$(saveButton).parent().children('#T_reply') is: ");
	// console.log($(saveButton).parent().children("#T_reply").val());

	var comment = $(saveButton).parent().children("#T_reply").val();

	// console.log("comment is: " + comment);

	console.log(" $(saveButton).parent().id is: ");
	console.log( $(saveButton).parent().parent().attr('id'));
	
	//parent().parent() gets you the comment that the current users comment is in response to. 
	var otherUsersPostIdRelToUser = getID("comment_container_",$(saveButton).parent().parent().attr('id'));

	console.log("otherUsersPostIdRelToUser is: " + otherUsersPostIdRelToUser);

	var otherUsersUserName = remove_dashes($(saveButton).parent().parent().children(".user_name").text());

	console.log("otherUsersUserName is: " + otherUsersUserName);
	//console.log($(saveButton).parent().children());


	console.log("$(saveButton).parent().children('.user_name') is: ");
	console.log($(saveButton).parent().children(".user_name"));

	var url_string = "/forums/replyToPost/?format=json";

	var params = { 
					otherUsers_user_name: otherUsersUserName,
					otherUsers_post_id_rel_to_user: otherUsersPostIdRelToUser,
					user_name: userName,
					sub_keddit_name: subKedditName,
					forum_unique_num: forumUniqueNum,
					forum_title: forumTitle,
					submission: comment
				}; 


    $.ajax({
        type: "POST",
        url: url_string,
        data: params,
        dataType: "json",
        traditional: true,
        async: true, //don't wait
        success: function(data){

          console.log("getting into success after delete_this_comment");
          //upon getting here, replace the reply code with the actual proper comment. 
          replace_reply_comment(saveButton,data.post);

        }

    });
  
}

function remove_dashes(string){

	return string.slice(3,string.length);
}


function replace_reply_comment(saveButton,post){

	//get id of comment that we are replying to: 
	var id = "#" + $(saveButton).parent().parent().attr('id');

	//delete the temporary reply
	$(saveButton).parent().remove();

	console.log("id is: " + id);

	//replace with that same new comment (needs to be the actual post object) now with all the proper attributes set. 
	$(id).append(comment_object_body(post));

}

//example: getID("D","D1")
// or getID("D",htmlElement.id)
function getID(string_seg,string){

	console.log("getting into getID");

  var start = string_seg.length;//# of chars in 'comment_container_'

  var end = string.length;

  var num = parseInt(string.slice(start,end));

  console.log("(getNumber) returning number " + num);

  return num;
}