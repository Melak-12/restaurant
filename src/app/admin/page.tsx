"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Product, fetchMenuData, fetchProductData, fetchUserData } from "@/app/redux/features/ayncThunkApi";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Profile = () => {
  const user = useAppSelector((state) => state.user.userValue.email);
  const products :Product[]= useAppSelector((state) => state.products.productValue.products);
  const menus :Menu[]= useAppSelector((state) => state.menus.menuValue.menus);
  const users = useAppSelector((state) => state.user.userValue);
  const [tabs, setTabs] = useState(0);
  const [fetchedUsers, setFetchedUsers] = useState<any[]>([])

    const dispatch=useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);
    const [pageVisible, setPageVisible] = useState(false);
    const router=useRouter()
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            await dispatch(fetchUserData({ email: user || '' }));
            await  dispatch(fetchProductData())
            await dispatch(fetchMenuData())
            if (user !== 'melakabebeee@gmail.com') {
              router.push('/login');
            } else {
              setPageVisible(true);
            }
            if (tabs === 3) {
              const fetchUsers = async () => {
                try {
                  const response = await axios.get('http://localhost:5000/api/users/getme');
                  const users = response.data;
                setFetchedUsers(users)   
               console.log(users);
                  // You can set the users in state if needed
                  // setUserList(users);
                } catch (error) {
                  console.error('Error fetching users:', error);
                }
              };
          
              fetchUsers();
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // router.push('/login');
        }
      };
    
      fetchData();
    }, [router, dispatch,user,tabs]);
  console.warn("products are in admin  ",products)

  const deleteProduct=async(id:any)=>{
    console.log("the id is ",id)
    try {
      const response= await axios.delete(`http://localhost:5000/api/foods/${id}`).then(res=>{
        setIsOpen(false)
        console.log("deleted item",res)
        dispatch(fetchUserData({email:user.toString()}))
        dispatch(fetchProductData())

      }).catch(error=>
        console.log(error));

        console.log(response)
      }
     catch (error) {
      console.log(error)
    }
  }

  const handleModal = () => {
    setIsOpen((prev)=>!prev)
    }
  
  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
        //   push("/admin");
        //   toast.success("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  if(!pageVisible){
  return null
  }



  if (tabs === 3) {
    
  }
  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row  flex-row lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0 lg:h-[100vh]   justify-center flex lg:flex-col border-l-2 border-r-4 shadow-2xl">
        <div className="relative flex flex-col items-center px-10 py-5  border-b-0">
          <Image
            src="/burger.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1 text-slate-700">Admin</b>
        </div>
        <ul className="text-center  text-slate-600 text-lg font-bold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-cutlery"></i>
            <button className="ml-1 "onClick={()=>setTabs(0)}>Products</button>
            
          </li>
          <Link href="/add">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-plus-circle"></i>
            <button className="ml-1 ">Add Product</button>
            
          </li>
          </Link>
        
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-ellipsis-h"></i>
            <button className="ml-1"onClick={()=>setTabs(2)}>Menus</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1" onClick={()=>setTabs(1)}>Orders</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-user"></i>
            <button className="ml-1"onClick={()=>setTabs(3)}>users</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            onClick={() => window.open("/", "_blank")}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1">
              Go to the site <br /> 
            </button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            // onClick={() => push("/")}
          >
            <i className="fa fa-solid"></i>
            <button className="ml-1">
              Go to the site <br /> 
            </button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 4 && "bg-primary text-white"
            }`}
            onClick={closeAdminAccount}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>
      <div className="flex flex-col w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-9rem)] text-slate-500 ">
      {
        tabs==0 && products.map((item)=>(

      <div key={item._id}  className=" p-4  justify-center   lg:w-2/3 2xl:w-full mt-7 shadow-lg lg:px-20 xl:px-40">
        <div className="flex items-center  justify-between mb-4">
          <Image src={item.img} alt="" width={100} height={100} />
          <div className="">
            <h1 className="uppercase text-xl font-bold text-slate-600">{item.name}</h1>
            <span>Large</span>
          </div>
          
          <h2 className="font-bold text-yellow-600">${item.price}</h2>
          <Link href={`/admin/update/${item._id}`}>
          <i className="fa fa-edit text-blue-600 cursor-pointer"  ></i>
          </Link>

         <i className="fa fa-trash text-red-600 cursor-pointer" onClick={handleModal}></i> 
        </div>
        {isOpen && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-opacity-100 flex items-center justify-center backdrop-brightness-75 backdrop-blur-none ">
            <div className="bg-white rounded-lg p-8">
              <h3 className="font-bold text-lg mb-4">Delete!</h3>
              <p className="py-4 text-red-600">Are you sure you want to delete this item?</p>
              <div className="flex justify-around">
                <button
                  onClick={()=>deleteProduct(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
                <button
                  onClick={handleModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
       
       ))
      }
      {
        tabs==2 && menus.map((item)=>(

      <div key={item._id}  className=" p-4  justify-center   lg:w-2/3 2xl:w-full mt-7 shadow-lg lg:px-20 xl:px-40">
        <div className="flex items-center  justify-between mb-4">
          <Image src={item.img} alt="" width={100} height={100} />
          <div className="">
            <h1 className="uppercase text-xl font-bold text-slate-600">{item.collectionName}</h1>
            <span>{item._id}</span>
          </div>
          
          {/* <Link href={`/admin/update/${item._id}`}> */}
          <i className="fa fa-edit text-blue-600 cursor-pointer"  ></i>
          {/* </Link> */}

         <i className="fa fa-trash text-red-600 cursor-pointer" ></i> 
        </div>
        {isOpen && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-opacity-100 flex items-center justify-center backdrop-brightness-75 backdrop-blur-none ">
            <div className="bg-white rounded-lg p-8">
              <h3 className="font-bold text-lg mb-4">Delete!</h3>
              <p className="py-4 text-red-600">Are you sure you want to delete this item?</p>
              <div className="flex justify-around">
                <button
                  onClick={()=>deleteProduct(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
                <button
                  onClick={handleModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
       
       ))
      }
        {
        tabs==3 &&  fetchedUsers && fetchedUsers.map((item)=>(

      <div key={item._id}  className=" p-4 h-16 bg-slate-300  justify-center   lg:w-2/3 2xl:w-full mt-2 shadow-md pb-6 lg:px-10 xl:px-25">
        <div className="flex items-center  justify-between mb-6 pb-4">
        <i className="fa fa-user text-slate-600 cursor-pointer text-3xl" onClick={handleModal}></i> 
          <div className="">
            <h1 className="uppercase text-md font-bold text-slate-600">{item.name}</h1>
            <span>{item.email}</span>
          </div>
          <div className="pb-2">
            <h1 className="uppercase text-sm  text-slate-600">cart : {item.cart.length}</h1>
            <span className="text-green-500">{item.email==='melakabebeee@gmail.com'&&"Admin"}</span>
          </div>
          {/* <Link href={`/admin/update/${item._id}`}>
          <i className="fa fa-edit text-blue-600 cursor-pointer"  ></i>
          </Link> */}

         <i className="fa fa-trash text-red-600 cursor-pointer" ></i> 
        </div>
        {isOpen && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-opacity-100 flex items-center justify-center backdrop-brightness-75 backdrop-blur-none ">
            <div className="bg-white rounded-lg p-8">
              <h3 className="font-bold text-lg mb-4">Delete!</h3>
              <p className="py-4 text-red-600">Are you sure you want to delete this item?</p>
              <div className="flex justify-around">
                <button
                  onClick={()=>deleteProduct(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
                <button
                  onClick={handleModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
       
       ))
      }
      
      </div>
    </div>
  );
};



export default Profile;

