/* eslint-disable tailwindcss/classnames-order */
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userActions } from "../../Store/UserSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Card, Button } from "flowbite-react";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
      const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + user.user?._id);
      dispatch(userActions.login(res.data));
    } catch (error) {
      toast.error("failed");
    }
  }
useEffect(()=>{
getData();
},[])
return (
  <>
      <div className="flex flex-col items-center w-full min-h-screen gap-3 p-6 pt-10 bg-pinky dark:bg-brownish">
          <h1 className="mt-5 text-3xl ">Profile Page </h1>
          <div className="max-w-full text-center">
              <Card className="max-w-sm transition-all duration-300 shadow-lg dark:border-black dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:ring-2 ring-slate-600 shadow-slate-800 dark:shadow-slate-500 dark:text-white hover:opacity-70 bg-cardpink"
                  horizontal>
                  <img src={user.user?.image.url} alt={user.user?.image.alt} className="object-fill w-[150px] h-[200px] m-auto" />

                  <p className="text-lg font-semibold dark:text-white">
                      Name: {user.user?.name.first + " " + user.user?.name.middle + " " + user.user?.name.last}</p>
                  <p className="text-lg font-semibold dark:text-white"> Email: {user.user?.email}</p>
                  <p className="text-lg font-semibold dark:text-white"> Phone: {user.user?.phone}</p>
                  <p className="text-lg font-semibold dark:text-white"> house Number: {user.user?.address.houseNumber}</p>
                  <p className="text-lg font-semibold dark:text-white">
                      Address: {user.user?.address.country + ", " + user.user?.address.city + ", " + user.user?.address.street}
                  </p>

                  <Button
                      className="m-auto dark:bg-brown bg-pinky"
                      onClick={() => nav("/edit-user/" + user.user?._id)}
                  > Edit </Button>
              </Card>
          </div>
      </div>
  </>
)
};

export default Profile;
