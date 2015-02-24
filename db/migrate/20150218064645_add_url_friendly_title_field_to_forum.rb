class AddUrlFriendlyTitleFieldToForum < ActiveRecord::Migration
  def change
    add_column :forums, :url_friendly_title, :string
  end
end
