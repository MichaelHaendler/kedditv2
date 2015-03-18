

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




// function post_body(post){

      //var commenters_posts = "#commenters_posts";

//     var val = post.post_id_rel_to_user;

//     var content = post.content;

//     var userName = post.user_name;

//     console.log("userName is: " + userName);



//     var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

//     comment.append("<p id = comment_"+val+" class = comment_p>" + content + "</p>");

//     //comment_ta means comment_textarea
//     comment.append("<textarea id = T"+val+" class = 'comment_ta' ></textarea>");

//     comment.children(".comment_ta").val(content);

//     // comment.append("--" + userName);

//     comment.append("<div class = user_name > --" + userName + "</div>");

//     comment.append("<br>");

//     comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

//     comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

//     comment.append("<button id = S"+val+" class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

//     comment.append("<button id = C"+val+" class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

//     comment.append("<button id = R"+val+" class = 'reply_to_comment';>reply</button>");



//     // console.log("child is: ");
//     // console.log(comment.children(".delete_comment"));

//     // console.log("parent is:");
//     // console.log(comment.children(".delete_comment").parent());

//     //$('textarea.comment_ta').val(content);

//     comment.children(".save_comment").hide();
//     comment.children(".dont_change_comment").hide();

//     comment.children(".comment_ta").hide();

//     //and at the end we append. 
//     $(commenters_posts).append(comment);




// }

//works as of 3/1/15
// function post_body(post){

//   var commenters_posts = "#commenters_posts";

//   var comment = comment_body(post);

//   $(commenters_posts).append(comment);

// }

//bad idea since I don't want to do this for every page load. 
function arrangeComments(posts){

  var commenters_posts = "#commenters_posts";

  var initialComments = [];
  var replies = [];
  var finalResults = []; //no need to initially set as an array (do it for clarity)

  var initialsANDreplies = sortPosts(posts);

  initialComments = initialsANDreplies[0]; //array of initial posts

  replies = initialsANDreplies[1]; //array of replies

  initialComments = sort_by_date(initialComments);//sort initial comments 

  for(initialComment of initialComments){

  }

}

function sortPosts(posts){

  for(post of posts){

    //if it's not a reply aka solo
    if(post.inReplyTo_user_name == null){
      soloComments.push(post);
    }
    else{
      //else, if it's not a solo comment (aka a reply)
      replies.push(post);
    }

    soloComments = order_by_date_time(soloComments);

  }



}


// function comment_body(post){

//   var val = post.post_id_rel_to_user;

//   var content = post.content;

//   var userName = post.user_name;

//   var loc_of_comment_in_forum = post.loc_of_comment_in_forum;

//   var amount_to_indent_by = 150;

  

//   //var one_indent = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

//   // console.log("temp2 is: " + temp2);

//   // console.log("userName is: " + userName);

//   var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

//   //css code for moving the buttons over 
//   var cssCode1 = "#comment_"+val+"{text-indent: " + amount_to_indent_by +"px;}";
//   var cssCode2 = "#T"+val+"{text-indent: " + amount_to_indent_by +"px;}";
//   var cssCode3 = "#user_name_"+val+"{text-indent: " + amount_to_indent_by +"px;}";  
//   var cssCode4 = "#E"+val+"{margin-left: " + amount_to_indent_by +"px;}";

//   //this is where you apply the code for moving the buttons over. 
//   //to future self: I only push the edit button over, because that causes all the other buttons to be moved over. 
//   comment.append("<style id = comment_style_" + val + ">"+ cssCode1 + cssCode2 + cssCode3 + cssCode4 + "</style>");


//   //&nbsp

//   //using a paragraph element 
//   comment.append("<p id = comment_"+val+" class = comment_p>" + content + "</p>");

//   //comment_ta means comment_textarea
//   comment.append("<textarea id = T"+val+" class = 'comment_ta' ></textarea>");

//   //set the comment text area to hold the post
//   comment.children(".comment_ta").val(content);

//   // comment.append("--" + userName);

//   comment.append("<div id = user_name_"+val+" class = user_name > --" + userName + "</div>");

//   comment.append("<br>");


//   if(loc_of_comment_in_forum != ""){

//     comment.append("<div id = loc_of_comment_in_forum_ "+val+" > reply history: " + loc_of_comment_in_forum + "</div>");
//   }
  

//   comment.append("<br>");

//   comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

//   comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

//   comment.append("<button id = S"+val+" class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

//   comment.append("<button id = C"+val+" class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

//   comment.append("<button id = R"+val+" class = 'reply_to_comment';>reply</button>");


