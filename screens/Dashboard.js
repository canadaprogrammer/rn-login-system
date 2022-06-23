import React from 'react';
import MainContainer from '../components/Containers/MainContainer';
import { colors } from '../components/colors';
import styled from 'styled-components/native';
import { ScreenHeight } from '../components/shared';
import BigText from '../components/Texts/BigText';
import InfoCard from '../components/Cards/InfoCard';

const { darkGray, accent } = colors;

const TopBg = styled.View`
  background-color: ${darkGray};
  width: 100%;
  height: ${ScreenHeight * 0.3}px;
  border-radius: 30px;
  position: absolute;
  top: -30px;
`;

const Dashboard = () => {
  return (
    <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
      <TopBg />
      <MainContainer style={{ backgroundColor: 'transparent' }}>
        <BigText style={{ marginBottom: 25, fontWeight: 'bold' }}>
          Hello, Jin!
        </BigText>
        <InfoCard
          icon='chart-timeline-variant'
          title='Balance'
          value='12,345.00'
          date='22/06/2022'
          color={darkGray}
          style={{ marginBottom: 25 }}
        />
        <InfoCard
          icon='chart-arc'
          title='Saving'
          value='2,125.00'
          date='Last 6 months'
        />
      </MainContainer>
    </MainContainer>
  );
};

export default Dashboard;
