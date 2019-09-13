class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :encrypted_password
      t.string :salt
      t.string :name
      t.string :bio
      t.string :photo

      t.timestamps
    end
  end
end
