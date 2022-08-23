import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSelected, getData } from '../features/data/data.reducer';
const ButtonContainer = () => {
  const dispatch = useDispatch();
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <TouchableOpacity
        style={{
          paddingVertical: 13,
          marginVertical: 16,
          backgroundColor: 'red',
          alignItems: 'center',
          flex: 0.8,
          borderRadius: 7,
          marginRight: 8,
        }}
        onPress={() => dispatch(deleteSelected())}>
        <Text style={{ color: 'white', fontWeight: '700' }}>
          Delete Selected
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 13,
          marginVertical: 16,
          flex: 0.8,
          backgroundColor: 'blue',
          marginLeft: 8,
          alignItems: 'center',
          borderRadius: 7,
        }}
        onPress={() => dispatch(getData())}>
        <Text style={{ color: 'white', fontWeight: '700' }}>RELOAD</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonContainer;
