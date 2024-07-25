import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMaincategory } from '../Store/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from "../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from '../Store/ActionCreators/BrandActionCreators'
import { getProduct } from '../Store/ActionCreators/ProductActionCreators'

const ClientSidebar = () => {
  let [product,setProduct] = useState([])
  let [maincategory,setMaincategory] = useState([])
  let [subcategory,setSubcategory] = useState([])
  let [brand,setBrand] = useState([])
  let [mc,setMc] = useState("All")
  let [sc,setSc] = useState("All")
  let [br,setBr] = useState("All")
  let [search,setSearch] = useState("")
  var allSubcategories = useSelector((state) => state.SubcategoryStateData);
  var dispatch = useDispatch();
  let ProductStateData = useSelector((state)=>state.ProductStateData)
  let MaincategoryStateData = useSelector((state)=>state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state)=>state.SubcategoryStateData)
  let BrandStateData = useSelector((state)=>state.BrandStateData)


  function categoryFilter(mc,sc,br, min=-1,max=-1){
    setMc(mc)
    setSc(sc)
    setBr(br)
    let data =[]
    if(mc ==="All" && sc==="All" && br==="All")
    data = ProductStateData
    else if(mc !=="All" && sc==="All" && br==="All")
      data = ProductStateData.filter((x)=>x.maincategory === mc)
    else if( mc ==="All" && sc !=="All" && br==="All" )
      data = ProductStateData.filter((x)=>x.subcategory === sc)
    else if(mc ==="All" && sc ==="All" && br!=="All")
      data = ProductStateData.filter((x)=>x.brand===br)
    else if(mc !=="All" && sc !=="All" && br==="All")
      data = ProductStateData.filter((x)=>x.maincategory===mc && x.subcategory===sc)
    else if(mc !=="All" && sc ==="All" && br!=="All")
      data = ProductStateData.filter((x)=>x.maincategory===mc && x.brand===br)
    else if(mc ==="All" && sc !=="All" && br!=="All")
      data = ProductStateData.filter((x)=>x.subcategory===sc && x.brand===br)
    else
       data = ProductStateData.filter((x)=>x.maincategory===mc && x.subcategory===sc && x.brand===br )
       if(min===-1 && max===-1)
         setProduct(data)
       else
         setProduct(data.filter((x)=>x.finalprice>=min && x.finalprice<max))
     }
     function postSearch(e){
      e.preventDefault()
      setProduct(ProductStateData.filter((x)=>x.name.toLowerCase().includes(search) || x.maincategory.toLowerCase() === search || x.subcategory.toLowerCase() === search || x.brand.toLowerCase() === search
      || x.color.toLowerCase() === search || x.size.toLowerCase() === search || x.description.toLowerCase().includes(search) ))
}

     function getAPIData(){
      dispatch(getProduct())
      if(ProductStateData.length)
      setProduct(ProductStateData)

      dispatch(getMaincategory())
      if(MaincategoryStateData.length)
      setMaincategory(MaincategoryStateData)

      dispatch(getSubcategory())
      if(SubcategoryStateData.length)
      setSubcategory(SubcategoryStateData)

      dispatch(getBrand())
      if(BrandStateData.length)
      setBrand(BrandStateData)
    }

  useEffect(() => {
    // dispatch(getSubcategory());
    getAPIData()
  }, [ProductStateData.length,MaincategoryStateData.length,SubcategoryStateData.length,BrandStateData.length]);
  return (
    <>
      <div className="list-group mb-3 ">
        <div
          // style={{ background: "#6068bf" }}
          className="list-group-item list-group-item-action active "
        >
          All Categories
        </div>
        <div
          className="list-group "
          style={{ height: "24rem", overflow: "auto" }}
        >
          {/* {allSubcategories.map((category, index) => (
            <Link
              key={index}
              to={`/shop/${category.name}`}
              className="list-group-item list-group-item-action"
            >
              <span className="float-start">{category.name}</span>
            </Link>
          ))} */}
          {
             SubcategoryStateData.map((item,index)=>{
                 return <button key={index} onClick={()=>categoryFilter(mc,item.name,br)} className="list-group-item list-group-item-action">{item.name}</button>
             })
           }
        </div>
      </div>
    </>
  );
};

export default ClientSidebar;
