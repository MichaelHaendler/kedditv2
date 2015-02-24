class AddNumOfPostsToForum < ActiveRecord::Migration
  def change
    add_column :forums, :num_of_posts, :integer, default: 0
  end
end
