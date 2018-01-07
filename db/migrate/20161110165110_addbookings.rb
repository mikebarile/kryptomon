class Addbookings < ActiveRecord::Migration[5.0]
  def change
    create_table :bookings do |t|
      t.integer :host_id, null: false
      t.integer :guest_id, null: false
      t.integer :listing_id, null: false
      t.date :check_in, null: false
      t.date :check_out, null: false
      t.text :message, null: false
      t.string :status, null: false

      t.timestamps
    end

    add_index :bookings, :host_id
    add_index :bookings, :guest_id
    add_index :bookings, :listing_id
  end
end
