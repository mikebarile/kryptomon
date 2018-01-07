# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
first_name      | string    | nut null
last_name       | string    | nut null
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
image_url       | string    |

## listings
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null
host_id        | integer   | not null, foreign key (references users), indexed
lat            | float     | not null
lng            | float     | not null
street_address | string    | not null
city           | string    | not null
zip_code       | integer   | not null
apt_num        | integer   |
description    | string    | not null
price          | float     | not null, positive, less than 20000
dog_walks      | boolean   | not null
deluxe_bed     | boolean   | not null
house_cat      | boolean   | not null
gourmet_food   | boolean   | not null
chew_toys      | boolean   | not null
frisbee        | boolean   | not null
mailman        | boolean   | not null
grooming       | boolean   | not null
cuddle_buddy   | boolean   | not null
indoor_poop    | boolean   | not null
indoor_pee     | boolean   | not null
barking        | boolean   | not null
whining        | boolean   | not null
begging        | boolean   | not null
shedding       | boolean   | not null

## bookings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
host_id     | integer   | not null, foreign key (references users), indexed
guest_id    | integer   | not null, foreign key (references users), indexed
listing_id  | integer   | not null, foreign key (references users), indexed
check_in    | date      | not null
check_out   | date      | not null
message     | text      | not null
status      | string    | not null, must be "approved", "pending", or "rejected"

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
guest_id    | integer   | not null, foreign key (references users), indexed
listing_id  | integer   | not null, foreign key (references users), indexed
title       | string    | not null
body        | text      | not null
rating      | integer   | not null, between 1 and 5

## cities
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
city_name   | string    | not null
state       | string    |
country     | string    | not null
