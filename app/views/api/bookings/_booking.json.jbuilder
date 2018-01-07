json.extract! booking, :id, :host_id, :guest_id, :listing_id, :check_in,
  :check_out, :message, :status

json.host do
  json.set! :id, booking.host.id
  json.set! :first_name, booking.host.first_name
  json.set! :email, booking.host.email
  json.set! :image_url, booking.host.image_url
end

json.guest do
  json.set! :id, booking.guest.id
  json.set! :first_name, booking.guest.first_name
  json.set! :email, booking.guest.email
  json.set! :image_url, booking.guest.image_url
end

json.listing do
  json.set! :id, booking.listing.id
  json.set! :title, booking.listing.title
  json.set! :price, booking.listing.price
  json.set! :city, booking.listing.city
  json.set! :state, booking.listing.state
  json.set! :country, booking.listing.country
  json.set! :image_url, booking.listing.image_url
end
