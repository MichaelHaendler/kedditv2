class CreatePostArrays < ActiveRecord::Migration
  def change
    create_table :post_arrays do |t|

      t.timestamps null: false
      t.text :posts, array: true, default: []
    end
  end
end
