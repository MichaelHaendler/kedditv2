


$(document).ready(function(){

  // var val = document.getElementById("password-checkbox");
  // debugger
  // show(val);

  // $(".password-checkbox2").click(function(){
  //   show(this);
  // });

  //using class here because I want all password fields to be
  //able to use this code.
  //--for showing password 

// idea:

// -make a show_fields button that will accept the id names as params 
// -get the password confirm working


  // $(".password-checkbox2").click(function(){
  //   show(this);
  // });

  //idea: turn inputs into array so that the functions are reuseable. 







  //--check if user name exists
  // $("#user_name").keyup(function(){
  //   //console.log("getting into here at least");
  //   check_if_user_name_already_exists();
  // });

//-------------------------------------------------------------------
//the parts listed below basically work (just need to make sure you're using the right ids)

  //checkbox that asks whether or not to display the password. 
    $("#sign_in_view_password_checkbox").click(function(){
    show(this,"password");
  });

  // //checkbox on whether or not to show the passwords entered
  // $("#new_view_password_checkbox").click(function(){
  //   showFields(this,"password","password_confirm");
  // });

  // //sees if user name has been taken by someone else or not. 
  // $("#new_view_new_user").keyup(function(){
  //   //console.log("getting into here at least");
  //   check_if_user_name_already_exists("new_view_user_lookup_res","new_view_new_user");

  //   showButtonCheck();
  // });

  // //--confirm passwords (strings) are the same. 
  // $(".new_view_password").keyup(function(){
  //   //console.log('here');
  //   new_view_password_confirmation_print("comparison-results","password","password_confirm");

  //   showButtonCheck();
  // });

  // $("#new_view_submit_button").hide();

  //if everything required has been submitted and meets your satisfaction...

});


function showButtonCheck(){

  //console.log("got into showButtonCheck");

//if this works, then replace code and make button. 
  if(meets_requirements_for_submitting(document.getElementById("new_view_new_user").value,
                                       document.getElementById("password").value,
                                       document.getElementById("password_confirm").value
                                       )
    ){

    //console.log("meets_requirements_for_submitting returned the value of true");

    //$("#comparison-results").name = "user[password]";

    //replace the "stings match" bit with the actual button for submitting. 
     //var marq = document.getElementsByTagName('marquee')[0];
     var marq = document.getElementById("comparison-results");
    // console.log("marq is: " + marq.innerHTML);
     var button = document.createElement('button');
     button.innerHTML = "create account";
     button.id = "comparison-results";
      marq.parentNode.appendChild(button);
      marq.parentNode.removeChild(marq);
  }


}

//user name to see if it's taken
function meets_requirements_for_submitting(userName, password, passwordC){

  // console.log("got into meets_requirements_for_submitting()");
  // console.log("userName is: " + userName);
  // console.log("password is: " + password);
  // console.log("passwordC is: " + passwordC);

  var user_name_open = user_name_meets_requirements(userName);

  var check_for_blank_values = (userName != "" && password != "" && passwordC != "");

  //console.log("check_for_blank_values is: " + check_for_blank_values);

  var passwords_match = (password == passwordC);

  //console.log("passwords_match is: " + passwords_match + "(fine if it matches on blank due to check_for_blank_values variable)");


  

  if(check_for_blank_values && passwords_match && user_name_open){
      //console.log("returning true for meets_requirements_for_submitting WORKED!!!!!!");
      return true;
      }
  else{
      // console.log("--------------------")
      // console.log("check_for_blank_values is: " + check_for_blank_values);
      // console.log("passwords_match is: " + passwords_match);
      // console.log("user_name_open is: " + user_name_open);
      // console.log("returning !FALSE! for meets_requirements_for_submitting");
    return false;
  }


}

//res ==id of where to output results to
function user_name_meets_requirements(poss_user_name){

  if(meets_requirements(poss_user_name)){
    var ajax_results = ajax_code_boolean_version(poss_user_name);
    //console.log("(user_name_meets_requirements) ajax_results is: " + ajax_results);
    return !ajax_results;
  }
  else{
    return false;
  }

}

function ajax_code_boolean_version(poss_user_name){
  
  // console.log("got into ajax_code_boolean_version");
  // console.log("(ajax_code_boolean_version) poss_user_name is: " + poss_user_name);

  var params = { data: poss_user_name };  

  $.ajax({
      type: "POST",
      url: "/users/sign_up_helper/?format=json",
      data: params,
      dataType: "json",
      traditional: true,
      success: function(data){
        // document.getElementById("test3").innerHTML = dataz.res[0].user_name;
        // console.log("dataz.res[0].user_name is: " + dataz.res[0].user_name);
        // console.log(dataz)
        if(data.exists){
          //console.log("(ajax_code_boolean_version) returning true");
          return true;
        }
        else{
         //console.log("(ajax_code_boolean_version) returning false");
          false;
        }
        //console.log("dataz.exists is: " + dataz.exists);
        //console.log(dataz)
      }

  });

}