//   comment.children(".save_comment").hide();//uncomment
//   comment.children(".dont_change_comment").hide();//uncomment

//   comment.children(".comment_ta").hide();//uncomment

//   return comment;

//   //and at the end we append. 


// }


//in case you wanted to use &nbsp for intenting, multiply_string and multiply_string_helper
//would allow you to vary how much indenting was done. 
//note about input:
//'string' input should be something like "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" in order to allow for 
//decent indenting
//num input should be based on the replies. 
//comment A is an original comment, no indents. 
//comment B is a reply to comment A, one indent.
//comment C, is a reply to comment B, 2 incents. 
//comment D is a reply to comment A, one indent.
//etc
function multiply_string(string,num){

  if(num <= 0){
    return "";
  }
  else{
    return multiply_string_helper(string,num,"");

  }

}

function multiply_string_helper(string,num,results){

  if(num == 1){
    var solution = results + string;
    return solution
  }
  else{
    multiply_string_helper(string,num--,results+string);
  }

}


// function comment_body(post){

//   var val = post.post_id_rel_to_user;

//   var content = post.content;

//   var userName = post.user_name;

//   var loc_of_comment_in_forum = post.loc_of_comment_in_forum;

//   var one_indent = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

//   var temp1 = "zoom-";

//   var temp2 = temp1 * 3;

//   console.log("temp2 is: " + temp2);

//   console.log("userName is: " + userName);



//   var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

// //&nbsp

//   //using a paragraph element 
//   comment.append("<p id = comment_"+val+" class = comment_p>" + one_indent + content + "</p>");

//   //comment_ta means comment_textarea
//   comment.append("<textarea id = T"+val+" class = 'comment_ta' ></textarea>");

//   //set the comment text area to hold the post
//   comment.children(".comment_ta").val(content);

//   // comment.append("--" + userName);

//   comment.append("<div class = user_name > --" + userName + "</div>");

//   comment.append("<br>");


//   if(loc_of_comment_in_forum != ""){

//     comment.append("<div class = user_name > reply history: " + loc_of_comment_in_forum + "</div>");
//   }
  

//   comment.append("<br>");

//   comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");

//   comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

//   comment.append("<button id = S"+val+" class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

//   comment.append("<button id = C"+val+" class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

//   comment.append("<button id = R"+val+" class = 'reply_to_comment';>reply</button>");



//   // console.log("child is: ");
//   // console.log(comment.children(".delete_comment"));

//   // console.log("parent is:");
//   // console.log(comment.children(".delete_comment").parent());

//   //$('textarea.comment_ta').val(content);

//   comment.children(".save_comment").hide();
//   comment.children(".dont_change_comment").hide();

//   comment.children(".comment_ta").hide();

//   return comment;

//   //and at the end we append. 


// }


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
  comment.append("<button id = S"+val+" class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

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
  var cssCode4 = "loc_of_comment_in_forum_"+val+"{margin-left: " + amount_to_indent_by +"px;}";//push over history
  var cssCode5 = "#E"+val+"{margin-left: " + amount_to_indent_by +"px;}";//push over all of the buttons

  comment.append("<style id = comment_style_" + val + ">"+ cssCode1 + cssCode2 + cssCode3 + cssCode4 + cssCode5+ "</style>");

  return comment;


}


