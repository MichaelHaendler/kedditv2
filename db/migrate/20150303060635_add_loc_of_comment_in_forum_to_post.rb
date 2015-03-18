class AddLocOfCommentInForumToPost < ActiveRecord::Migration
  def change
    add_column :posts, :loc_of_comment_in_forum, :string, default: ""
  end
end
