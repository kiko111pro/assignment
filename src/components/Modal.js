import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { editData } from '../features/data/data.reducer';

const CustomModal = ({ modalData, setModalData }) => {
  const { data } = useSelector(state => state.data);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const index = data.findIndex(ele => ele.id === modalData?.id);
    setName(data[index]?.name);
    setEmail(data[index]?.email);
    setIsAdmin(data[index]?.role === 'admin');
  }, [modalData, data]);

  const handleSubmit = () => {
    const submitData = {
      id: modalData.id,
      name,
      email,
      role: isAdmin ? 'admin' : 'member',
    };
    dispatch(editData(submitData));
    setModalData({ id: null, open: false });
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={modalData.open} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.fullWidth}>
              <Text>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.forminput}
              />
            </View>
            <View style={styles.fullWidth}>
              <Text>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.forminput}
              />
            </View>
            <View style={styles.fullWidth}>
              <Text>Role</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  value={isAdmin}
                  onChange={() => setIsAdmin(p => !p)}
                />
                <Text>Admin</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  value={!isAdmin}
                  onChange={() => setIsAdmin(p => !p)}
                />
                <Text>Member</Text>
              </View>
            </View>
            <Pressable onPress={handleSubmit} style={styles.modalSubmit}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>SUBMIT</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.45)',
  },
  modalSubmit: {
    backgroundColor: 'blue',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 13,
  },
  fullWidth: {
    width: '100%',
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  forminput: {
    borderWidth: 0.5,
    borderColor: '#333',
    minWidth: 200,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginTop: 3,
    marginBottom: 16,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CustomModal;
