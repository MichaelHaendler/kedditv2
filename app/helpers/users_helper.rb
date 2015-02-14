module UsersHelper


  def clear_session
    logger.debug "start of clear_session--------------------------------------"

    reset_session

    logger.debug "end of clear_session--------------------------------------"
  end

  # Logs in the given user.
  def log_in(user)
    session[:id] = user.id
    session[:user_name] = user.user_name
  end

  def successfully_signed_in
  	logger.debug "start of successfully_signed_in111--------------------------------------"

    p "POW POW WOW WOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  	
  	@user = User.find_by(user_name: params[:session][:user_name])

  	if !@user.nil? && @user.password == params[:session][:password]
  		p "logging in user"
  		log_in @user
  		return true
  	else
  		p "NOTTT logging in user"
  		return false
  	end
  	
  	logger.debug "END of successfully_signed_in111--------------------------------------"
  end

	
end
