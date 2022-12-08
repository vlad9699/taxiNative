import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectTravelTimeInfo} from '../redux/slices/selectors';
import {SURGE_CHARGE_RATE} from '../constants/constants';

const data = [
  {
    id: 'Uber-X-123',
    title: 'Uber X',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-321',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-411',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

const RideOptionsCard = () => {
  const {navigate} = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInfo = useSelector(selectTravelTimeInfo);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigate('NavigateCard')}
          style={tw`absolute top-1 left-5 p-3 rounded-full z-50`}>
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-3 text-lg`}>
          Select a Ride - {travelTimeInfo?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item: {id, title, image, multiplier}, item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && 'bg-gray-200'
            }`}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{uri: image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInfo?.duration?.text} Travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {travelTimeInfo &&
                new Intl.NumberFormat('uk-UA', {
                  style: 'currency',
                  currency: 'UAH',
                }).format(
                  (travelTimeInfo?.duration?.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    15,
                )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected || !travelTimeInfo}
          style={tw`bg-black py-3 m-3 ${
            (!selected || !travelTimeInfo) && 'bg-gray-300'
          }`}>
          <Text style={tw`text-center text-white text-lg`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
