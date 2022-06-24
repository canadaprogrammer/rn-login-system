import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileModal from '../Modals/ProfileModal';

const { primary, secondary, accent } = colors;
const StyledView = styled.TouchableOpacity`
  background-color: ${primary};
  flex-direction: column;
  height: 45px;
  width: 45px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${secondary};
`;

const Avatar = (props) => {
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const onLogout = async () => {
    setLoggingOut(true);

    // clear user credentials

    setLoggingOut(false);
    setModalVisible(false);

    // move to login
  };

  const showProfileModal = (user) => {
    setHeaderText(user);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const onAvatarPress = () => {
    showProfileModal('Jin Park');
  };
  return (
    <>
      <StyledView onPress={onAvatarPress} style={props.imgContainerStyle}>
        <MaterialCommunityIcons name='account' size={35} color={accent} />
      </StyledView>
      <ProfileModal
        modalVisible={modalVisible}
        headerText={headerText}
        buttonHandler={onLogout}
        loggingOut={loggingOut}
        hideModal={hideModal}
      />
    </>
  );
};

export default Avatar;
