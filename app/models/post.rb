class Post < ActiveRecord::Base
  
  belongs_to :user
  belongs_to :forum

  # before_save :set_next_user_post_id

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


    @newPost = SubKeddit.find_by(name: subKeddit_name).Forum.find_by(title: forum_name, unique_num: forum_unique_number).Post.new
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
