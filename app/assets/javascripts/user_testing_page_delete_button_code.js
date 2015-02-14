
//delButton is one of the delete_comment_button instances. The number at the end of the id
//is to be used to say which post(by id) is to be deleted. 
//note that I named each delete button delete_comment_button# in order to help preserve
//id uniqueness

//delete no longer works (makes sense since we changed IDs and stuff)
//thought: create user_id field in the table. 
//anytime you want to do a post, we get the next number, and assign that as part of the id 
//to the post. 
//when you want to delete, you use this number to look up the post FOR THAT USER (post 1 for Mike0
// would be different than post 1 for Jane33).
//side note: add feature where, when comment section is empty, it says "sorry, there doesn't appear to be anything here."

//-look up how to create user_post_id field (and create it). this is the id of the post relative to the user. 
//-add the increment feature to the field. 
//-delete all current posts, and then add in a bunch of new ones 
//-make sure that they are working relative to the user (i.e. mike1 and mike0 should both be able to have a post with a 
//post_id_rel_to_user ((post id relative to user id)) of 1)
//use this (rather than id) to create the id name for your whole comment (container, post itself, etc)

//save
//needs to pass in the post_id_rel_to_user value and the post itself to ajax, overwriting original post. 
//then needs to refresh page with updated post. 

//rails generate migration add_post_id_rel_to_user_to_post post_id_rel_to_user:integer

//create index where you search by user name and post number

//every time you create a new user, you set that autoincremented field initially to zero. 

function delete_this_comment(delButton){

  console.log("now in delete_this_comment()");

  var params = { post_id: getNumber(delButton) }; 
  //var ret_val = true; //return value. default value is true (meaning that the user name is taken)

  $.ajax({
      type: "POST",
      url: "/users/delete_post_helper/?format=json",
      data: params,
      dataType: "json",
      traditional: true,
      async: false,
      success: function(data){

        console.log(delButton);


        $(delButton).parent().hide();



        console.log("getting into success after delete_this_comment");
      //debugger

      // //debugger
      //   //after we delete the comment, we then display all of the comments again
      // $("#commenters_posts").innerHtml = "";

      //   for(var num in data.posts){
      //     console.log(num);
      //     $("#commenters_posts").append("<p>" + num + ") " + data.posts[num].content + "<p>" +
      //     "<button id = delete_comment_button"+data.posts[num].id+" class = delete_comment>delete</button>");
      //   }
        //display_posts(data);


      }

  });

  console.log("111finishing ajax call in delete?");

}

//htmlEl == html element. specifically, a delete button. 
//note that it's best that the elements are named delete_comment_button#
//instead of #delete_comment_button, because that actually makes it EASIER
//to get the number. 
function getNumber(htmlEl){

  var string = htmlEl.id;

  var start = 1;//# of chars in 'delete_comment_button'

  var end = string.length;

  var num = parseInt(string.slice(start,end));

  console.log("returning number " + num);

  return num;
}

//initial page load
function run(){

  $.ajax({
      type: "GET",
      url: "/users/testing_page_helper2",
      dataType: "json",
      async: false,
      success: function(data){
 //      //debugger

	// // console.log(data.posts.constructor == Array ? "is array" : "is not array");



 //      	for(var num in data.posts){
 //          //console.log("does this bug you?");
 //      		// console.log(postObj);
 //      		$("#commenters_posts").append("<p>" + num + ") " + data.posts[num].content + "<p>" +
 //      		"<button id = delete_comment_button"+data.posts[num].id+" class = delete_comment>delete</button>");
 //      	}


 //      	// console.log("successfully ran the ajax get function");
 //      	// console.log("this should say hi: " + data.posts[0].content);
 //      	// console.log(data.posts);

        display_posts(data);
      }

  });



}

//note: can make this function more efficient by having it just display the new post instead
//of just redisplaying all of them (and now including the new one)
function post_submission(submission){
  
  //console.log("got into ajax_code_boolean_version");

  //var user_id = "<%= escape_javascript(session[:user_id]) %>";

  //console.log("and the user id is: " + user_id);

  // var params = { id: user_id , content: submission }; 
  var params = { content: submission }; 
  //var ret_val = true; //return value. default value is true (meaning that the user name is taken)

  $.ajax({
      type: "POST",
      url: "/users/submit_post_helper/?format=json",
      data: params,
      dataType: "json",
      traditional: true,
      async: false,
      success: function(data){
        	
        document.getElementById("testing_page_text_box").value = "";//clear text box

        display_posts(data);
        
      }

  });

  //return ret_val;

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




