class CreateForums < ActiveRecord::Migration
  def change
    create_table :forums do |t|
      t.string :title
      t.string :url
      t.text :description
      t.integer :unique_num  #to set this forum off from any other forum with otherwise identicle properties.
      t.string :name_of_assoc_subkeddit
      t.string :submitted_by

      t.timestamps null: false
    end
  end
end
