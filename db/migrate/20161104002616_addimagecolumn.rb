class Addimagecolumn < ActiveRecord::Migration[5.0]
  def change
    add_column :listings, :image_url, :string, null: false
  end
end
