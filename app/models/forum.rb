class Forum < ActiveRecord::Base
	belongs_to :sub_keddit
	has_many :post
end
