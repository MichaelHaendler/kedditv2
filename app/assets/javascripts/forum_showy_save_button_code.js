

function save_changes_to_comment(saveButton){

	console.log("1111 getting into this particular save_changes_to_comment instance");

	var commentBlock = $(saveButton).parent();

	console.log("333commentBlock.id is: ");
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
	      url: "/forums/save_changes_to_comment/?format=json",
	      data: params,
	      dataType: "json",
	      traditional: true,
	      async: true, //don't wait
	      success: function(data){

	      	console.log("getting into success after delete_this_comment");

	      	update_and_revert(commentBlock);

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

//update the paragraph element to hold the new comment, and then hide and show the proper
//elements
function update_and_revert(commentBlock){

	  console.log("getting into revert?");


    //get the ".comment_ta" element
	  var comment_ta = commentBlock.children(".comment_ta");

    //set the ".comment_p" element's text value to hold the new value/comment
	  commentBlock.children(".comment_p").text(comment_ta.val());

	  //hide save, cancel and textarea
      commentBlock.children(".save_comment").hide();
      commentBlock.children(".dont_change_comment").hide();//cancel
      commentBlock.children(".comment_ta").hide();//editable comment

      //show edit, delete, and paragraph elements
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