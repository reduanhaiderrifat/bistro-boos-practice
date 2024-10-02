import orderCover from "../../assets/shop/banner2.jpg";
import Cover from "../../components/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../hooks/useMenu";
import FoodCard from "../../components/FoodCard";
import OrderTab from "../../components/OrderTab";
const Order = () => {
  const [menus] = useMenu();
  const dessert = menus?.filter((item) => item.category === "dessert");
  const soup = menus?.filter((item) => item.category === "soup");
  const salad = menus?.filter((item) => item.category === "salad");
  const pizza = menus?.filter((item) => item.category === "pizza");
  const drinks = menus?.filter((item) => item.category === "drinks");
  return (
    <div className=" ">
      <Cover img={orderCover} title="Order Food" />
      <Tabs>
        <TabList
          className={
            "flex my-12 justify-center border-b-4 border-yellow-500 border-t-4 py-4"
          }
        >
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Dessert</Tab>
          <Tab>Soup</Tab>
          <Tab>Drinks</Tab>
        </TabList>

        <TabPanel>
          <OrderTab items={salad} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizza} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={dessert} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={soup} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
