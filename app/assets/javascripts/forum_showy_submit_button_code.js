

//note: can make this function more efficient by having it just display the new post instead
//of just redisplaying all of them (and now including the new one)
function post_submission2(textarea_id,sub_keddit_name, forum_unique_num, forum_title){
//function ps(textarea_id){
  
  console.log("!!!22got into ajax_code_boolean_version");

  // console.log(textarea_id);

  var submission = $(textarea_id).val();

  //var submission = $(textarea_id).data('sub_keddit_name');

  console.log("submission is: " + submission);

  console.log("sub_keddit_name is: " + sub_keddit_name);

  console.log("forum_unique_num is: " + forum_unique_num);

  console.log("forum_title is: " + forum_title);



  //url: "/users/submit_post_helper/?format=json",

  // var params = { id: user_id , content: submission }; 
  var params = { submission: submission, 
                sub_keddit_name: sub_keddit_name, 
                forum_unique_num: forum_unique_num, 
                forum_title: forum_title}; 
  //var ret_val = true; //return value. default value is true (meaning that the user name is taken)


  console.log("111222333sub_keddit_name is: " + sub_keddit_name);

  //var url_string = "/sub_keddits/" + sub_keddit_name + "/forums/" + forum_unique_num.toString() + "/" + forum_title + "/?format=json";

  //var url_string = "/sub_keddits/" + sub_keddit_name + "/forums/" + forum_unique_num.toString() + "/" + forum_title;

  var url_string = "/forums/submit_post_for_this_forum/?format=json";

  //url: "/users/submit_post_helper_for_this_forum/?format=json",

  $.ajax({
      type: "POST",
      url: url_string,
      data: params,
      dataType: "json",
      traditional: true,
      async: false,
      success: function(data){
        	
        //document.getElementById("testing_page_text_box").value = "";//clear text box

        //clears the text box (where you typed everything in)
        $(textarea_id).val("");

        //(clear page and) display all posts for particular forum
        //display_all_posts(data);

        //just show the new post. 
        // add_new_post_to_forum(submission,data.post_id_rel_to_user);
         add_new_post_to_forum(data);
        
      }

  });

  //return ret_val;

}