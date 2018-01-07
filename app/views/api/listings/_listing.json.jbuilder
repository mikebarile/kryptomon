

json.set! :id, listing.id
json.set! :title, listing.title
json.set! :host_id, listing.host_id
json.set! :city, listing.city
json.set! :state, listing.state
json.set! :country, listing.country
json.set! :description, listing.description

json.set! :price, listing.price
json.set! :dog_walks, listing.dog_walks
json.set! :deluxe_bed, listing.deluxe_bed
json.set! :house_cat, listing.house_cat
json.set! :gourmet_food, listing.gourmet_food
json.set! :chew_toys, listing.chew_toys

json.set! :frisbee, listing.frisbee
json.set! :mailman, listing.mailman
json.set! :grooming, listing.grooming
json.set! :cuddle_buddy, listing.cuddle_buddy
json.set! :indoor_poop, listing.indoor_poop
json.set! :indoor_pee, listing.indoor_pee

json.set! :barking, listing.barking
json.set! :whining, listing.whining
json.set! :begging, listing.begging
json.set! :shedding, listing.shedding
json.set! :image_url, listing.image_url
json.set! :host_id, listing.host.id
json.set! :host_image_url, listing.host.image_url
json.set! :host_first_name, listing.host.first_name

json.set! :average_rating, listing.average_rating
json.set! :count_reviews, listing.reviews.length

json.reviews do
  json.partial! 'api/reviews/review', collection: listing.reviews.order(updated_at: :desc), as: :review
end
