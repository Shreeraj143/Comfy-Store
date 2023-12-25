import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  // const user = useSelector((state) => state.userState.user);
  // const user = useSelector((state) => state.userState.user);
  if (!user) {
    toast.warn("You must be logged in to Checkout");
    return redirect("/login");
  }
  return null;
};
