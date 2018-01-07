class Api::ReviewsController < ApplicationController

  def index
    if params.include?("review")
      @reviews = Review.where(review_params)
    else
      @reviews = Review.all.limit(18)
    end
  end

  def patch
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render "api/reviews/show"
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render "api/reviews/show"
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
  end

  private

  def review_params
    params.require(:review).permit(:guest_id, :listing_id,
      :description, :rating)
  end

end
