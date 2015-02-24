

// //initial page load
// function run(sub_keddit_name,forum){
// //function run(sub_keddit_name,forum_unique_num,forum_title){

// 	console.log("22222got into run");

// 	console.log("sub_keddit_name is: " + sub_keddit_name);
// 	console.log("forum is: " + forum);

// 	//url_string = "/sub_keddits/"+ sub_keddit_name +"/" +forum

// //sub_keddits/:sub_keddit_name/forums/:forum_unique_num/:forum_title

//   var forum_unique_num = 134640;

//   var forum_title = "check_out_this_neat_new_phone";

//   var url_string = "/sub_keddits/" + sub_keddit_name + "/forums/" + forum_unique_num.toString() + "/" + forum_title;


//   //var url_string = 'sub_keddits/:sub_keddit_name/forums/:forum_unique_num/:forum_title';

//   console.log("url_string is: " + url_string);

//   $.ajax({
//       type: "GET",
//       url: url_string,
//       dataType: "json",
//       async: false,
//       success: function(data){

//         display_posts(data);
//       }

//   });



// }

//should still work. 
// function add_new_post_to_forum(post){

//   var commenters_posts = "#commenters_posts";

//   var comment = $("<div id = comment_container_new class = comment_container></div>");

//   comment.append("<p id = comment_new class = comment_p>" + post + "</p>");

//   //comment_ta means comment_textarea
//   comment.append("<textarea id = T_new class = 'comment_ta' ></textarea>");

//   comment.append("<button id = E_new class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

//   comment.append("<button id = D_new class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

//   comment.append("<button id = S_new class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

//   comment.append("<button id = C_new class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

//   comment.children(".comment_ta").val(post);

//   comment.children(".save_comment").hide();
//   comment.children(".dont_change_comment").hide();

//   comment.children(".comment_ta").hide();

//   $(commenters_posts).append(comment);


// }

function add_new_post_to_forum(submission,post_id){

      //need post_id and post_content

      var val = post_id;

      console.log("val is: " + val);

      var content = submission;

      console.log("content is: " + content);

      // console.log("content is: " + content);

      var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

      comment.append("<p id = comment_"+val+" class = comment_p>" + content + "</p>");

      //comment_ta means comment_textarea
      comment.append("<textarea id = T"+val+" class = 'comment_ta' ></textarea>");

      comment.children(".comment_ta").val(content);

      comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

      comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

      comment.append("<button id = S"+val+" class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

      comment.append("<button id = C"+val+" class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

      comment.children(".save_comment").hide();
      comment.children(".dont_change_comment").hide();

      comment.children(".comment_ta").hide();

      $(commenters_posts).append(comment);


}

//note: the whole use of val is more for debugging purposes than anything else. 
function display_all_posts(data){

  var commenters_posts = "#commenters_posts";

  $(commenters_posts).children().remove();



  console.log("22222222233getting into display_posts");

  //$("#commenters_posts").empty();//clear, I guess? 

  var empty = 0;

  console.log(data.posts);

  //data.posts = [];//used to see if the 'else' part was working.

  if(data.posts != empty){

    for(var post of data.posts){
      //console.log("does this bug you?");
      //console.log(num);

      var val = post.id;
      //var val = num;

      //var test = data.posts[num];

      //console.log(test);

      //var val = data.posts[num].post_id_rel_to_user;//need to get working?

      // console.log("val is: " + val);

      var content = post.content;

      // console.log("content is: " + content);

      var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

      comment.append("<p id = comment_"+val+" class = comment_p>" + content + "</p>");

      //comment_ta means comment_textarea
      comment.append("<textarea id = T"+val+" class = 'comment_ta' ></textarea>");

      comment.children(".comment_ta").val(content);

      comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

      comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

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

      $(commenters_posts).append(comment);
    }
  }
  else{
      console.log("getting here");
      $( "body" ).append("<p ><font color='red'>Sorry.There doesn't appear to be anything here.</font></p>");

    }


}

// //note: the whole use of val is more for debugging purposes than anything else. 
// function display_posts2(data){

// 	console.log("22222222233getting into display_posts");

//   //$("#commenters_posts").empty();//clear, I guess? 

//   var empty = 0;

//   console.log(data.posts);

//   //data.posts = [];//used to see if the 'else' part was working.

//   if(data.posts != empty){

//     for(var num in data.posts){
//       //console.log("does this bug you?");
//       //console.log(num);

//       var val = data.posts[num].id;
//       //var val = num;

//       //var test = data.posts[num];

//       //console.log(test);

//       //var val = data.posts[num].post_id_rel_to_user;//need to get working?

//       // console.log("val is: " + val);

//       var content = data.posts[num].content;

//       // console.log("content is: " + content);

//       var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

//       comment.append("<p id = comment_"+val+" class = comment_p>" + content + "</p>");

//       //comment_ta means comment_textarea
//       comment.append("<textarea id = T"+val+" class = 'comment_ta' ></textarea>");

//       comment.children(".comment_ta").val(content);

//       comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

//       comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

//       comment.append("<button id = S"+val+" class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

//       comment.append("<button id = C"+val+" class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

//       // console.log("child is: ");
//       // console.log(comment.children(".delete_comment"));

//       // console.log("parent is:");
//       // console.log(comment.children(".delete_comment").parent());

//       //$('textarea.comment_ta').val(content);

//       comment.children(".save_comment").hide();
//       comment.children(".dont_change_comment").hide();
//       comment.children(".comment_ta").hide();

//       $("#commenters_posts").append(comment);
//     }
//   }
//   else{
//       console.log("getting here");
//       $( "body" ).append("<p ><font color='red'>Sorry.There doesn't appear to be anything here.</font></p>");

//     }


// }


