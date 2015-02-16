class AddSearchCapabilitiesAndUpVAndDownVToPost < ActiveRecord::Migration
  def change
    add_column :posts, :inReplyTo_user_name, :string
    add_column :posts, :inReplyTo_post_id_rel_to_user, :integer
    add_column :posts, :upvote, :integer
    add_column :posts, :downvote, :integer
  end
end
