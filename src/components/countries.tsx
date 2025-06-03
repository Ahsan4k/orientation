import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  useWindowDimensions,
  TextInput,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Countries = () => {
  const [result, setResult] = React.useState([]);
  const [columns, setColumns] = React.useState(2);
  const [searchCountries, setSearchCountries] = React.useState('');
  const {height, width} = useWindowDimensions();
  const fetchCountries = async () => {
    const response = await fetch(
      'https://gist.githubusercontent.com/peymano-wmt/32dcb892b06648910ddd40406e37fdab/raw/db25946fd77c5873b0303b858e861ce724e0dcd0/countries.json',
    );
    const res = await response.json();
    setResult(res);
  };

  React.useEffect(() => {
    fetchCountries();
  }, []);

  React.useEffect(() => {
    if (width < height) {
      setColumns(2);
    } else {
      setColumns(7);
    }
  }, [width, height]);

  const filteredCountries = result.filter(country => {
    return country.name.toLowerCase().includes(searchCountries);
  });

  return (
    <View style={{width: windowWidth, height: windowHeight}}>
      <TextInput
        style={{borderWidth: 1, height: 50, alignSelf: 'center', width: 300}}
        value={searchCountries}
        onChangeText={text => setSearchCountries(text)}
        placeholder="Search Countries"
      />
      <FlatList
        data={filteredCountries}
        numColumns={columns}
        key={columns}
        renderItem={({item}) => (
          <View style={{marginLeft: 20, marginTop: 30, width: 100}}>
            <Text style={{marginTop: 20, fontWeight: 'bold'}}>
              {item.name} {item.region} | {item.code}
            </Text>
            <Text style={{marginTop: 10}}>{item.capital}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Countries;
