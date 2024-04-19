import toast from "react-hot-toast";
const successToast = (message = "Success") => toast.success(message);
const errorToast = (message = "Error") => toast.error(message);
const loadingToast = (message = "Loading") => toast.loading(message);
export { successToast, errorToast, loadingToast };
