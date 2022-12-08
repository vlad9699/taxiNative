import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../redux/slices/selectors';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen',
  },
];

const NavOptions = () => {
  const {navigate} = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      horizontal
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigate(item.screen)}
          disabled={!origin}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded-xl`}>
          <View style={tw`${!origin && 'opacity-40'}`}>
            <Image
              style={{width: 120, height: 120, resizeMode: 'contain'}}
              source={{uri: item.image}}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
