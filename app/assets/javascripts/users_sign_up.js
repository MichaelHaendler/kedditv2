
 
$(document).ready(function(){

	var user_name_okay = null; //true if okay, false if not okay, null if empty. 
	var passwords_match = null; //true if match, false no match, null if both are empty. 

  //checkbox on whether or not to show the passwords entered
  $("#signup_view_password_checkbox").click(function(){
  	// console.log("got here");
  	// console.log(document.getElementById("signup_view_password_checkbox"));
  	//password and pasword confirm ar the ids of the password fields.
    hideFields(this,"password","password_confirm");
  });

  //sees if user name has been taken by someone else or not. 
  $("#sign_up_view_poss_new_user_name").keyup(function(){
	//console.log("getting into here at least");
	user_name_okay = run_user_name_code("sign_up_view_user_lookup_results","sign_up_view_poss_new_user_name");
  
  	finalCheck(user_name_okay,passwords_match);

  });

  //--confirm passwords (strings) are the same. 
  $(".new_view_password").keyup(function(){
    //console.log('here');
    passwords_match = run_password_check_code("comparison_results","password","password_confirm");

    finalCheck(user_name_okay,passwords_match);
  });

});

function finalCheck(user_name_okay,passwords_match){

	// console.log("user_name_okay is: " + user_name_okay);

	// console.log("passwords_match is: " + passwords_match);

	if(user_name_okay && passwords_match){
	    
	    var marq = document.getElementById("comparison_results");
	    // console.log("marq is: " + marq.innerHTML);
	    var button = document.createElement('button');
	    button.innerHTML = "create account";
	    button.id = "comparison_results";
	    marq.parentNode.appendChild(button);
	    marq.parentNode.removeChild(marq);	
	 // console.log("button type is: " + document.getElementById("comparison_results").tagName);


	}

}

//passC == password confirmation
function run_password_check_code(place_results_at,pass,passC){

    return signup_view_password_confirmation_print(place_results_at,pass,passC);

}

//res == results
//pUserName == (possible) user name
function run_user_name_code(res,pUserNameID){

	var pUserName = document.getElementById(pUserNameID).value;

	//console.log("return is: " + meets_requirements(pUserNameID));

	if(pUserName != ""){

		if(meets_requirements(pUserName)){

			if(user_name_not_taken(pUserName)){
				document.getElementById(res).innerHTML = "(avaiable!)";	
				return true; //user name okay and, not taken.
			}
			else{
				document.getElementById(res).innerHTML = "(Taken) Please choose something else.";
			}
		}
		else{
			document.getElementById(res).innerHTML = "please include a number in your user name.";
			return false; //user name NOT okay, doesn't meet requirements.
		}

	}
	//if it IS a blank string
	else{
		document.getElementById(res).innerHTML = "User name";
	}



	//showButtonCheck(user_name_not_taken);

}

//f1 == field1, f2 == field2
function hideFields(checkBox,f1,f2){

  if(checkBox.checked == true){
      document.getElementById(f1).type="password";
      document.getElementById(f2).type="password";
      //console.log("show as text");
  }
  else{
      document.getElementById(f1).type="text";
      document.getElementById(f2).type="text";
      //console.log("show as password");
  }

}


//user_name_meets_syntax_requirements
// run_last_checks
//res ==id of where to output results to
//NOT being used. 
// function run_last_checks(res,id){

//   //console.log("got into check_if_user_name_already_exists");

//   var poss_user_name = document.getElementById(id).value;

//   //if it meets the requirements and say whether or not the user name is taken.
//   //otherwise, we display nothing.
//   if(meets_requirements(poss_user_name)){

//   		document.getElementById(res).innerHTML = "(avaiable!)";
//   }
//   else{
//     document.getElementById(res).innerHTML = "User name";
//   }
// }


