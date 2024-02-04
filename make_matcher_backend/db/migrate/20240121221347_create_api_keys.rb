class CreateApiKeys < ActiveRecord::Migration[7.1]
  def change
    create_table :api_keys do |t|
      t.string :key, default: "ksuk_#{SecureRandom.hex}"
      t.string :secret, default: "ksus_#{SecureRandom.hex}"
      t.string :name
      t.boolean :active
      t.timestamps
    end
  end
end
