class PostsController < ApplicationController

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

end
