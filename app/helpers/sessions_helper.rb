

module SessionsHelper


  def clear_session
    logger.debug "start of clear_session--------------------------------------"

    reset_session

    logger.debug "end of clear_session--------------------------------------"
  end

  # Logs in the given user.
  def log_in(user)
    session[:id] = user.id
    session[:user_name] = user.user_name
    session[:password_hash] = user.password_digest
    #debugger
  end

  # def current_user()

  #   if session[:id]
  #     User.find(session[:id])
  #   else
  #     p "session[:id] not currently defined. No current signed in user."
  #     return nil
  #   end
    
  # end

  def current_user()

    return User.find_by(user_name: session[:user_name], password_digest: session[:password_hash])
    
  end

  def successfully_signed_in
  	logger.debug "start of successfully_signed_in2222--------------------------------------"

    # p "output for params[:session][:user_name] is: #{params[:session][:user_name]}"

    #p "output for params[:session][:user_name].downcase is: #{params[:session][:user_name].downcase}"

#"@user.inspect is: #<ActiveRecord::Relation [#<User id: 10, name: nil, password: \"a\", user_name: \"Mike1\", password_confirmation: nil, created_at: \"2015-02-08 21:44:52\", updated_at: \"2015-02-08 21:44:52\", email: \"dasdasdsd\", admin: false>]>"
    @user = User.where("lower(user_name) = ?", params[:session][:user_name].downcase).first
  	
    #debugger

#"@user.inspect is: #<User id: 10, name: nil, password: \"a\", user_name: \"Mike1\", password_confirmation: nil, created_at: \"2015-02-08 21:44:52\", updated_at: \"2015-02-08 21:44:52\", email: \"dasdasdsd\", admin: false>"
    #@user = User.find_by(user_name: params[:session][:user_name])

    p "2222@user.inspect is: #{@user.inspect}"

    #p "@user[0] is: #{@user.password}"

    p "params[:session] is: #{params[:session]}"

    p "params[:session][:password] is: #{params[:session][:password]}"

    p "444@user.password is: #{@user.password}"

    #debugger


  	if !@user.nil? && @user.password == params[:session][:password]
  		p "logging in user"
  		log_in @user
  		return true
  	else
  		p "NOTTT logging in user"
  		return false
  	end
  	
  	logger.debug "END of successfully_signed_in22222--------------------------------------"
  end


end
