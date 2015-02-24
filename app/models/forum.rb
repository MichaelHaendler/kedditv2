class Forum < ActiveRecord::Base
	belongs_to :sub_keddit
	has_many :post

	def getPosts()
		Post.find_by(forum_id: self.id)
	end
	
end
