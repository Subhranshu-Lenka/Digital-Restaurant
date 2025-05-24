// call the dishes from data or api

import { dishes } from "../../Data/data";

import MenuCard from "../../Components/MenuCard/MenuCard";

//  { id: 1, name: "Margherita Pizza", price: 10, desc: "Classic cheese pizza", img: "🍕" },
function Menu() {
  return (
    <>
      <div className="border-2 w-full">
        <div>This is the menu-card page.</div>
        <p>
          In here we tell our customers about the great food-experience our{" "}
          <strong>Restaurant</strong> has to offer.
        </p>

        <br />
        {/* <main className="flex flex-wrap justify-between gap-10"> */}
        <main className="border-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {dishes &&
            dishes.map((dish) => (
              <div
                key={dish.id}
                className="flex items-center justify-center p-4"
              >
                <MenuCard
                  key={dish.id}
                  name={dish.name}
                  price={dish.price}
                  desc={dish.desc}
                  image={dish.img}
                />
              </div>
            ))}
        </main>
      </div>
    </>
  );
}

export default Menu;
