import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Pagination = ({ page, setPage, totalRows, numberofRows }) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        hitSlop={3}
        onPress={() => setPage(p => Math.max(1, p - 1))}>
        <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>
          PREV
        </Text>
      </TouchableOpacity>
      <Text>
        {page} / {Math.ceil(totalRows / numberofRows)}
      </Text>
      <TouchableOpacity
        hitSlop={3}
        onPress={() =>
          setPage(p => Math.min(p + 1, Math.ceil(totalRows / numberofRows)))
        }>
        <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>
          NEXT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});
