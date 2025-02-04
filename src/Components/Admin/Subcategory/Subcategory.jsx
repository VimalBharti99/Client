import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubcategory, getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators";
import DataTable from 'react-data-table-component';

export default function SubCategory() {
  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Edit',
      sortable: false,
      selector:row => <Link to={`/admin/subcategory/update/${row._id}`}><i className='fa fa-edit text-success'></i></Link>
    },
    {
      name: 'Delete',
      sortable: false,
      selector:row => <button className='btn' onClick={()=>deleteItem(row._id)}><i className="fa fa-trash text-danger"></i></button>
    },
  ];
     let[data,setData] = useState([])
     let  dispatch = useDispatch()
     let SubcategoryStateData = useSelector((state)=>state.SubcategoryStateData)
     function deleteItem(_id){
       if(window.confirm("Are You Sure!!! want to Delete this item? ")){ 
         dispatch(deleteSubcategory({_id:_id}))
        getAPIData()
     }
    }
     function getAPIData(){
         dispatch(getSubcategory())
         if(SubcategoryStateData.length){
          setData(SubcategoryStateData)
         }
     }
    useEffect(()=>{
        getAPIData()
    },[SubcategoryStateData.length])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">Subcategory <Link to="/admin/subcategory/create"><i className="fa fa-plus text-light float-end"></i> </Link></h5>
            <div className='table-responsive'>  
            {/* <table className='table table-bordered'>
               <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                </tr>
               </thead>
               <tbody>
                   {
                       data.map((item,index)=>{
                       return <tr key={index}>
                           <td>{item._id}</td>
                           <td>{item.name}</td>
                           <td><Link to={`/admin/subcategory/update/${item._id}`}><i className='fa fa-edit text-success'></i></Link></td>
                           <td><button className='btn' onClick={()=>deleteItem(item._id)}><i className="fa fa-trash text-danger"></i></button></td>
                        </tr>
                    })
                   }
               </tbody>
            </table> */}
            <DataTable
                  className="table"
			            columns={columns}
		            	data={data}
                  pagination = {true}
                  load
		          />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
