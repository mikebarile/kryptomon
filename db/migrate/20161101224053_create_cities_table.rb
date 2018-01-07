class CreateCitiesTable < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.string :city_name, null: false
      t.string :state
      t.string :country, null: false
      t.timestamps
    end
  end
end
