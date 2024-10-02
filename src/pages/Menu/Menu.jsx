import Cover from "../../components/Cover";
import img from "../../assets/menu/banner3.jpg";
import dessertimg from "../../assets/menu/dessert-bg.jpeg";
import pizzaimg from "../../assets/menu/pizza-bg.jpg";
import soupimg from "../../assets/menu/soup-bg.jpg";
import saladimg from "../../assets/menu/salad-bg.jpg";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {
  const [menus] = useMenu();
  const dessert = menus?.filter((item) => item.category === "dessert");
  const soup = menus?.filter((item) => item.category === "soup");
  const salad = menus?.filter((item) => item.category === "salad");
  const pizza = menus?.filter((item) => item.category === "pizza");
  const offered = menus?.filter((item) => item.category === "offered");
  return (
    <div className="">
      <Cover img={img} title="Our menu" />
      <SectionTitle heading={"Don't Miss"} subHeading={"Today's offered"} />
      <MenuCategory items={offered} />
      <Cover img={dessertimg} title="Dessert" />
      <SectionTitle heading={"Don't Miss"} subHeading={"Today's offered"} />
      <MenuCategory items={dessert} />
      <Cover img={pizzaimg} title="pizza" />
      <SectionTitle heading={"Don't Miss"} subHeading={"Today's offered"} />
      <MenuCategory items={pizza} />
      <Cover img={saladimg} title="salad" />
      <SectionTitle heading={"Don't Miss"} subHeading={"Today's offered"} />
      <MenuCategory items={salad} />
      <Cover img={soupimg} title="soup" />
      <SectionTitle heading={"Don't Miss"} subHeading={"Today's offered"} />
      <MenuCategory items={soup} />
    </div>
  );
};

export default Menu;
