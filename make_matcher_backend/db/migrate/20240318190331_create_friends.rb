class CreateFriends < ActiveRecord::Migration[7.1]
  def change
    create_table :friends do |t|
      t.references :source, null: false, foreign_key: { to_table: :users }
      t.references :destination, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
