import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useCalculator } from './use-calculator';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATION: '#f39c29',
  NUM: '#5c5674',
};

// Button Type : 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type, isSeleted }) => {
  const backgroundColor =
    type === 'reset' ? COLOR.RESET : type === 'operator' ? COLOR.OPERATION : type === 'num' ? COLOR.NUM : 'transparant';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: isSeleted ? 1 : 0.2,
        color: 'black',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const InputConatiner = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  padding: 10px 5px;
`;

const Calculate = () => {
  const {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperater,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  } = useCalculator();

  return (
    <View style={{ flex: 1, width: 250, justifyContent: 'center' }}>
      <InputConatiner>
        <Text style={{ color: 'white', fontSize: 35, textAlign: 'right' }}>{input}</Text>
      </InputConatiner>

      <ButtonContainer>
        <Button text={hasInput ? 'C' : 'AC'} type="reset" onPress={onPressReset} flex={3} />
        <Button
          text="/"
          type="operator"
          onPress={() => onPressOperator('/')}
          flex={1}
          isSelected={currentOperator === '/'}
        />
      </ButtonContainer>

      <ButtonContainer>
        {[7, 8, 9].map((num, i) => (
          <Button key={i} text={`${num}`} type="num" onPress={() => onPressNum(num)} flex={1} />
        ))}
        <Button
          text="*"
          type="operator"
          onPress={() => onPressOperator('*')}
          flex={1}
          isSelected={currentOperator === '*'}
        />
      </ButtonContainer>

      <ButtonContainer>
        {[4, 5, 6].map((num, i) => (
          <Button key={i} text={`${num}`} type="num" onPress={() => onPressNum(num)} flex={1} />
        ))}
        <Button
          text="-"
          type="operator"
          onPress={() => onPressOperator('-')}
          flex={1}
          isSelected={currentOperator === '-'}
        />
      </ButtonContainer>

      <ButtonContainer>
        {[1, 2, 3].map((num, i) => (
          <Button key={i} text={`${num}`} type="num" onPress={() => onPressNum(num)} flex={1} />
        ))}
        <Button
          text="+"
          type="operator"
          onPress={() => onPressOperator('+')}
          flex={1}
          isSelected={currentOperator === '+'}
        />
      </ButtonContainer>

      <ButtonContainer>
        <Button text="0" type="num" onPress={() => onPressNum(0)} flex={3} />
        <Button text="=" type="operator" onPress={() => onPressOperator('=')} flex={1} />
      </ButtonContainer>
    </View>
  );
};

export default Calculate;
