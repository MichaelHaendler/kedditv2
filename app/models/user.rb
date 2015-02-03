class User < ActiveRecord::Base
	has_many :post, dependent: :destroy

	#a work around until I am able to get it to work proper, and do stuff like
	#user.post.build(content: "this is a new post")
	def newPost(post_text)
		Post.new(User_id: self.id, content: post_text).save
	end

	#user.getPosts()[0].content #to get individual post
	#ex: User.find_by(id: 3).getPosts()[0].content

	def getPosts()
		self.post
	end

# user = User.find(3)
# user.getPosts()

end
