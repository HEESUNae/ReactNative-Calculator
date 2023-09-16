import { useState } from 'react';

export const useCalculator = () => {
  const [input, setInput] = useState(0); // 마지막으로 누른 숫자
  const [currentOperator, setCurrentOperater] = useState(null); // +,-,= 등호 저장
  const [result, setResult] = useState(null); // 최종 계산값 저장
  // = 만 클릭시 이전 input 값 실행
  const [tempInput, setTempInput] = useState(null); // 2
  const [tempOperater, setTempOperater] = useState(null);
  const [isClickedOperator, setIsClickedOperator] = useState(false); //직전 "+,-,*,/" 눌렀는지 여부
  const [isClickedEqual, setIsClickedEqual] = useState(false); // 직전 "=" 눌렀는지 여부

  const hasInput = !!input;

  // 숫자 이어붙히기
  const onPressNum = (num) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
      setIsClickedEqual(false);
    } else {
      const newInput = +`${input}${num}`;
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== '=') {
      setCurrentOperater(operator);
      setIsClickedOperator(true);
    } else {
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input;
      const finalOperator = isClickedEqual ? tempOperater : currentOperator;
      switch (finalOperator) {
        case '+':
          finalResult = result + finalInput;
          break;
        case '-':
          finalResult = result - finalInput;
          break;
        case '*':
          finalResult = result * finalInput;
          break;
        case '/':
          finalResult = result / finalInput;
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperater(null);
      setTempOperater(finalOperator);
      setIsClickedEqual(true);
    }
  };

  // 초기화
  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setCurrentOperater(null);
      setResult(null);
      setTempInput(null);
      setTempOperater(null);
    }
  };

  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperater,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
