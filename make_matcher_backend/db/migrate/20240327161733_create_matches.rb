class CreateMatches < ActiveRecord::Migration[7.1]
  def change
    create_table :matches do |t|
      t.references :matcher, foreign_key: { to_table: :profiles }
      t.references :matched, foreign_key: { to_table: :profiles }
      t.integer :score
      t.boolean :reject, default: false, null: false
      t.timestamps
    end
  end
end
