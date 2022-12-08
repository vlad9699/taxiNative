import React, {useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import {useDispatch, useSelector} from 'react-redux';
import {selectDestination, selectOrigin} from '../redux/slices/selectors';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_KEY} from '../constants/constants';
import {getTravelTime} from '../api/api';
import {setTravelTimeInfo} from '../redux/slices/navSlice';

const Map = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const region = {
    latitude: origin.location.lat,
    longitude: origin.location.lng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    if (!origin || !destination) {
      return;
    }
    ref.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
  }, [destination, origin]);

  const getTravelInfo = async () => {
    const res = await getTravelTime(origin, destination);
    dispatch(setTravelTimeInfo(res));
  };

  useEffect(() => {
    if (!origin || !destination) {
      return;
    }
    getTravelInfo();
  }, [origin, destination]);

  const renderMarket = () => {
    if (origin.location) {
      return (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      );
    }
  };

  const renderMarketDestination = () => {
    if (destination?.location) {
      return (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      );
    }
  };

  const renderDestination = () => {
    if (origin && destination) {
      return (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_KEY}
          strokeColor="black"
          strokeWidth={3}
        />
      );
    }
  };

  return (
    <MapView
      ref={ref}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={region}>
      {renderDestination()}
      {renderMarket()}
      {renderMarketDestination()}
    </MapView>
  );
};

export default Map;
