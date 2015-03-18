class Post < ActiveRecord::Base
  
  belongs_to :user
  belongs_to :forum
  before_save :increment_post_id_rel_to_user_val, :set_forum_id_num

  # before_save :set_next_user_post_id


      # post = Post.new(User_id: session[:id],
      #   user_name: session[:user_name],
      #   forum_title: params[:forum_title], 
      #   forum_unique_num: params[:forum_unique_num], 
      #   sub_keddit_name: params[:sub_keddit_name],
      #   content: params[:submission],
      #   inReplyTo_user_name: params[:otherUsers_user_name],
      #   inReplyTo_post_id_rel_to_user: params[:otherUsers_post_id_rel_to_user])


  #my idea is to have it so that forums are looked up based on a short unique string, their title,
  #and the subKeddit that they belong to. 
  #how to pass params around: 
  #http://stackoverflow.com/questions/19667615/pass-a-parameter-from-view-to-a-scope-defined-in-the-model
  # def set_forum_id_num()
  #   p "getting into set_forum_id_num?????"

  #   if(params[:sub_keddit_name] != nil and params[:forum_unique_num] != nil and params[:forum_title] != nil)
  #     self.forum_id = Forum.find_by(name_of_assoc_subkeddit: params[:sub_keddit_name], unique_num: params[:forum_unique_num], title: params[:forum_title]).id
  #   end
    
  # end

  #sets forum_id
  def set_forum_id_num()
    p "getting into set_forum_id_num?????"

    if(self.sub_keddit_name != nil and self.forum_unique_num != nil and self.forum_title != nil)
      # temp = Forum.find_by(name_of_assoc_subkeddit: self.sub_keddit_name, unique_num: self.forum_unique_num, url_friendly_title: self.forum_title)
      # p "------------------temp is: #{temp.inspect}"
      self.forum_id = Forum.find_by(name_of_assoc_subkeddit: self.sub_keddit_name, unique_num: self.forum_unique_num,  url_friendly_title: self.forum_title).id
    end
    
  end


  def toHash()

    # return {id: self.id, content: self.content, User_id: self.User_id, created_at: self.created_at, updated_at: self.updated_at, 
    #     post_id_rel_to_user: self.post_id_rel_to_user, inReplyTo_user_name: self.inReplyTo_user_name,
    #     inReplyTo_post_id_rel_to_user: self.inReplyTo_post_id_rel_to_user, upvote: self.upvote, downvote: self.downvote, 
    #     forum_id: self.forum_id, user_name: self.user_name, sub_keddit_name: self.sub_keddit_name,
    #     forum_title: self.forum_title, forum_unique_num: self.forum_unique_num}

    return self.attributes
  end


  def increment_post_id_rel_to_user_val()

    p "getting into increment_post_id_rel_to_user_val-------"

    user = User.find(self.User_id)

    p "user is: #{user.inspect}"

    p "(user.post.maximum('post_id_rel_to_user') is: #{user.post.maximum('post_id_rel_to_user')}"

    self.post_id_rel_to_user = (user.post.maximum('post_id_rel_to_user') || 0) + 1



    p "end of increment_post_id_rel_to_user_val-------"
  end

  def self.newPost(id,post)
  	#p "3this is only a test???????"

  	@user = User.find(id)

  	post_itself = self.new(User_id: @user.id, content: post)

  	#p "num was: #{(@user.post.maximum('post_id_rel_to_user') || 0)}"

  	@num = (@user.post.maximum('post_id_rel_to_user') || 0) + 1

  	#p "num now is: #{@num}"

  	post_itself.post_id_rel_to_user = @num;

  	post_itself.save

  end

  def self.newPost_for_forum(subKeddit_name,forum_name,forum_unique_number,user_id,post)


    #@newPost = SubKeddit.find_by(name: subKeddit_name).Forum.find_by(title: forum_name, unique_num: forum_unique_number).Post.new
    #-----------------------
    #p "3this is only a test???????"

    @user = User.find(user_id)

    post_itself = self.new(User_id: @user.id, content: post)

    #p "num was: #{(@user.post.maximum('post_id_rel_to_user') || 0)}"

    @num = (@user.post.maximum('post_id_rel_to_user') || 0) + 1

    #p "num now is: #{@num}"

    post_itself.post_id_rel_to_user = @num;

    post_itself.save

  end


  # def newPost(id,post)

  # 	@user = User.find(id)

  # 	post_itself = Post.new(User_id: @user.id, content: post)

  # 	#@num = (user.post.maximum('post_id_rel_to_user') || 0) + 1

  #   @num = user.post.maximum('post_id_rel_to_user') || 0

  #   @num = @num + 1

  # 	post_itself.post_id_rel_to_user = @num;

  # 	post_itself.save

  # end

private

  def set_next_user_post_id
  	p "getting into set_next_user_post_id"
  	p "self.post_id_rel_to_user was: #{self.post_id_rel_to_user}"
    # self.post_id_rel_to_user ||= get_new_user_post_id
    self.post_id_rel_to_user = get_new_user_post_id()
    p "self.post_id_rel_to_user is NOW: #{self.post_id_rel_to_user}"
  end

  # def get_new_user_post_id()
  # 	p "also getting into get_new_user_post_id"
  #   user = self.user
  #   p "user.id is: #{user.id}"
  #   max = user.posts.maximum('post_id_rel_to_user') || 0
  #   max + 1
  # end

  def get_new_user_post_id()
  	p "also getting into get_new_user_post_id"
  	#testing = current_user
    user = current_user()
    p "user.id is: #{user.id}"
    p "user.user_name is: #{user.user_name}"
    #p self.user.class
    #p "user.id is: #{user.id}"
    @num = user.post.maximum('post_id_rel_to_user') || 0
    @num = @num + 1

    p "num is: #{@num}"

    return @num

  end

 

  def current_user2
  	User.find(3)
  end

  # def current_user()

  #   if session[:id]
  #     User.find(session[:id])
  #   else
  #     p "ERROR! session[:id] not currently defined. No current signed in user."
  #     return nil
  #   end
    
  # end
  def current_user()
  	p "data is: #{params[:content]}"
    if params[:session][:id]
      User.find(params[:session][:id])
    else
      p "ERROR! session[:id] not currently defined. No current signed in user."
      return nil
    end
    
  end

  def blah(userz)
  	p "userz.id is: #{userz.id}"
  end




end
