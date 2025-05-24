// call the dishes from data or api

import { dishes } from "../../Data/data";

import MenuCard from "../../Components/MenuCard/MenuCard";

//  { id: 1, name: "Margherita Pizza", price: 10, desc: "Classic cheese pizza", img: "🍕" },
function Menu() {
  return (
    <>
      <div>
        <div>This is the menu-card page.</div>
        <p>
          In here we tell our customers about the great food-experience our{" "}
          <strong>Restaurant</strong> has to offer.
        </p>

        <br />
        <main className="flex gap-10">
          {dishes &&
            dishes.map((dish) => (
              <MenuCard
                key={dish.id}
                name={dish.name}
                price={dish.price}
                desc={dish.desc}
                image={dish.img}
              />
            ))}
        </main>
      </div>
    </>
  );
}

export default Menu;
