class User < ActiveRecord::Base
	has_many :post, dependent: :destroy

	def test
		#rand.to_s[0..3]
		rand[0..3]
	end

	#a work around until I am able to get it to work proper, and do stuff like
	#user.post.build(content: "this is a new post")
	def newPost(post_text)
		Post.new(User_id: 1, content: post_text).save
	end
end
