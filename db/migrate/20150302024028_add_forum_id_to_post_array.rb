class AddForumIdToPostArray < ActiveRecord::Migration
  def change
    add_column :post_arrays, :forum_id, :integer
  end
end
