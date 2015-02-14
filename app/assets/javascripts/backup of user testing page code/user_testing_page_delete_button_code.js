
//delButton is one of the delete_comment_button instances. The number at the end of the id
//is to be used to say which post(by id) is to be deleted. 
//note that I named each delete button delete_comment_button# in order to help preserve
//id uniqueness
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
        display_posts(data);


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

  var start = 21;//# of chars in 'delete_comment_button'

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


function display_posts(data){

  $("#commenters_posts").empty()

    for(var num in data.posts){
      //console.log("does this bug you?");
      //console.log(num);

      var val = data.posts[num].id;

      $("#commenters_posts").append(

       "<div id = container_" + val + "><p id = comment_"+ val + ">" + data.posts[num].content + "</p>" +
       "<button id = edit_comment_button"+val+" class = 'edit_comment'>edit</button>" +
       " " +
       "<button id = delete_comment_button"+val+" class = 'delete_comment'>delete</button></div>"  
      );
    }

}




