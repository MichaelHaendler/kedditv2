
//look up which comment is to be edited. D
//save current string/comment. D
//change paragraph element into a typing box (PD)
//allow user to then hit a "save" button
//if after user hits the save button that the new string is different from orig_post, do an ajax update.
//-change old comment into new one. 

//(temporarily) remove edit and delete buttons 
//put in "cancel" and "save" buttons in it's place. 
 
//finally, have the change stay where it currently is. 

var orig_post = "default post value";

//----------

function edit_this_comment(editButton){

  console.log("getting here??????");

  //look up which comment is to be edited.
  var num = getNumber_ofEditButton(editButton);

  //save current string/comment.
  var comment = document.getElementById("comment_" + num);

  //console.log(comment);

  orig_post = comment.value;

  //convert comment to be editable (textarea)
  convert_para_el_to_comment_el(comment);


  var container_string = "container_" + num;

  var container = document.getElementById(container_string);

  //remove edit and delete buttons
  remove_edit_and_delete_buttons(container,num);

  //replace them with cancel and save buttons 
  add_cancel_and_save_buttons(comment,num);

}


function add_cancel_and_save_buttons(comment,num){

    var container_string = "container_" + num; 

    var saveB = document.createElement("BUTTON");
    saveB.id = "save_" + num;
    saveB.class = "save_modifications_to_comment"
    //saveB.innerHTML = "save";
    var node1 = document.createTextNode("save");
    saveB.appendChild(node1);


    var cancelB = document.createElement("BUTTON");
    cancelB.id = "cancel_" + num;
    cancelB.className = "cancel_modifications_to_comment";
    //cancelB.innerHTML = "cancel";
    var node2 = document.createTextNode("cancel");
    cancelB.appendChild(node2);

    // console.log("zoinky");
    // console.log(comment);
    // console.log(saveB);
    // document.body.appendChild(cancelB);
    // document.body.appendChild(saveB);

//<div id="container_23"><p id="comment_23">15) 
    //console.log("container 23 holds:");
    var temp = document.getElementById(container_string);
    //console.log(temp);
    var children_list = temp.childNodes;
    console.log(container_string + "'s children are:");
    console.log(children_list);
      
    //var list = document.getElementById(container_string);
    var edit_button = 0;
    var delete_button = 1;

    //console.log(list);

    temp.removeChild(children_list[edit_button]);
    temp.removeChild(children_list[delete_button]);

    console.log(container_string + "'s children NOW are:");

    console.log(temp.childNodes);


    temp.appendChild(saveB);
    temp.appendChild(cancelB);

    // console.log(comment);
    // console.log(comment.parentNode);
    // comment.parentNode.appendChild(saveB);
    // comment.parentNode.appendChild(cancelB);

}

function remove_edit_and_delete_buttons(container,num){
  // container.removeChild($("edit_comment_button"+num));
  // container.removeChild($("delete_comment_button"+num));
  console.log("333 child nodes were:");
  console.log(container.childNodes);
  $("edit_comment_button"+num).remove();
  $("delete_comment_button"+num).remove();


  var container = document.getElementById("container_" + num);

  console.log("444 child nodes now are:");
  console.log(container.childNodes);

}

//convert a paragraph (p) element to a comment (text area) element
function convert_para_el_to_comment_el(comment){

    //console.log(comment);

    var comment_field = document.createElement('textarea');
    comment_field.id = comment.id;
    //console.log("comment.innerHTML: " + comment.innerHTML);
    //comment_field.placeholder = removeNumbers(comment.innerHTML);//works

    var node1 = document.createTextNode(comment.innerHTML);
    comment_field.appendChild(node1);
    //debugger
    comment.parentNode.appendChild(comment_field);
    comment.parentNode.removeChild(comment);

}

function removeNumbers(comment){
  return comment.slice(3);
}

     // var marq = editButton;
     // var button = document.createElement('button');
     // button.innerHTML = "create account";
     // button.id = "comparison-results";
     //  marq.parentNode.appendChild(button);
     //  marq.parentNode.removeChild(marq);



function getNumber_ofEditButton(htmlEl){

  var string = htmlEl.id;

  var start = 19;//# of chars in 'edit_comment_button'

  var end = string.length;

  var num = parseInt(string.slice(start,end));

  console.log("returning number " + num);

  return num;
}

