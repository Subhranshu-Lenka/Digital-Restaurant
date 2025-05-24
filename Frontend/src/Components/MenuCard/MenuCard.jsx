//  { id: 1, name: "Margherita Pizza", price: 10, desc: "Classic cheese pizza", img: "🍕" },
import "./MenuCard.css";
function MenuCard({ keys, name, desc, price, image }) {

  return (
    <>
      <div className="container">
        <div className="img-container">
          <img className="card-img" src={image} alt="Dish Image" />
        </div>

        <h3 className="card-heading">{name}</h3>
        <p>{desc}</p>
        <p>{price}</p>

        <button className="card-btn">Add to Cart</button>  
        <button className="card-btn">Save</button>
      </div>
    </>
  );
}

export default MenuCard;
