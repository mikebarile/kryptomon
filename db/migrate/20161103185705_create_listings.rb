class CreateListings < ActiveRecord::Migration[5.0]
  def change
    create_table :listings do |t|
      t.string :title, null: false
      t.integer :host_id, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :zip_code, null: false
      t.integer :apt_num
      t.string :description, null: false
      t.float :price, null: false
      t.boolean :dog_walks
      t.boolean :deluxe_bed
      t.boolean :house_cat
      t.boolean :gourmet_food
      t.boolean :chew_toys
      t.boolean :frisbee
      t.boolean :mailman
      t.boolean :grooming
      t.boolean :cuddle_buddy
      t.boolean :indoor_poop
      t.boolean :indoor_pee
      t.boolean :barking
      t.boolean :whining
      t.boolean :begging
      t.boolean :shedding
    end
  end
end
