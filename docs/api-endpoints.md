# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### Listing

- `GET /api/listings`
- `POST /api/listings`
- `GET /api/listings/:listing_id`
- `PATCH /api/listings/:listing_id`
- `DELETE /api/listings/:listing_id`

### Booking

- `GET /api/bookings`
- `POST /api/bookings`
- `GET /api/bookings/:booking_id`
- `DELETE /api/bookings/:booking_id`

### Review

- A listing's reviews will be included in the listing show template
- `POST /api/reviews`
- `PATCH /api/reviews/:review_id`
- `DELETE /api/reviews/:review_id`
