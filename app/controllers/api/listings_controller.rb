class Api::ListingsController < ApplicationController

  def index
    if params.include?("listing")
      @listings = Listing.where(listing_params).order(id: :asc).limit(18)
    elsif params.include?("filters")
      @listings = Listing.in_bounds(params[:filters][:bounds]).order(id: :asc)
    elsif params.include?("top")
      @listings = Listing.all.order(id: :asc).limit(3)
    else
      @listings = Listing.all.order(id: :asc).limit(18)
    end
  end

  def show
    @listing = Listing.find(params[:id])
  end

  def patch
    @listing = Listing.find(params[:id])
    if @listing.update(listing_params)
      render "api/listings/show"
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def create
    @listing = Listing.new(listing_params)
    if @listing.save
      render "api/listings/show"
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    @listing.destroy
  end

  private

  def listing_params
    params.require(:listing).permit(:title, :host_id, :lat, :lng, :street_address,
      :city, :zip_code, :apt_num, :description, :price, :dog_walks, :deluxe_bed,
      :house_cat, :gourmet_food, :chew_toys, :frisbee, :mailman, :grooming,
      :cuddle_buddy, :indoor_poop, :indoor_pee, :barking, :whining, :begging,
      :shedding, :country, :state, :image_url)
  end

end
