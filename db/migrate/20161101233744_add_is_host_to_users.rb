class AddIsHostToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :is_host, :boolean
  end
end