function user_name_not_taken(poss_user_name){
  
  // console.log("got into ajax_code_boolean_version");

  var params = { data: poss_user_name };  
  var ret_val = true; //return value. default value is true (meaning that the user name is taken)
  $.ajax({
      type: "POST",
      url: "/users/sign_up_helper/?format=json",
      data: params,
      dataType: "json",
      traditional: true,
      async:false,
      success: function(data){
        ret_val = !data.exists;
      }

  });

  return ret_val;

}

//new_view_password_confirmation_print
//comp_res == comparison results
function signup_view_password_confirmation_print(comp_res,s1,s2){


	// console.log("(signup_view_password_confirmation_print)");

	// console.log("s1 is: " + document.getElementById(s1).tagName);

	// console.dir("and the test results are: " + document.getElementById(s1)); 

	var pass = document.getElementById(s1).value;
	var passC = document.getElementById(s2).value;

	// document.writeln("pass2 is: \"" + pass2 + "\"" + "\n");

	// document.write("pass3 is: \"" + pass3 + "\"");

	if(pass != "" && passC != ""){

	  if(pass == passC){

	    if(is_not_a_button(comp_res)){
		    document.getElementById(comp_res).innerHTML = "match!";
		    return true;
	    }
	    else{
		    var marq = document.getElementById("comparison_results");
		    // console.log("marq is: " + marq.innerHTML);
		    var text_input = document.createElement('p');
		    text_input.innerHTML = "match!";
		    text_input.id = "comparison_results";
		    marq.parentNode.appendChild(text_input);
		    marq.parentNode.removeChild(marq);

		    return true;

	    }

	  }
	  else{
	    // //document.write("NO match!");
	    // document.getElementById(comp_res).innerHTML = "NO match!";
	    // return false;

	    if(is_not_a_button(comp_res)){
		    document.getElementById(comp_res).innerHTML = "NO match!";
		    return false;
	    }
	    else{
		    var marq = document.getElementById("comparison_results");
		    // console.log("marq is: " + marq.innerHTML);
		    var text_input = document.createElement('p');
		    text_input.innerHTML = "NO match!";
		    text_input.id = "comparison_results";
		    marq.parentNode.appendChild(text_input);
		    marq.parentNode.removeChild(marq);

		    return false;

	    }	    



	  }


	}
	else{
	    var marq = document.getElementById("comparison_results");
	    // console.log("marq is: " + marq.innerHTML);
	    var text_input = document.createElement('p');
	    text_input.innerHTML = "nothing to compare.";
	    text_input.id = "comparison_results";
	    marq.parentNode.appendChild(text_input);
	    marq.parentNode.removeChild(marq);
	  //document.write("nothing to compare.");
	  //document.getElementById(comp_res).innerHTML = ;
	  return null;
	}

}

function is_not_a_button(id){

	// console.log("id is: " + id);

	// console.log("comparison_results is: " + document.getElementById("comparison_results").tagName);

	return document.getElementById(id).tagName != "BUTTON";

}


function meets_requirements(poss_user_name){

  var minLength = 4; //minimum user name length

  //var s1 = 

  //console.log(poss_user_name.length >= minLength ? "poss_user_name.length >= minLength is: true" : "poss_user_name.length >= minLength is: false");

  //console.(/[0-9]/.test("ab3c"));

 //  poss_user_name = "abcd";

// console.log("poss_user_name is: " + poss_user_name);
//  var zoom1 = poss_user_name.match(/[0-9]/);
//  console.log("zoom1 is: " + zoom1);
	//debugger

 //  var blah = 1 + parseInt(poss_user_name.match(/[0-9]/));

 //  console.log("555result is: " + blah);

 //  console.log("6result is: " + poss_user_name.match(/[0-9]/).isNaN());



  //console.log(poss_user_name.match(/[0-9]/) ? "poss_user_name.match(/[0-9]/) is: true"  : "poss_user_name.match(/[0-9]/) is: false"); 

  if(poss_user_name.length >= minLength &&
    poss_user_name.match(/[0-9]/)){
    //console.log("(meets_requirements) returned true");
    return true;
  }
  else{
    return false;
  }
}
