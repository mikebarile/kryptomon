class Api::CitiesController < ApplicationController

  def index
    @cities = City.all
  end

  private

  def cities_params
    params.require(:city).permit(:city_name)
  end
end
