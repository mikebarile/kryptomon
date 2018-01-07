export const fetchBookings = (params, success, error) => {
  $.ajax({
    method: 'GET',
    url: `api/bookings`,
    data: {"booking": params},
    success,
    error
  });
};

export const createBooking = (booking, success, error) => {
  $.ajax({
    method: 'POST',
    url: `api/bookings`,
    data: {"booking": booking},
    success,
    error
  });
};

export const deleteBooking = (id, success, error) => {
  $.ajax({
    method: 'DELETE',
    url: `api/bookings/${id}`,
    success,
    error
  });
};

export const editBooking = (booking, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/bookings/${booking.id}`,
    data: {"booking": booking},
    success,
    error
  });
};
