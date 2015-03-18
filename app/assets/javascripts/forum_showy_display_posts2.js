

// function add_new_post_to_forum(submission,post_id){
function add_new_post_to_forum(data){

      post_body(data.post);

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

        post_body(post);
    }
  }
  else{
      console.log("getting here");
      $( "body" ).append("<p ><font color='red'>Sorry.There doesn't appear to be anything here.</font></p>");

    }


}

function post_body(post){

  var commenters_posts = "#commenters_posts";

  //var comment = comment_body(post);
  var comment = comment_object_body(post);

  $(commenters_posts).append(comment);

}



//every post is in it's own instance. 
//3 types of posts
//regular/initial post
//editing post
//reply post
//regular post and reply post are their own instance. 
//edit can just be a modified version of said post. 
//2 versions of save. one saves an edit, one saves a reply
//delete will still hopefully work???

//an "object" version of comment body. I called it this because I was originally
//going to make this into an object. instead it's a simple function (pseudo constructor?)
//with two very beefy/big helper functions. 
function comment_object_body(){

  //the first input is either going to be the string "reply" or a post object

  //if it is not the string "reply", then it is a post object. 
  if(arguments[0] != "reply"){
    var post = arguments[0];
    
    return comment_object_body_helper_post(post);
  }
  //otherwise, it is a reply
  else{
   //the first argument (argument[0]) was the word "reply". The second, is the user name.
   //and the third argument, is the history, so that we know how much to indent the coment. 
   var userName = arguments[1];
   var history = arguments[2];
   var comment = comment_object_body_helper_reply(userName,history);

   return comment;
  }


}

