class UsersController < ApplicationController

  include SessionsHelper

#User.find_by(id: 3).getPosts()[0].content

  #take comment, look up user, look up post, and change the post. 
  def save_changes_to_comment_helper

    p "getting into save_changes_to_comment_helper"

    p "params[:new_post] is: #{params[:new_post]}"

    p "params[:post_id_num] is: #{params[:post_id_num]}"

    p "session[:id] is: #{session[:id]}"

    #@temp = User.find(session[:id]).getPosts()

    #debugger

    p "User.find(session[:id]).getPosts() is: #{User.find(session[:id]).getPosts().inspect}"

    #get post that we're looking for
    @post = User.find(session[:id]).getPosts().find_by(post_id_rel_to_user: params[:post_id_num])

    p "@post is: #{@post.inspect}"

    #debugger

    #update content
    @post.content = params[:new_post]

    #save changes to it. 
    @post.save

    respond_to do |format|
      format.html

      format.json { render :json => { :status => 'Ok', :message => 'Received'},:status => 200}
                  
    end

  end

	def newPost(post_text)
		#p "post_text is: #{post_text}"

    # p "ZONKERS!!!!!!!!!!!!!!!!!!!!!!!222222222222222"
    # # p self.post
    # p "self.id is: #{id}"
    # Post.blah(self)
    #Post.zoom3()
		#Post.new(User_id: session[:id], content: post_text).save
    Post.newPost(session[:id],post_text)
	end

	def getPosts()
		Post.where(User_id: session[:id])
	end

  def delete_post_helper()

    @user = current_user()

    @user.delPost(params[:post_id])

    #@posts = self.getPosts()

    respond_to do |format|
      format.html
      format.json { render :json => { :status => 'Ok', :message => 'Received'}, :status => 200}
      #format.json { render :json => { :status => 'Ok', :message => 'Received', posts: @posts}, :status => 200}
    end

  end

  #submit post to table. 
  def submit_post_helper
    # p "getting into testing_page_helper action at least!@!@!@!@!@!"

    # p "session[:id] is: #{session[:id]}"
    # p "params[:content] is: #{params[:content]}"

    @results = self.newPost(params[:content])

    @posts = self.getPosts()

    #p "@results is: #{@results}"

    respond_to do |format|
      format.html

      format.json { render :json => { :status => 'Ok', :message => 'Received', posts: @posts, post_was_succesfully_submitted: @results},
                    :status => 200
                  }
    end


  end

  # #submit post to table. 
  # def testing_page_helper
  # 	# p "getting into testing_page_helper action at least!@!@!@!@!@!"

  # 	# p "session[:id] is: #{session[:id]}"
  # 	# p "params[:content] is: #{params[:content]}"

  # 	@results = self.newPost(params[:content])

  # 	p "@results is: #{@results}"

  #   respond_to do |format|
  #     format.html

  #     format.json { render :json => { :status => 'Ok', :message => 'Received', post_was_succesfully_submitted: @results},
  #                   :status => 200
  #                 }
  #   end


  # end

  def testing_page_helper2 
  	p "got into the testing_page_helper2 action!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

  	@posts = self.getPosts()

    respond_to do |format|
      format.html

      format.json { render :json => { :status => 'Ok', :message => 'Received', posts: @posts},
                    :status => 200
                  }
    end

  end

  def testing_page

  	p "got into testing_page-----------------------"

  	@posts = User.find(session[:id]).getPosts()

  	@moreRecent = @posts.length - 1

  	@oldest = 0

    #cookies.permanent[:wowza2] = "this is a just a test. nothing more. 123456";
  end


  def front_page

  end

  def toy1
  end

  def toy2
  end

  def toy3
  end

  def index
  end

  def remember

  end

  def sign_up_helper

    logger.debug "start of sign up helper--------------------------------------"
     p "params[:data] is: #{params[:data]}"

    #  #Client.where("first_name LIKE '%#{params[:first_name]}%'")
    # @val = User.where("user_name LIKE '%#{params[:data]}%'")
    
    # p "val length is: #{@val.length}"

    # #p @val.inspect

    # @val.to_json(:only => [:user_name])

    #@booleanVal = @val.length > 1

    #p "params[:data] is: #{params[:data]}"

    #p User.where("user_name LIKE '%#{params[:data]}%'")

    @booleanVal = User.where("user_name LIKE '%#{params[:data]}%'").exists?

    p "booleanVal is: #{@booleanVal}"

    respond_to do |format|
      format.html

      format.json { render :json => { :status => 'Ok', :message => 'Received', exists: @booleanVal},
                    :status => 200
                  }
    end


    #logger.debug "END of sign up helper----------------------------------------"

  end

