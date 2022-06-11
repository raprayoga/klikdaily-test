import Axios from "axios";

export default function get(url){
  return Axios.get(url);
}

export function post(url, requestData){
  return Axios.post(url, requestData);
}

export function put(url, requestData){
  return Axios.put(url, requestData);
}

export function deletes(url){
  return Axios.delete(url);
}