// document.addEventListener("DOMContentLoaded", function(event) { 
  
//   console.log("GOT HERE!!!!!!!");
// 	var res = document.querySelector(".password-checkbox2");
	
//   // if(res.checked){
//   //   debugger
//   // }
//   //debugger

// 	show(res);

// });

function show(checkBox,res){

  //console.log("got into show");
  //debugger

  if(checkBox.checked == true){
      document.getElementById(res).type="password";
      //console.log("show as text");
  }
  else{
      document.getElementById(res).type="text";
      //console.log("show as password");
  }


}

//f1 == field1, f2 == field2
function showFields(checkBox,f1,f2){

  //console.log("got into show");
  //console.log(checkBox)
  //debugger
  

  if(checkBox.checked == true){
      document.getElementById(f1).type="text";
      document.getElementById(f2).type="text";
      //console.log("show as text");
  }
  else{
      document.getElementById(f1).type="password";
      document.getElementById(f2).type="password";
      //console.log("show as password");
  }




}


//res ==id of where to output results to
function check_if_user_name_already_exists(res,id){

  //console.log("got into check_if_user_name_already_exists");

  //console.log("id is: " + id);

  var poss_user_name = document.getElementById(id).value;

  //console.log("poss_user_name is: " + poss_user_name);

  // console.log("res is: " + document.getElementById(res));


  //if it meets the requirements and say whether or not the user name is taken.
  //otherwise, we display nothing.
  if(meets_requirements(poss_user_name)){
    //console.log("got into if body of check_if_user_name_already_exists");
    ajax_code(res,poss_user_name);
  }
  else{
    document.getElementById(res).innerHTML = "User name";
  }
}

//to add a user name requirement, add an else if statment, and have
//it return true
function meets_requirements(poss_user_name){

  var minLength = 4; //minimum user name length



  //console.log("got into meets_requirements");
  //console.log("(meets_requirements) poss_user_name is: " + poss_user_name);
  //if(true){
  if(poss_user_name.length >= minLength &&
    poss_user_name.match(/[0-9]/) ){
    //console.log("(meets_requirements) returned true");
    return true;
  }
// else if (condition2) {
// }
  else{
    //console.log("NOTTTT working");
    //console.log("(meets_requirements) returned false");
    return false;
  }
}

function ajax_code(res,poss_user_name){
  //console.log("got into poss_user_name");

  var params = { data: poss_user_name };  

  $.ajax({
      type: "POST",
      url: "/users/sign_up_helper/?format=json",
      data: params,
      dataType: "json",
      traditional: true,
      success: function(dataz){
        // document.getElementById("test3").innerHTML = dataz.res[0].user_name;
        // console.log("dataz.res[0].user_name is: " + dataz.res[0].user_name);
        // console.log(dataz)
        if(dataz.exists){
        document.getElementById(res).innerHTML = "(taken.) Please choose something else.";
        }
        else{
          document.getElementById(res).innerHTML = "(avaiable!)";
        }
        //console.log("dataz.exists is: " + dataz.exists);
        //console.log(dataz)
      }

  });

}

  //comp_res == comparison results
  function new_view_password_confirmation_print(comp_res,s1,s2){

    var pass = document.getElementById(s1).value;
    var passC = document.getElementById(s2).value;

    // document.writeln("pass2 is: \"" + pass2 + "\"" + "\n");
    
    // document.write("pass3 is: \"" + pass3 + "\"");

    if(pass != "" && passC != ""){

      if(pass == passC){

        //document.write("match!");
        document.getElementById(comp_res).innerHTML = "match!";
      }
      else{
        //document.write("NO match!");
        document.getElementById(comp_res).innerHTML = "NO match!";
      }


    }
    else{
      //document.write("nothing to compare.");
      document.getElementById(comp_res).innerHTML = "nothing to compare.";
    }
    
  }


  function password_confirmation_print(){

    var pass2 = document.getElementById('password2').value;
    var pass3 = document.getElementById('password3').value;

    // document.writeln("pass2 is: \"" + pass2 + "\"" + "\n");
    
    // document.write("pass3 is: \"" + pass3 + "\"");

    if(pass2 != "" && pass3 != ""){
      if(pass2 == pass3){

        //document.write("match!");
        document.getElementById("demo").innerHTML = "match!";
      }
      else{
        //document.write("NO match!");
        document.getElementById("demo").innerHTML = "NO match!";
      }


    }
    else{
      //document.write("nothing to compare.");
      document.getElementById("demo").innerHTML = "nothing to compare.";
    }
    
  }


// ------------------------------------

//  $ ()->
//  	$(".password-checkbox2").click (e)->
//  		show(this)



//  show = (input)->
//  	debugger
//  	if input.checked == true 
//  		document.getElementById('zonker').type="text"
//  	else
//  		document.getElementById('zonker').type="password"


// ------------------------------------


	




