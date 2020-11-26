import axios from "axios";

const BASE_URL = "https://api.unsplash.com/";

const RequestHeaders = {
  Accept: "application/json",
  Authorization: "Client-ID TIGmo6lBfgghGf8ceDjkxJ8zDWMNkqr-UNUF-NS0WU0",
};

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: RequestHeaders,
});

export const ApiFactory = {
  $_getPhotos(query) {
    let url = "/search/photos";
    return Axios.get(url, {
      params: {
        query: query,
        per_page: 8,
      },
    });
  },
};
