import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, deleteData, selectItem } from './features/data/data.reducer';
import Loading from './components/Loading';
import ButtonContainer from './components/ButtonContainer';
import CheckBox from '@react-native-community/checkbox';
import ADIcon from 'react-native-vector-icons/AntDesign';
import Modal from './components/Modal';
import Pagination from './components/Pagination';

const NUMBER_OF_ROWS = 10;

const App = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(state => state.data);
  const [input, setInput] = useState('');
  const [tableData, setTableData] = useState(data);
  const [modalData, setModalData] = useState({
    id: null,
    open: false,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (input === '') {
      setTableData(data);
    } else {
      const newArr = data.filter(
        ele =>
          ele.name.toLowerCase().includes(input.toLowerCase()) ||
          ele.email.toLowerCase().includes(input.toLowerCase()) ||
          ele.role.toLowerCase().includes(input.toLowerCase()),
      );
      setTableData(newArr);
    }
  }, [input, data]);

  if (loading) return <Loading />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Search for any value"
        />
        <Modal modalData={modalData} setModalData={setModalData} />
        <ButtonContainer />
        <View style={styles.parentTable}>
          <View style={styles.tableContainer}>
            <View style={[styles.cell, styles.box]}>
              <Text style={{ fontWeight: '700' }}>BOX</Text>
            </View>
            <View style={[styles.cell, styles.name]}>
              <Text style={{ fontWeight: '700' }}>NAME</Text>
            </View>

            <View style={[styles.cell, styles.email]}>
              <Text style={{ fontWeight: '700' }}>EMAIL</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '700' }}>ROLE</Text>
            </View>
            <View style={[styles.cell, styles.right]}>
              <Text style={{ fontWeight: '700' }}>ACTIONS</Text>
            </View>
          </View>
          {tableData
            .slice(
              page * NUMBER_OF_ROWS - NUMBER_OF_ROWS,
              page * NUMBER_OF_ROWS,
            )
            .map(item => (
              <View key={item.id} style={styles.tableContainer}>
                <View style={[styles.cell, styles.box]}>
                  <CheckBox
                    onChange={() => dispatch(selectItem(item.id))}
                    value={item.checked}
                  />
                </View>

                <View style={[styles.cell, styles.name]}>
                  <Text>{item.name}</Text>
                </View>

                <View style={[styles.cell, styles.email]}>
                  <Text>{item.email}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{item.role}</Text>
                </View>
                <View style={[styles.cell, styles.button, styles.right]}>
                  <TouchableOpacity
                    hitSlop={3}
                    onPress={() => {
                      setModalData({ open: true, id: item.id });
                      console.log('Pressed');
                    }}>
                    <ADIcon name="edit" size={18} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => dispatch(deleteData(item.id))}>
                    <ADIcon name="delete" size={18} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
        <Pagination
          totalRows={tableData.length}
          numberofRows={NUMBER_OF_ROWS}
          page={page}
          setPage={setPage}
        />
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    margin: 16,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
  },

  box: { flex: 0.5 },
  email: { flex: 1.5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  tableContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 2,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.2,
    borderColor: '#999',
  },
  right: {
    borderRightWidth: 0,
  },
});
