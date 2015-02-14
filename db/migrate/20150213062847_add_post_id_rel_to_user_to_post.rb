class AddPostIdRelToUserToPost < ActiveRecord::Migration
  def change
    add_column :posts, :post_id_rel_to_user, :integer, default: 0
  end
end
