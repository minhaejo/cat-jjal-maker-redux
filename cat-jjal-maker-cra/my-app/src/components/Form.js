import React from "react";
import { useDispatch } from "react-redux";
import { saveTitleCount } from '../features/catSlice';

const Form = ({ updateMainCat ,counter}) => {
  const dispatch =useDispatch()
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  //useState은 왜씀? : 동적으로 상태를 관리하기 위해서

  function handleInputChange(e) {
    const userValue = e.target.value;
    setErrorMessage("");
    if (includesHangul(userValue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    } else {
    }
    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (value == "") {
      setErrorMessage("빈 값으로 만들 수 없습니다.");
      return;
    }
    dispatch(saveTitleCount(counter))
    updateMainCat(value);
  }
  

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange}
      />
      <button type="submit">생성</button>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};

export default Form
  