class User < ActiveRecord::Base
	has_many :post, dependent: :destroy
	#validates_uniqueness_of :user_name, :case_sensitive => false

	#a work around until I am able to get it to work proper, and do stuff like
	#user.post.build(content: "this is a new post")
	def newPost(post_text)
		# p "ZONKERS!!!!!!!!!!!!!!!!!!!!!!!222222222222222"
		# # p self.post
		# p "this is: #{this.inspect}"
		# Post.blah(this)
		Post.new(User_id: self.id, content: post_text).save
		#self.post.new(User_id: self.id, content: post_text).save
		#self.post.new(User_id: self.id, content: post_text)
	end

	#user.getPosts()[0].content #to get individual post
	#ex: User.find_by(id: 3).getPosts()[0].content
	#User.find_by(id: 10).post[0].content
	def getPosts()
		self.post
	end

	def deletePost(id)
		self.post.find(id).destroy
		#self.post.save
		# p "boom chacka laka"
	end

	def delPost(post_id)
		self.post.find_by(post_id_rel_to_user: post_id).destroy
		#self.post.save
		# p "boom chacka laka"
	end

# user = User.find(3)
# user.getPosts()

end
