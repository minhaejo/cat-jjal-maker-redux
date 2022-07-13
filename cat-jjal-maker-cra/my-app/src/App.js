import logo from './logo.svg';
import React, { useEffect ,useState } from "react"
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Favorited from './components/Favorited';
import MainCard from './components/MainCard';
import { useDispatch } from "react-redux";
import { saveFavoriteCat } from "./features/catSlice";
import { saveTitleCount } from './features/catSlice';


import selectCat  from './features/catSlice';
import { useSelector } from 'react-redux';




const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(
    `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

 


const App = () => {
   const dispatch =useDispatch()
  const CAT1 =
    "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 =
    "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  //로컬스토리지엔 데이터가 무조건 스트링으로감

  const [counter, setCounter] = React.useState(1); // 얘는 저기서 관리돼야함 

  const [mainCat, setMainCat] = React.useState(CAT1); // 얘를 패치로 받아올거 

  const [favorites, setFavorites] = React.useState([]);
  //빈배열로 초기화해라

//  useEffect(()=>{
//    setCounter(() => {
//     return jsonLocalStorage.getItem("counter");
//   })
//    setFavorites(() => {
//     return jsonLocalStorage.getItem(favorites) || [];
//   })
//  },[])

  const alreadyFavorites = favorites.includes(mainCat);
  //3항으로 하트 색 바꿀거 진위여부에따라

  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    setMainCat(newCat);
  }
  React.useEffect(() => {
    setInitialCat();
  }, []);

  React.useEffect(() => {}, []); //리액트 컴포넌트안에 있는 코드는 기본적으로 ui가 업뎃될때마다 계속 불림
  //제한하고 싶을때 유즈이펙트에 두번째 인자를 배열로넘기고 특정상황일때 제한하고싶다 하면 그 속성값 넣고
  //아니다 하면 그냥 빈배열만

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCat(newCat);

    setCounter((prev) => {
      
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;

    });
  }
  //id state 만들고 slice 기qhs id  설정
  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites); 
    jsonLocalStorage.setItem("favorites", nextFavorites);
    dispatch(saveFavoriteCat(favorites))
  }

  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div className='main_container'>
      <Title>{counterTitle} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} counter={counter}/>
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorites={alreadyFavorites}
      />
      <Favorited favorites={favorites} />
    </div>
  );
};

export default App;
