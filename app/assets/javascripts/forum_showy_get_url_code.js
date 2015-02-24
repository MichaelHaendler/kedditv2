
//http://localhost:3000/sub_keddits/technology/awesome_new_computer

//"/users/delete_post_helper/?format=json",

function get_url(){
  var sub_keddit_name = "<%= escape_javascript(params[:sub_keddit_name]) %>";	

  var forum_title = "<%= escape_javascript(params[:forum_title]) %>";

  url_string = "/sub_keddits/"+ sub_keddit_name +"/" +forum;

  return url_string;
}