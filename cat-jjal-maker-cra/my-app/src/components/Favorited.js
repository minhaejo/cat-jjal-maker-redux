import CatItem from "./CatItem";
import { selectCat } from "../features/catSlice";
import {useSelector} from "react-redux"



function Favorited() {
  const favorites = useSelector(selectCat)
  
  if (favorites.length === 0) {
    return <div className="save_cat_text"> 사진 위 하트를 눌러 고양이 사진을 저장해 봐요!</div>;
  } //조건부 렌더링
  return (
    <ul className="favorites">
      {favorites.map((cat) => {
        return <CatItem img={cat} key={cat} />;
      })}
    </ul>
  );
}
export default Favorited