import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch} from 'react-redux';
import {setDestination} from '../redux/slices/navSlice';
import {useNavigation} from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import {Icon} from '@rneui/themed';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Have a nice day!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            textInputProps={{placeholderTextColor: 'gray'}}
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            styles={toInputBoxStyles}
            fetchDetails={true}
            returnKeyType={'Search'}
            minLength={2}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }),
              );
              navigate('RideOptionsCard');
            }}
            query={{
              key: 'AIzaSyA76nCHiu0X6IbC-CFpz2TI9vDXr5dOdMM',
              language: 'en',
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          onPress={() => navigate('RideOptionsCard')}
          style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}>
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row w-24 px-4 py-3 rounded-full justify-between`}>
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

export default NavigateCard;
