class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.string :user_name
      t.string :password_confirmation

      t.timestamps null: false
    end
  end
end
