

$(document).ready(function(){

	var user_name_okay = null; //true if okay, false if not okay, null if empty. 
	var passwords_match = null; //true if match, false no match, null if both are empty. 

  do_in_case_of_page_reload();

  //checkbox on whether or not to show the passwords entered
  $("#signup_view_password_checkbox").click(function(){
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
	// console.log("now in password finalCheck");

	//if the user name is okay and the passwords are okay, show button and hide text. 
	if(user_name_okay && passwords_match){
		// console.log("everything okay ");
		show_button_hide_text();
	}
	//otherwise, hide button and show text (that was last put there). 
	else{
		// console.log("everything NOT okay ");
		var sb = document.getElementById("submit_button");
		sb.hidden = true;

		//show text.
		var cr = document.getElementById("comparison_results");
		cr.style = "display";

	}

}

function show_button_hide_text(){

	//show button
	var sb = document.getElementById("submit_button");
	sb.hidden = false;


	//hide text	
	var cr = document.getElementById("comparison_results");
	//console.log("finished here");
	cr.innerHTML = "";
	//cr.style = "display:none";
	// cr.style = "hidden";
	// console.log("cr is:");
	// console.log(cr);


}

function hide_button_show_text(text_to_show){

	//hide button
	var sb = document.getElementById("submit_button");
	sb.hidden = true;

	//show text.
	var cr = document.getElementById("comparison_results");
	cr.style = "display";
	cr.innerHTML = text_to_show;

}

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
//says (directly in the html page itself) whether or not the passwords
//entered meet the required standards.  
function signup_view_password_confirmation_print(comp_res,s1,s2){


	//console.log("(signup_view_password_confirmation_print)");

	// console.log("s1 is: " + document.getElementById(s1).tagName);

	// console.dir("and the test results are: " + document.getElementById(s1)); 

	var pass = document.getElementById(s1).value;
	var passC = document.getElementById(s2).value;

	if(pass != "" && passC != ""){

	 //if the strings equal each other, then...
	  if(pass == passC){

 		//if the html element is not hidden (meaning that we haven't gotten
 		//to the point of hiding it and showing it as a button...then set it to
 		//say 'match'
	    if(is_not_hidden(comp_res)){
		    document.getElementById(comp_res).innerHTML = "match!1";
		    return true;
	    }
	    //if it IS hidden, then...hide the button, and show it. 
	    else{
	    	hide_button_show_text("match!2");
		    return true;
	    }

	  }
	  //if the strings don't match each other...
	  else{

	  	//if text area is not hidden...then just set it normally. 
	    if(is_not_hidden(comp_res)){
		    document.getElementById(comp_res).innerHTML = "NO match!";
		    return false;
	    }
	    //if text area IS hidden (meaning input had been said to be okay previous, but
	    //no longer is)...hide the button and show the text. 
	    else{
	    	hide_button_show_text("match!3");
		    return false;

	    }	    



	  }


	}
	else{
		convert_button_to_nothing_to_compare_text();
	  return null;
	}

}


function is_not_hidden(id){

	console.log(document.getElementById(id));

	return document.getElementById(id).style.visibility != 'hidden';
}

function meets_requirements(poss_user_name){

  var minLength = 4; //minimum user name length

  if(poss_user_name.length >= minLength &&
    poss_user_name.match(/[0-9]/)){
    //console.log("(meets_requirements) returned true");
    return true;
  }
  else{
    return false;
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

	//if it's not a blank string
	if(pUserName != ""){

		//and it meets the requirements
		if(meets_requirements(pUserName)){

			//and it isn't taken
			if(user_name_not_taken(pUserName)){
				document.getElementById(res).innerHTML = "(avaiable!)";	
				return true; //user name okay and, not taken.
			}
			//if it IS taken
			else{
				document.getElementById(res).innerHTML = "(Taken) Please choose something else.";
			}
		}
		//if it doesn't meet requirements...
		else{
			document.getElementById(res).innerHTML = "please include a number in your user name.";
			return false; //user name NOT okay, doesn't meet requirements.
		}

	}
	//if it IS a blank string
	else{
		document.getElementById(res).innerHTML = "User name";
	}

}

function meets_requirements(poss_user_name){

  var minLength = 4; //minimum user name length

  if(poss_user_name.length >= minLength &&
    poss_user_name.match(/[0-9]/)){
    //console.log("(meets_requirements) returned true");
    return true;
  }
  else{
    return false;
  }
}

//test if user name is okay ()
function do_in_case_of_page_reload(){

	

}