#how to do the sqlite searches from within an action.
#http://guides.rubyonrails.org/active_record_querying.html
  def sign_up

    # logger.debug "start of sign up--------------------------------------"

    # #@results = User.select(:user_name).all

    #  @blah = 'Mike2'

    #  @results =  User.find_by user_name: "#{@blah}"

    # #logger.debug @results.inspect

    # logger.debug "end of sign up----------------------------------------"

    @user = User.new
    p "@user is of type #{@user.class}" #"@user is of type User" "@forum is of type: Forum"
  end

  def sign_in

    #cookies.permanent[:wowza2] = "this is a just a test. nothing more. 123456";
  end




  def sign_out

    logger.debug "!!!start of sign_out--------------------------------------"

    clear_session

    logger.debug "!!!end of sign_out (before redirect)----------------------"

    redirect_to root_url
  
  end

  def create

   logger.debug "start of create--------------------------------------"

   # p "params[:user][:user_name] is: #{params[:user][:user_name]}"
   # p "params[:user][:password] is: #{params[:user][:email]}"
   # p "params[:user][:password] is: #{params[:user][:password]}"
   # p "params[:user][:password_confirmation] is: #{params[:user][:password_confirmation]}"
   # p "user_name_acceptable returns: #{user_name_acceptable}"
   # p "password_acceptable returns: #{password_acceptable}"
   # p "email_addr_acceptable returns: #{email_addr_acceptable}"

   if user_name_acceptable and password_acceptable and email_addr_acceptable
      # p "now making new user"
      @new_user = User.new(user_params)
      # p "new_user is: #{@new_user.inspect}"
      @new_user.save
      session[:user_name] = params[:user][:user_name]
      redirect_to root_url

   else
    p "not making a new user"
   end

   # if params[:user] != nil && params[:user][:name] != nil
   #  logger.debug "params[:user][:name] is #{params[:user][:name]}"
   # end
   # if params[:data] != nil
   #  logger.debug "data is #{params[:data].split(",")}"
   # end
   
   logger.debug "end of create--------------------------------------"
    
    # if(params[:pass].nil?)
    #   render 'did not work'
    # else
    #   render 'did work!!! holy carp!!!'
    # end
    # @user = User.new(user_params)    
    # @user.save
    # Handle a successful save
    # if @user.save
    #   redirect_to root_url
    #   flash[:notice] = "it TOTALLY worked!!"
    #   redirect_to root
    # else
    #   flash[:alert] = "issue! did NOT work!!"
    #   redirect_to root
    # end
  end

  def new
   # logger.debug "start of new--------------------------------------"
   # logger.debug params[:data]
   # logger.debug "end of new--------------------------------------"
   @user = User.new
   p "@user is of type: #{@user.class}"
  end

  def edit
  end

  def show
    # @user = User.find_by(session[:user_name])
    # @posts = @user.posts.paginate(page: 1)
  end

  def update
  end


  def destroy
  end

  def default_page
  end

  def sign_in_helper

    #session[:blu] = "Tommy"


    # p "1 @bonky originally was: #{@bonky}"

    # @bonky = "jimmy"

    # p "1 @bonky now is: #{@bonky}"

    logger.debug "start of sign IN helper--------------------------------------"

    #p "temp should now read #{self.name}"

    @returned_true = successfully_signed_in()

    #p "@returned_true is: #{@returned_true}"

    if @returned_true
      p "got here on '#{params[:session][:user_name]}'"
      redirect_to root_url #why the heck did THIS work, but render root_url didn't??
     #render root
    else
      p "got to the ELSE part!! yay!"
      redirect_to new_user_url
    end

    logger.debug "end of sign IN helper--------------------------------------"

  end

private #---------------------------------------------------------

  def user_params

    # p "entering user_params ------------"

    @temp = params.require(:user).permit(:user_name, :email, :password,
                                 :password_confirm)

    # p "@temp was: #{@temp}"

    @temp[:user_name] = @temp[:user_name].downcase

    # p "@temp[:user_name].downcase outputs: #{@temp[:user_name].downcase}"

    # p "@temp now is: #{@temp}"

    # p "right before user_params return------------"
    return @temp
  end

  def password_acceptable

    #p "the keys are #{params[:user].keys}"

    #p "params[:user][:password_confirmation] is: #{params[:user][:password_confirmation]}"

    if params[:user][:password] == params[:user][:password_confirmation]
      #p "passwords are equal"
      return true
    else
      #p "passwords are not equal"
      return false
    end
  end

  def user_name_acceptable

    if user_name_does_not_exist && user_name_follows_rules
      return true
    else
      return false
    end

  end

  def user_name_does_not_exist

    #p "111 params[:user_name] is: #{params[:user][:user_name]}"

    @results = User.find_by(user_name: params[:user][:user_name])

    #p "1111results is: #{@results.inspect}"

    if(@results.nil?)
      #p "results is returning true (that it is null)"
      return true
    else
      #p"results is returning false (meaning that it is not null)"
      return false
    end

  end


  #have no real rules at this point, but if I ever do, I can place them here. 
  def user_name_follows_rules
    #start
    #@user_name = params[:user_name]
    return true
  end

  #have no real rules at this point, but if I ever do, I can place them here. 
  #add == address
  def email_addr_acceptable
    #start
    #@user_name = params[:user_name]
    return true
  end



end
