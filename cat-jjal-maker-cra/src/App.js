import logo from './logo.svg';
import React from "react"
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Favorited from './components/Favorited';
import MainCard from './components/MainCard';

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
  const CAT1 =
    "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 =
    "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  //로컬스토리지엔 데이터가 무조건 스트링으로감

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });

  const [mainCat, setMainCat] = React.useState(CAT1);

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem(favorites) || [];
  });
  //빈배열로 초기화해라

  const alreadyFavorites = favorites.includes(mainCat);

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
  
  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div>
      <Title>{counterTitle} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
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
