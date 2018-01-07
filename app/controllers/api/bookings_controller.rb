class Api::BookingsController < ApplicationController

  def index
    if params.include?("booking")
      @bookings = Booking.where(booking_params).order(check_in: :asc)
    else
      @bookings = Booking.all.limit(18).order(check_in: :asc)
    end
  end

  def patch
    @booking = Booking.find(params[:id])
    if @booking.update(booking_params)
      render "api/bookings/show"
    else
      render json: @booking.errors.full_messages, status: 422
    end
  end

  def create
    @booking = Booking.new(booking_params)

    if @booking.save
      render "api/bookings/show"
    else
      render json: @booking.errors.full_messages, status: 422
    end
  end

  def destroy
    @booking = Booking.find(params[:id])
    @booking.destroy
  end

  private

  def booking_params
    params.require(:booking).permit(:host_id, :guest_id, :listing_id,
      :check_in, :check_out, :message, :status)
  end

end
