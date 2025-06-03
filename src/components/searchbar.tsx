import React from 'react';
import {View, TextInput, FlatList, Text} from 'react-native';
import useDebounce from './useDebounce';

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Tomatoes',
  'Fig',
  'Grape',
];

const Searchbar = () => {
  const {useState} = React;
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const filteredFruits = fruits.filter(fruit => {
    return fruit.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
  });

  return (
    <View style={{marginTop: 150}}>
      <TextInput
        style={{borderWidth: 1, height: 50, alignSelf: 'center', width: 300}}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder="Search Fruits"
      />
      {searchQuery.length > 0 ? (
        <FlatList
          style={{marginLeft: 50}}
          data={filteredFruits}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={item => item}
        />
      ) : null}
    </View>
  );
};

export default Searchbar;
