class AddForumIdentifiersToPost < ActiveRecord::Migration
  def change
  	add_column :posts, :sub_keddit_name, :string
  	add_column :posts, :forum_title, :string
  	add_column :posts, :forum_unique_num, :integer
  end
end
