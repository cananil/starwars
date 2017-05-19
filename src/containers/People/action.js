import axios from 'axios';
import {fakeData} from './constants';
import {
  API_PEOPLE_URL,
  FETCH_PEOPLE,
  SELECT_PEOPLE
} from '../../constants';

export function fetchPeople() {

  const request = axios.get(API_PEOPLE_URL);

  return {
    type: FETCH_PEOPLE,
    payload: request
  };

}


export function fetchPeople2(){
  //console.log(fakeData);
  console.log('fakedata here action');
  console.log(fakeData);
  return {
    type: FETCH_PEOPLE,
    payload: fakeData
  };
}

/*
export function fetchPeople() {

  axios.get(API_PEOPLE_URL)
    .then(function (response) {
      console.log(response.data);
      return {
        type: FETCH_PEOPLE,
        payload: response.data
      };
    })
    .catch(function (error) {
      console.log(error);
    });
}
*/

export function selectPeople(people) {
  console.log('this people has been selected', people.name);
  return {
    type: SELECT_PEOPLE,
    payload: people
  };
}
