import axios from "axios";

export const url = "https://e1b8b630.ngrok.io"

export const map =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2543.5921976987097!2d30.505862915587713!3d50.39280019939843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c8c9d12148f7%3A0xe875d20a5cf04824!2z0JPQvtC70L7RgdC10LXQstGB0LrQuNC5INC_0YDQvtGB0L8uLCA4Nywg0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1562832350193!5m2!1sru!2sua";

export const contactsPost = obj => {
  return axios.post(`${url}/api/v1/contact/form/`, obj);
};

export const pickBoxPost = obj => {
  return axios.post(`${url}/api/v1/box/individual/`, obj);
};

export const finalOrderPost = obj => {
  
  return axios.post(`${url}/api/v1/catering/order/`, obj, {responseType: 'blob'}).then((response) => {
    let blob = new Blob([response.data], { type:"application/pdf" })
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'Results.pdf'
    link.click()
  })
}
export const getSets = () => axios.get(`${url}/api/v1/catering/set/`);

export const getServing = () => axios.get(`${url}/api/v1/serving/meals/`);

export const getServices = () => axios.get(`${url}/api/v1/service/list/`);

export const getCarService = () => axios.get(`${url}/api/v1/service/car/list/`);

export const getOffice = () => axios.get(`${url}/api/v1/office/services/`);

export const getReccomendations = () => axios.get(`${url}/api/v1/catering/recommendations/`)