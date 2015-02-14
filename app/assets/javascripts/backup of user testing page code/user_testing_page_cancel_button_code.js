
//get number
//delete start and cancel buttons
//remake edit and delete buttons 
//set back to just being another post (as opposed to text area)
function go_back_to_previous_setup(cancelB){

	var num = getNumber_ofCancelButton(cancelB);

	var container_string = "container_" + num;

	var container = document.getElementById(container_string);

  //document.getElementById("container_11");

	var children_list = container.childNodes;

  console.log("children list is: ");
  console.log(children_list);


    var comment_area = 1;// aka textarea
    var save_button = 2;
    var cancel_button = 3;


    console.log("comment is: ");
    console.log(children_list[comment_area]);//comment
    console.log("save is: ");
    console.log(children_list[save_button]);//save
    console.log("cancel is: ");
    console.log(children_list[cancel_button]);//cancel

	var comment_itself = children_list[comment_area].innerHTML;

  console.log("comment_itself is: " + comment_itself);

    var tempS1 = "#save_" + num;

    var tempS2 = "#cancel_" + num;

    container.removeChild(children_list[comment_area]);
    //container.removeChild($(tempS1));
    //container.removeChild($(tempS2));
    container.removeChild(children_list[save_button]);
    container.removeChild(children_list[1]);//don't get it, but okay. this finalizes removal of all 3 items.
    //container.removeChild(children_list[cancel_button]);
    //debugger



    var commentPara = document.createElement("p");
    commentPara.id = "comment_" + num;
    var node1 = document.createTextNode(comment_itself);
    commentPara.appendChild(node1);

	var editB = document.createElement("BUTTON");
    editB.id = "edit_comment_button" + num;
    editB.className = "edit_comment";
    editB.innerHTML = "edit";
    // var node2 = document.createTextNode("edit");
    // editB.appendChild(node2);

	var deleteB = document.createElement("BUTTON");
    deleteB.id = "delete_comment_button" + num;
    deleteB.className = "delete_comment";
    //deleteB.innerHTML = "delete";
    var node3 = document.createTextNode("delete");
    deleteB.appendChild(node3);
    //debugger
    container.appendChild(commentPara);
    container.appendChild(editB);
    container.appendChild(deleteB);

    console.log("container finally is:");
    console.log(container);

    console.log("here now!!!");

}



function getNumber_ofCancelButton(cancelB){

  var string = cancelB.id;

  var start = 7;//# of chars in 'cancel_'

  var end = string.length;

  var num = parseInt(string.slice(start,end));

  console.log("returning number " + num);

  return num;
}