
function CatItem(props) {
  return (
    <li className="cat_item">
      <img src={props.img} style={{ width: "150px" }}  />
    </li>
  );
}
export default CatItem