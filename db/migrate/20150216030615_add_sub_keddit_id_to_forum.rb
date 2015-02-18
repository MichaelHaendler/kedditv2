class AddSubKedditIdToForum < ActiveRecord::Migration
  def change
    add_column :forums, :sub_keddit_id, :integer
  end
end
