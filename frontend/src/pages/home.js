import React from "react";

import ProductCategory from "../components/productCategoryDisplay";
import SlideBar from "../components/slideBar";
import VerticalCardProductBasedOnCategory from "../components/VerticalCardProductBasedOnCategory";
import HorizontalCardProductBasedOnCategory from "../components/HorizontalCardProductBasedOnCategory";
const Home = () => {
   

    return ( 
            <div className="">
                <ProductCategory />
                <SlideBar /> 

                <VerticalCardProductBasedOnCategory category={'phone'} headings={'Top Selling Phones'} />
                <VerticalCardProductBasedOnCategory category={'earpiece/Headset'} headings={'Best Airpods'} />
                <HorizontalCardProductBasedOnCategory category={'Watches'} headings={'Best Selling Watches'} /> 
                <HorizontalCardProductBasedOnCategory category={'shoes'} headings={'Trending Shoes'} />
                <VerticalCardProductBasedOnCategory category={'TV'} headings={'Top Selling TV'} />
                <VerticalCardProductBasedOnCategory category={'Mouse'} headings={'Mouse'} />
                <VerticalCardProductBasedOnCategory category={'Camera'} headings={'Camera'} />
                <VerticalCardProductBasedOnCategory category={'home appliances'} headings={'home appliances'} />
                <VerticalCardProductBasedOnCategory category={'printers'} headings={'printerss'} />
            </div>
     );
}
 
export default Home;