export const fetchReviews = (params, success, error) => {
  $.ajax({
    method: 'GET',
    url: `api/reviews`,
    data: {"review": params},
    success,
    error
  });
};

export const createReview = (review, success, error) => {
  $.ajax({
    method: 'POST',
    url: `api/reviews`,
    data: {"review": review},
    success,
    error
  });
};

export const deleteReview = (id, success, error) => {
  $.ajax({
    method: 'DELETE',
    url: `api/reviews/${id}`,
    success,
    error
  });
};

export const editReview = (review, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/reviews/${review.id}`,
    data: {"review": review},
    success,
    error
  });
};
