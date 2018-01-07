class AddReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.integer :guest_id, null: false
      t.integer :listing_id, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.integer :rating, null: false

      t.timestamps
    end

    add_index :reviews, :guest_id
    add_index :reviews, :listing_id
  end
end
