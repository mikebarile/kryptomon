class DefaultProfilePic < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :image_url, :string, default: "https://res.cloudinary.com/dsguwnfdw/image/upload/v1478282849/People/profile_default.png"
  end
end