//either a regular original post, or could be used for printing posts off of the server. 
//a regular post wont have a loc_of_comment_in_forum. a reply will. 
function comment_object_body_helper_post(post){

  // var amount_to_indent_by = 150;
  var amount_to_indent_by_per_comment = 50;
  var amount_to_indent_by = amount_to_indent_by_per_comment * replyCount(post.loc_of_comment_in_forum);

  var val = post.post_id_rel_to_user;

  var content = post.content;

  var userName = post.user_name;

  var loc_of_comment_in_forum = post.loc_of_comment_in_forum;

  

  var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

  comment.append("<p hidden class = hiddenUserNameValue value = "+userName+"></p>");
  comment.append("<p hidden class = hiddenValValue value = " + val + "></p>");
  comment.append("<p hidden class = hiddenHistoryValue value = "+loc_of_comment_in_forum+"></p>");

  //need to try!!!
  //var cssCode0 = "#comment_container_"+val+"{text-indent: " + amount_to_indent_by +"px;}";

  //css code for moving the buttons over 


  //this is where you apply the code for moving the buttons over. 
  //to future self: I only push the edit button over, because that causes all the other buttons to be moved over. 
  

  //&nbsp

  //using a paragraph element 
  comment.append("<p id = comment_"+val+" class = comment_p>" + content + "</p>");

  //comment_ta means comment_textarea
  comment.append("<textarea id = T"+val+" class = 'comment_ta' ></textarea>");

  //set the comment text area to hold the post
  comment.children(".comment_ta").val(content);

  // comment.append("--" + userName);

  comment.append("<div id = user_name_"+val+" class = user_name > --" + userName + "</div>");

  comment.append("<br>");


  // comment.append("<div id = loc_of_comment_in_forum_" + val + " ></div>");

  // if(loc_of_comment_in_forum != ""){

  //   // comment.children("#loc_of_comment_in_forum_" + val).val(loc_of_comment_in_forum);
  //   comment.children("#loc_of_comment_in_forum_" + val).value = loc_of_comment_in_forum;
  // }  


  if(loc_of_comment_in_forum != ""){

    comment.append("<div id = loc_of_comment_in_forum_"+val+" > reply history: " + loc_of_comment_in_forum + "</div>");
  
  }
  

  comment.append("<br>");

  comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

  comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

  //save changes to the comment
  comment.append("<button id = S"+val+" class = 'save_edit' onclick = save_changes_to_comment(this);>save</button>");

  //cancel changes to the comment
  comment.append("<button id = C"+val+" class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

  comment.append("<button id = R"+val+" class = 'reply_to_comment';>reply</button>");

  //cancel reply (not needed, we will be at the reply code at this point)
  //comment.append("<button id = C_reply class = 'dont_change_comment' onclick = cancel_reply_comment(this);>cancel2</button>");



  //show comment_p
  comment.children(".comment_ta").hide();//don't show comment text area
  //show user name 
  //(if there) show reply history
  //show edit
  //show delete
  comment.children(".save_comment").hide();//don't show save
  comment.children(".dont_change_comment").hide();//dont show cancel 
  //show reply


  var cssCode1 = "#comment_"+val+"{text-indent: " + amount_to_indent_by +"px;}";//push over comment_p
  var cssCode2 = "#T"+val+"{text-indent: " + amount_to_indent_by +"px;}";//push over comment_ta
  var cssCode3 = "#user_name_"+val+"{text-indent: " + amount_to_indent_by +"px;}"; //push over user name 
  var cssCode4 = "#loc_of_comment_in_forum_"+val+"{margin-left: " + amount_to_indent_by +"px;}";//push over history
  var cssCode5 = "#E"+val+"{margin-left: " + amount_to_indent_by +"px;}";//push over all of the buttons

  comment.append("<style id = comment_style_" + val + ">"+ cssCode1 + cssCode2 + cssCode3 + cssCode4 + cssCode5+ "</style>");

  return comment;


}


function comment_object_body_helper_reply(userName,stringHistory){

  console.log("stringHistory is: " + stringHistory);
  console.log("stringHistory is of type: " + typeof(stringHistory));

  var amount_to_indent_by_per_comment = 50;
  var amount_to_indent_by = amount_to_indent_by_per_comment * replyCount(stringHistory);

  console.log("amount_to_indent_by is: " + amount_to_indent_by);

  var comment = $("<div id = comment_container_reply class = comment_container></div>");

  comment.append("<p hidden class = hiddenUserNameValue value = "+userName+"></p>");
  comment.append("<p hidden class = hiddenValValue value = reply ></p>");
  comment.append("<p hidden class = hiddenHistoryValue value = "+stringHistory+"></p>");

  

  // if(stringHistory != ""){

  //   comment.append("<div id = loc_of_comment_in_forum_reply > reply history: " + stringHistory + "</div>");
  
  // }

  //   comment.append("<div id = loc_of_comment_in_forum_reply > reply history: " + stringHistory + "</div>");

  //this is where you apply the code for moving the buttons over. 
  //to future self: I only push the edit button over, because that causes all the other buttons to be moved over. 
  comment.append("<style id = comment_style_reply ></style>");

  //comment.append("<p id = P_reply class = comment_p></p>");

  //comment_ta means comment_textarea
  comment.append("<textarea id = T_reply  class = 'comment_ta' ></textarea>");

  //comment.append("<div id = user_name_reply class = user_name > 33--" + userName + "</div>");

  comment.append("<br>");

  //comment.append("<button id = E_reply class = 'edit_comment' onclick=edit_comment(this);>edit2</button>");

  //comment.append("<button id = D_reply class = 'delete_comment' onclick = delete_this_comment(this);>delete2</button>");

  comment.append("<button id = S_reply class = 'save_comment';>save reply</button>");

  comment.append("<button id = C_reply class = 'dont_change_comment' onclick = cancel_reply_comment(this);>cancel reply</button>");

  // comment.append("<button id = R_reply class = 'reply_to_comment' onclick = reply_to_this_comment(this);>reply2</button>");
  //comment.append("<button id = R_reply class = 'reply_to_comment';>reply2</button>");//no need


  //not save and not cancel. everything else though 

  
  

  //comment.children(".P_reply").hide();//don't show comment_p
  // show comment text area
  //comment.children(".user_name_reply").hide();//don't show user name 
  //(if there is one) show reply history
  //comment.children(".edit_comment").hide();//don't show edit
  //comment.children(".delete_comment").hide();//don't show delete
  //show save
  //show cancel 
  //don't even have the reply code here. 


  //css code for moving the buttons over 
  var cssCode1 = "#T_reply {margin-left: " + amount_to_indent_by +"px;}";
  var cssCode2 = "#S_reply {margin-left: " + amount_to_indent_by +"px;}";//push over all of the buttons

  comment.append("<style id = comment_style_reply>"+ cssCode1 + cssCode2 + "</style>");

  return comment;


}

//----------------------------


//example of input string: mike*23@jake*76@pickles*43

//the proper input is something like this: mike*23@jake*76@pickles*43
//however, if a hacker messes with it, no biggie. This is just for formating on the user end. 
//note: need to change it (on server side) so that when you add a single user to the history string,
//that you also add a '@' at the end of it. 
function replyCount(string){

  var count = 1;

  if(string == ""){
    return 0;
  }
  else{

    for(var i = 0; i < string.length; i++){

      var character = string[i];

      if(character == '@'){
        count += 1;
      }

    }

  }


  return count;
}



