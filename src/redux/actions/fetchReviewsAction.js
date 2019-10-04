import axios from "axios";
import {url} from '../../utils/api';

// =================================get=========================================


function getFetch() {
  return axios.get(`${url}/api/v1/reviews/`);
}

const fetchFromApi = data => ({
  type: "GET",
  data: data
});

export const asyncData = () => dispatch => {
  getFetch().then(res => dispatch(fetchFromApi(res.data)));
};


// =================================post=========================================


function postFetch(obj) {
    return axios.post(`${url}/api/v1/reviews/`, obj)
}

const fetchToApi = data => ({
    type: "POST",
    data
});

export const asyncPostData = obj => dispatch => {
    postFetch(obj).then(res => dispatch(fetchToApi(res.data)))
}


// ================================pagination=======================================


function pageFetch(url) {
  return axios.get(url)
}

const fetchToPage = data => ({
  type: "PAGINATION",
  data
})

export const asyncPageFetch = url => dispatch => {
  pageFetch(url).then(res => dispatch(fetchToPage(res.data)))
}