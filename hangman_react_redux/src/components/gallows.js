import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Scaffold = styled.img`
  max-width: 800px;
`;

const Head = styled.img`
  position: absolute;
  top: 220px;
  width: 80px;
  left: 240px;
  z-index: 6;
`;

const Torso = styled.img`
  position: absolute;
  top: 290px;
  width: 200px;
  left: 200px;
  z-index: 4;
`;

const RArm = styled.img`
  position: absolute;
  top: 360px;
  width: 100px;
  left: 224px;
  z-index: 4;
  transform: rotate(260deg);
`;

const LArm = styled.img`
  position: absolute;
  top: 350px;
  width: 220px;
  left: 274px;
  z-index: 4;
  transform: rotate(70deg);
`;

const RLeg = styled.img`
  position: absolute;
  top: 450px;
  width: 150px;
  left: 194px;
  z-index: 5;
`;

const LLeg = styled.img`
  position: absolute;
  top: 550px;
  width: 300px;
  left: 200px;
  z-index: 30;
  transform: rotate(70deg);
  z-index: 4;
`;

function Gallows() {
  return (
    <Container>
      <div>Gallows</div>
      <div>
        <Scaffold src='gallows.jpg' />
        <Head src='gallows_1.png' />
        <Torso src='gallows_2.png' />
        <RArm src='gallows_3.png' />
        <LArm src='gallows_4.png' />
        <RLeg src='gallows_5.png' />
        <LLeg src='gallows_6.png' />
      </div>
    </Container>
  );
}

export default Gallows;
