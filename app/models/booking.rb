class Booking < ActiveRecord::Base
  validates :host_id, :guest_id, :listing_id, :check_in, :check_out,
  :message, :status, presence: true

  validate :start_must_come_before_end
  validate :does_not_overlap_approved_request

  belongs_to :host,
  primary_key: :id,
  foreign_key: :host_id,
  class_name: :User

  belongs_to :guest,
  primary_key: :id,
  foreign_key: :guest_id,
  class_name: :User

  belongs_to :listing,
  primary_key: :id,
  foreign_key: :listing_id,
  class_name: :Listing

  def overlapping_requests
    Booking
      .where.not(id: self.id)
      .where(listing_id: listing_id)
      .where(<<-SQL, check_in: check_in, check_out: check_out)
         NOT( (check_in > :check_out) OR (check_out < :check_in) )
      SQL
  end

  def overlapping_approved_requests
    overlapping_requests.where("status = 'approved'")
  end

  def overlapping_pending_requests
    overlapping_requests.where("status = 'pending'")
  end

  def does_not_overlap_approved_request

   unless overlapping_approved_requests.empty?
     errors[:base] <<
       "Sorry, these dates are already booked!"
   end
 end

 def start_must_come_before_end
   return if check_in < check_out
   errors[:check_in] << "must come before end date"
   errors[:check_out] << "must come after start date"
 end

end
