class City < ActiveRecord::Base
  validates :city_name, :country, presence: true
end
