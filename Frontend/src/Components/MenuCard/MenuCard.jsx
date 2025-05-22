//  { id: 1, name: "Margherita Pizza", price: 10, desc: "Classic cheese pizza", img: "🍕" },
import './MenuCard.css'
function MenuCard({key, name, desc, price, image}) {

  /*
  border-2 
  bg-white 
  text-black
  aspect-[3/4]
  w-sm
  rounded-md
  */

  return (
    <>
        <div className="container">
          <img 
          className="card-img"
          src={image} alt="Dish Image" 
          />

          <h3
          className="card-heading"
          >{name}</h3>
          <p>{desc}</p>
          <p>{price}</p>

          <button>Add to Cart</button>
          <button>Save</button>
        </div>
    </>
  )
}

export default MenuCard