export const FETCH_MY_TRIPS = "FETCH_MY_TRIPS";
export const FETCH_MY_RESERVATIONS = "FETCH_MY_RESERVATIONS";
export const CREATE_BOOKING = "CREATE_BOOKING";
export const DELETE_TRIP = "DELETE_TRIP";
export const DELETE_RESERVATION = "DELETE_RESERVATION";
export const EDIT_TRIP = "EDIT_TRIP";
export const EDIT_RESERVATION = "EDIT_RESERVATION";
export const RECEIVE_MY_TRIPS = "RECEIVE_MY_TRIPS";
export const RECEIVE_MY_RESERVATIONS = "RECEIVE_MY_RESERVATIONS";
export const RECEIVE_NEW_BOOKING = "RECEIVE_NEW_BOOKING";
export const RECEIVE_EDITED_TRIP = "RECEIVE_EDITED_TRIP";
export const RECEIVE_EDITED_RESERVATION = "RECEIVE_EDITED_RESERVATION";
export const REMOVE_TRIP = "REMOVE_TRIP";
export const REMOVE_RESERVATION = "REMOVE_RESERVATION";
export const RECEIVE_CREATE_BOOKING_ERRORS = "RECEIVE_CREATE_BOOKING_ERRORS";
export const RECEIVE_EDIT_TRIP_ERRORS = "RECEIVE_EDIT_TRIP_ERRORS";
export const RECEIVE_EDIT_RESERVATION_ERRORS = "RECEIVE_EDIT_RESERVATION_ERRORS";
export const CLEAR_BOOKING_ERRORS = "CLEAR_BOOKING_ERRORS";
export const CLEAR_STATE = "CLEAR_STATE";

export const fetchMyTrips = (params) => ({
  type: FETCH_MY_TRIPS,
  params
});

export const fetchMyReservations = (params) => ({
  type: FETCH_MY_RESERVATIONS,
  params
});

export const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  booking
});

export const deleteTrip = (id) => ({
  type: DELETE_TRIP,
  id
});

export const deleteReservation = (id) => ({
  type: DELETE_RESERVATION,
  id
});

export const editTrip = (booking) => ({
  type: EDIT_TRIP,
  booking
});

export const editReservation = (booking) => ({
  type: EDIT_RESERVATION,
  booking
});

export const receiveNewBooking = (booking) => ({
  type: RECEIVE_NEW_BOOKING,
  booking
});

export const receiveEditedTrip = (booking) => ({
  type: RECEIVE_EDITED_TRIP,
  booking
});

export const receiveEditedReservation = (booking) => ({
  type: RECEIVE_EDITED_RESERVATION,
  booking
});

export const receiveMyTrips = (bookings) => ({
  type: RECEIVE_MY_TRIPS,
  bookings
});

export const receiveMyReservations = (bookings) => ({
  type: RECEIVE_MY_RESERVATIONS,
  bookings
});

export const removeTrip = (booking) => ({
  type: REMOVE_TRIP,
  booking
});

export const removeReservation = (booking) => ({
  type: REMOVE_RESERVATION,
  booking
});

export const receiveCreateBookingErrors = (errors) => ({
  type: RECEIVE_CREATE_BOOKING_ERRORS,
  errors
});

export const receiveEditReservationErrors = (errors) => ({
  type: RECEIVE_EDIT_RESERVATION_ERRORS,
  errors
});

export const receiveEditTripErrors = (errors) => ({
  type: RECEIVE_EDIT_TRIP_ERRORS,
  errors
});

export const clearBookingErrors = () => ({
  type: CLEAR_BOOKING_ERRORS
});

export const clearState = () => ({
  type: CLEAR_STATE
});
