import {GOOGLE_KEY} from '../constants/constants';
import axios from 'axios';

export const getTravelTime = async (origin, destination) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}A&departure_time=now&key=${GOOGLE_KEY}`,
    );

    if (res) {
      return res.data.rows[0].elements[0];
    }
  } catch (e) {
    console.log(e);
  }
};
