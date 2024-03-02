class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.string :display_name
      t.integer :user_id
      t.string :zip_code
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.string :timezone
      t.date :date_of_birth
      t.integer :intensity
      t.integer :skill
      t.integer :language
      t.string :days, array: true
      t.string :times, array: true
      t.timestamps
    end

    add_index :profiles, :user_id
  end
end
