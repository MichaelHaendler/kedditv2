

// function delete_this_comment(delButton){
  function delete_this_comment(delButton,userName,subKedditName,forumUniqueNum,forumTitle){

  console.log("222now in delete_this_comment()");

  // var userName = "<%= session[:user_name] %>";

  // var subKedditName = "<%= params[:sub_keddit_name] %>";  

  // var forumUniqueNum = <%= params[:forum_unique_num] %>;

  // var forumTitle = "<%= params[:forum_title] %>";

 
  //console.log(delButton);//if documented out, the code might not run properly. Don't understand it either.

  var id_string = delButton.id;

  //console.log("id_string is: " + id_string);

  //console.log("$(delButton).id is: " + $(delButton).id);

  var post_id_rel_to_user = getNum(id_string);

  var toDo = "delete";
      
  //var toDo = $(delButton).parent().child('.comment_p').val();


  console.log("444 now in delete_this_comment()");
  

  var params = { user_name: userName, 
                  sub_keddit_name: subKedditName, 
                  forum_title: forumTitle, 
                  forum_unique_num: forumUniqueNum, 
                  to_do: toDo,
                  post_id_rel_to_user: post_id_rel_to_user
                }; 

  console.log("params is: ");
  console.log(params);


  //var ret_val = true; //return value. default value is true (meaning that the user name is taken)

  //var url_string = "/users/delete_post_helper/?format=json";

  var url_string = "/forums/modify_post_from_this_forum/?format=json";

  $.ajax({
      type: "POST",
      url: url_string,
      data: params,
      dataType: "json",
      traditional: true,
      async: false,
      success: function(data){

        //console.log(delButton);

        console.log("now deleting button");
        //$(delButton).delete();
        $(delButton).parent().remove();


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


function getNum(id_string){

  console.log("id_string is: " + id_string);


  var start = 1;//# of chars in 'D23'

  var end = id_string.length;

  var num = parseInt(id_string.slice(start,end));

  console.log("(get_post_id_from_delete_id) returning number " + num);

  return num;


}

