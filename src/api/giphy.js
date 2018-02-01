export const getTrending = (offset = 0) => {
  return `https://api.giphy.com/v1/gifs/trending?api_key=735850dd359842089bfe0e37744e4d6d&limit=25&rating=G&offset=${offset}`;
};

export const search = (query, offset = 0) => {
  return `https://api.giphy.com/v1/gifs/search?api_key=735850dd359842089bfe0e37744e4d6d&q=${query}&limit=25&offset=0&rating=G&lang=en`;
};