function comment_object_body_helper_reply(userName,stringHistory){

  var amount_to_indent_by_per_comment = 50;
  var amount_to_indent_by = amount_to_indent_by_per_comment * replyCount(stringHistory);

  var comment = $("<div id = comment_container_reply class = comment_container></div>");

  comment.append("<p hidden class = hiddenUserNameValue value = "+userName+"></p>");
  comment.append("<p hidden class = hiddenValValue value = reply ></p>");
  comment.append("<p hidden class = hiddenHistoryValue value = "+stringHistory+"></p>");

  if(loc_of_comment_in_forum != ""){

    comment.append("<div id = loc_of_comment_in_forum_reply > reply history: " + stringHistory + "</div>");
  
  }

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

  comment.append("<button id = S_reply class = 'save_comment';>save2</button>");

  comment.append("<button id = C_reply class = 'dont_change_comment' onclick = cancel_reply_comment(this);>cancel2</button>");

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
  var cssCode1 = "#comment_reply {text-indent: " + amount_to_indent_by +"px;}";
  var cssCode2 = "#T_reply {text-indent: " + amount_to_indent_by +"px;}";
  var cssCode3 = "#user_name_reply {text-indent: " + amount_to_indent_by +"px;}";  
  var cssCode4 = "loc_of_comment_in_forum_reply {margin-left: " + amount_to_indent_by +"px;}";//push over history
  var cssCode5 = "#E_reply {margin-left: " + amount_to_indent_by +"px;}";//push over all of the buttons

  comment.append("<style id = comment_style_" + val + ">"+ cssCode1 + cssCode2 + cssCode3 + cssCode4 + cssCode5+ "</style>");

  return comment;


// }

//----------------------------

function comment_object_body_v2(){

  // var amount_to_indent_by = 150;
  var amount_to_indent_by_per_comment = 50;
  var amount_to_indent_by;
  var val;
  var content;
  var userName;
  var loc_of_comment_in_forum;


  //the first input is either going to be the string "reply" or a post object

  //if it is not the string "reply", then it is a post object. 
  if(arguments[0] != "reply"){
    var post = arguments[0];
    userName = post.user_name;
    loc_of_comment_in_forum = post.loc_of_comment_in_forum;//need this anyway in order to set up reply's loc_of_comment_in_forum
    content = post.content;
    val = post.post_id_rel_to_user;
    amount_to_indent_by = 0;
    
  }
  //otherwise, it is a reply
  else{
   //the first argument (argument[0]) was the word "reply". The second, is the user name.
   //and the third argument, is the history, so that we know how much to indent the coment. 
   userName = arguments[1];
   loc_of_comment_in_forum = arguments[2];
   content = "";
   val = "reply";
   amount_to_indent_by = amount_to_indent_by_per_comment * replyCount(loc_of_comment_in_forum);//aka loc_of_comment_in_forum



  }




  var comment = $("<div id = comment_container_"+val+" class = comment_container></div>");

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

    comment.append("<div id = loc_of_comment_in_forum_"+val+" class = loc_of_comment_in_forum> reply history: " + loc_of_comment_in_forum + "</div>");
  
  }

  comment.append("<p hidden class = HiddenUserNameValue value = "+userName+"></p>");
  comment.append("<p hidden class = hiddenValValue value = "+val+"></p>");
  comment.append("<p hidden class = hiddenHistoryValue value = "+loc_of_comment_in_forum+"></p>");
  

  comment.append("<br>");

  //opens up comment in text areaserNameValue
  comment.append("<button id = E"+val+" class = 'edit_comment' onclick=edit_comment(this);>edit</button>");
 
  //deletes comment
  comment.append("<button id = D"+val+" class = 'delete_comment' onclick = delete_this_comment(this);>delete</button>");

  //saves the changes made when user edited comment
  comment.append("<button id = S"+val+" class = 'save_comment' onclick = save_changes_to_comment(this);>save</button>");

  //don't make changes 
  comment.append("<button id = C"+val+" class = 'dont_change_comment' onclick = cancel_changes_to_comment(this);>cancel</button>");

  //open up a reply box (no onclick method because it requires the user name of the person that the user is replying to)
  comment.append("<button id = R"+val+" class = 'reply_to_comment'>reply</button>");

  //save reply
  comment.append("<button id = SR"+val+" class = 'save_reply_comment'>save reply</button>"); 

  //cancel reply
  comment.append("<button id = CR"+val+" class = 'cancel_reply_comment'>cancel reply</button>"); 


  if(arguments[0] != "reply"){
    comment.children(".save_comment").hide();//should be save_edit
    comment.children(".dont_change_comment").hide();
    comment.children(".comment_ta").hide();
    comment.children(".save_reply_comment").hide();
    comment.children(".cancel_reply_comment").hide();
  }
  else{
    comment.children(".user_name").hide();
    comment.children(".edit_comment").hide();
    comment.children(".delete_comment").hide();
    comment.children(".save_comment").hide();//should be save_edit
    comment.children(".dont_change_comment").hide();
  }



  var cssCode1 = "#comment_"+val+"{text-indent: " + amount_to_indent_by +"px;}";
  var cssCode2 = "#T"+val+"{text-indent: " + amount_to_indent_by +"px;}";
  var cssCode3 = "#user_name_"+val+"{text-indent: " + amount_to_indent_by +"px;}";  
  var cssCode4 = "#E"+val+"{margin-left: " + amount_to_indent_by +"px;}";

  comment.append("<style id = comment_style_" + val + ">"+ cssCode1 + cssCode2 + cssCode3 + cssCode4 + "</style>");

  return comment;




}

//example of input string: mike*23@jake*76@pickles*43

//the proper input is something like this: mike*23@jake*76@pickles*43
//however, if a hacker messes with it, no biggie. This is just for formating on the user end. 
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



