
//http://stackoverflow.com/questions/11462044/accessing-javascript-variable-in-embedded-ruby
// function f1() {
//   var user_name = "<%= escape_javascript(a_ruby_variable) %>";
//   // Or, more concisely:
//   var user_uid = "<%=j another_ruby_variable %>";
//   }
//on save, we'll compare the textarea to p, do any saving server side, and make the p and textarea hold the same thing again.
function edit_comment(editButton){

  //get whole block 
  var commentBlock = $(editButton).parent();

  //hide edit and delete buttons, and hide text.

  commentBlock.children(".edit_comment").hide();

  commentBlock.children(".delete_comment").hide();

  commentBlock.children(".comment_p").hide();


  //show save and cancel buttons, and show text area. 

  commentBlock.children(".save_comment").show();

  commentBlock.children(".dont_change_comment").show();

  commentBlock.children(".comment_ta").show();
  //debugger
}