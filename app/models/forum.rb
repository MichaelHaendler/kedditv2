class Forum < ActiveRecord::Base
	belongs_to :sub_keddit
	has_many :post
	has_one :post_array

	def getPosts()
		Post.where(forum_id: self.id)
	end



end
