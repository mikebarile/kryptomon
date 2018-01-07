json.set! :id, review.id
json.set! :description, review.description
json.set! :rating, review.rating
json.set! :date, review.updated_at
json.set! :guest_name, review.guest.first_name
json.set! :guest_image_url, review.guest.image_url
