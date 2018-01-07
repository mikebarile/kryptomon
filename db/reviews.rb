module ReviewsFactory
  positive_descriptions = [
    "My dog absolutely loved her stay here! Highly recommended!",
    "Wonderful spot for my little pooch to take some much needed time off",
    "What a great location! My dog couldn't stop yelping about this place when he got back. Your dog will love it too!",
    "Comes highly recommended from my pup. She said it was the best place she's ever stayed.",
    "Definitely worth checking out. I couldn't believe how nice it was when I dropped my dogger off here!",
    "Soooooooo sickkkkkkk I can't tell you how nice this place was! My dog loved it!",
    "Highly recommended",
    "Amazing spot",
    "Definitely check this one out",
    "A+",
    "Amazing",
    "Awesome spot",
    "My dog especially loved the amenities! So many amenities!",
    ":D :D :D :D :D",
    "Such a great spot. My dog wouldn't shut up!",
    "A really RUFFFFstic locale! My pooch loved it!",
    "SO great, really just so so great",
    "INCREDIBLE. I MEAN LITERALLY INCREDIBLE. WOW",
    "Definitely send your dog here. They will love it. My dog has been mad that her bed isn't as nice as the one here :O",
    "So so so so so so so so good",
    "Really just pretty great. Like, really pretty great",
    "Definitely pick this one. Drop whatever you're doing and book it NOW",
    "My dog especially liked the amenities!",
    "My pup said the view was amazing and the owner was very playful",
    "Great service!",
    "Good stuff",
    "Pretty awesome",
    "Thumbs up",
    "Double thumbs up",
    "100%",
    ": ) ",
    "YEAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH was sick"
  ]

  negative_descriptions = [
    "Terrible. Just terrible.",
    "My dog hated it! She woudln't stop crying when she got back :(",
    "My dog wasn't a big fan. Not enough amenities and too many rules :'(",
    "Bad",
    "Awful",
    "Not great",
    "Really not too great",
    "Meh",
    "DO NOT SENT YOUR DOG TO THIS PLACE. DO NOT. I REPEAT, DO NOT.",
    "Really not that great.",
    ":( :( :("
  ]

  500.times do
    Review.create!({
      guest_id: 1 + rand(100),
      listing_id: 1 + rand(200),
      description: negative_descriptions.shuffle[0],
      rating: rand(2) + 1
      })
  end

  4000.times do
    Review.create!({
      guest_id: 1 + rand(100),
      listing_id: 1 + rand(200),
      description: positive_descriptions.shuffle[0],
      rating: rand(2) + 4
      })
  end

  90.times do
    Review.create!({
      guest_id: 2 + rand(100),
      listing_id: 1 + rand(3),
      description: positive_descriptions.shuffle[0],
      rating: 5
      })
  end

end
