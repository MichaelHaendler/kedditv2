



//save
//needs to pass in the post_id_rel_to_user value and the post itself to ajax, overwriting original post. 
//then needs to refresh page with updated post. 

//rails generate migration add_post_id_rel_to_user_to_post post_id_rel_to_user:integer

//create index where you search by user name and post number

function save_changes_to_comment(saveButton){

	var commentBlock = $(saveButton).parent();

	console.log("commentBlock.id is: ");
	console.log(commentBlock[0].id);

	var comment_p = commentBlock.children(".comment_p").text();//gets something like 'hello1'

	console.log("comment_p is: " + comment_p);

	var comment = commentBlock.children(".comment_ta").val();//gets something like 'hello2'

	console.log("comment is: " + comment);

	var num = postNumber($(saveButton)[0].id);//gets something like '1' from 'S1'

	console.log("num is: " + num);

	//post_itself would be 'hello2'
	//post_id_num would be '1' from 'S1'
	var params = { new_post: comment, post_id_num: num}; 

	//if the entered comment does not match the current one
	//hello1 != hello2 (changed have been made)
	if(comment != comment_p){

		console.log("got into here");

		//on the server side, set the comment to the proper value 
	  $.ajax({
	      type: "POST",
	      url: "/users/save_changes_to_comment_helper/?format=json",
	      data: params,
	      dataType: "json",
	      traditional: true,
	      async: true, //don't wait
	      success: function(data){

	      	console.log("getting into success after delete_this_comment");

	      	revert(commentBlock);

	        //display_posts(data);

	      }

	  });

	  //and on the user end, set the comment (in paragraph element form) to hold the new form of the comment.
	  //commentBlock.children(".comment_p").text(comment);
	}
	else{

		console.log("nothing to do. they equal each other.");
	}




}

function revert(commentBlock){

	  console.log("getting into revert?");

	  var comment_ta = commentBlock.children(".comment_ta");

	  commentBlock.children(".comment_p").text(comment_ta.val());

      commentBlock.children(".save_comment").hide();
      commentBlock.children(".dont_change_comment").hide();//cancel
      commentBlock.children(".comment_ta").hide();//editable comment

      commentBlock.children(".edit_comment").show();
	  commentBlock.children(".delete_comment").show();
	  commentBlock.children(".comment_p").show();


}


function postNumber(id){

  console.log("id is: " + id);

  var start = 1;//# of chars in 'S1'

  var end = id.length;

  console.log("id.slice(start,end) is: " + id.slice(start,end));

  var num = parseInt(id.slice(start,end));

  console.log("returning number " + num);

  return num;

}

//note: the whole use of val is more for debugging purposes than anything else. 
function display_posts(data){

  $("#commenters_posts").empty();//clear, I guess? 

  var empty = 0;

  //data.posts = [];//used to see if the 'else' part was working.

  if(data.posts != empty){

    for(var num in data.posts){
      //console.log("does this bug you?");
      //console.log(num);

      //var val = data.posts[num].id;

      var val = data.posts[num].post_id_rel_to_user;

      //console.log("val is: " + val);

      var content = data.posts[num].content;

      var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

      comment.append("<p id = comment_"+val+" class = comment_p>" + content + "</p>");

      //comment_ta means comment_textarea
      comment.append("<textarea id = T"+val+" class = 'comment_ta' ></textarea>");

      comment.children(".comment_ta").val(content);

      comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

      comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_comment(this);>delete</button>");

      comment.append("<button id = S"+val+" class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

      comment.append("<button id = C"+val+" class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

      // console.log("child is: ");
      // console.log(comment.children(".delete_comment"));

      // console.log("parent is:");
      // console.log(comment.children(".delete_comment").parent());

      //$('textarea.comment_ta').val(content);

      comment.children(".save_comment").hide();
      comment.children(".dont_change_comment").hide();
      comment.children(".comment_ta").hide();

      $("#commenters_posts").append(comment);
    }
  }
  else{
      console.log("getting here");
      $( "body" ).append("<p ><font color='red'>Sorry.There doesn't appear to be anything here.</font></p>");

    }


}