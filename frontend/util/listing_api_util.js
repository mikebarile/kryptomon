export const fetchListing = (id, success, error) => {
  $.ajax({
    method: 'GET',
    url: `api/listings/${id}`,
    success,
    error
  });
};

export const fetchListings = (params, success, error) => {
  $.ajax({
    method: 'GET',
    url: `api/listings`,
    data: {"listing": params},
    success,
    error
  });
};

export const fetchSearchListings = (filters, success, error) => {
  $.ajax({
    method: 'GET',
    url: `api/listings`,
    data: {"filters": filters},
    success,
    error
  });
};

export const fetchTopListings = (success, error) => {
  $.ajax({
    method: 'GET',
    url: `api/listings`,
    data: {"top": ["FUBAR"]},
    success,
    error
  });
};

export const createListing = (listing, success, error) => {
  $.ajax({
    method: 'POST',
    url: `api/listings`,
    data: {"listing": listing},
    success,
    error
  });
};

export const deleteListing = (id, success, error) => {
  $.ajax({
    method: 'DELETE',
    url: `api/listings/${id}`,
    success,
    error
  });
};

export const editListing = (listing, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/listings/${listing.id}`,
    data: {"listing": listing},
    success,
    error
  });
};

export const fetchCoords = (street_address, city, state, zip_code, country, success) => {
  $.ajax({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${street_address},${city},${state},${zip_code},${country}&key=${window.google_api.key}`,
    success
  });
};
