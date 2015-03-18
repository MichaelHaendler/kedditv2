class PostsController < ApplicationController

  #before_save :increment_post_id_rel_to_user_val

  def new
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

  # def self.zoom()
  # 	p "this is only a test???????"
  # end

  # def increment_post_id_rel_to_user_val()

  #   p "getting into increment_post_id_rel_to_user_val-------"

  #   user = User.find(self.User_id)

  #   p "user is: #{user.inspect}"

  #   p "(user.post.maximum('post_id_rel_to_user') is: #{user.post.maximum('post_id_rel_to_user'}"

  #   self.post_id_rel_to_user = (user.post.maximum('post_id_rel_to_user') || 0) + 1



  #   p "end of increment_post_id_rel_to_user_val-------"
  # end

end
