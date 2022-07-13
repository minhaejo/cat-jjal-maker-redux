
const MainCard = ({ img, onHeartClick, alreadyFavorites }) => {
 
  const heartIcon = alreadyFavorites ? "💖" : "🤍";
  
  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="400" />
      <button className="heart_btn" onClick={onHeartClick}>{heartIcon}</button>
    </div>
  );
};
export default MainCard