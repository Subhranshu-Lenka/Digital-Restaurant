

//  { id: 1, name: "Margherita Pizza", price: 10, desc: "Classic cheese pizza", img: "🍕" },

function MenuCard({key, name, desc, price, image}) {
  return (
    <>
        <div className="border-2">
            ldvknslvkn
            <img src={image} alt="Dish Image" />
            <h3>{name}</h3>
            <p>{desc}</p>
            <p>{price}</p>
        </div>
    </>
  )
}

export default MenuCard