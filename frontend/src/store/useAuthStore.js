import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:5001" : "/" ;

export const useAuthStore = create((set, get) => ({
  userRole:"",
  authUser: null,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error.response?.data?.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

    loginAsHR :() => {
    set({ authUser: true }); // Set authUser to true for HR as well
    set({userRole:'hr'})
    // Potentially set a session marker
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      set({userRole:"employee"})
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      set({userRole:""})

      // Programmatically navigate to the login page
      const navigate = get().navigate;
      if (navigate) {
        navigate('/login');
      } else {
        console.warn("Navigate function not available in the store.");
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Add the navigate function to the store
  setNavigate: (navigateFn) => set({ navigate: navigateFn }),
}));

// Create a wrapper component to provide navigate to the store
export const AuthStoreProvider = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    useAuthStore.getState().setNavigate(navigate);
  }, [navigate]);

  return children;
};
// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";

// const BASE_URL =  import.meta.env.MODE==="development" ? "http://localhost:5001" : "/" ;

// export const useAuthStore = create((set, get) => ({
//   autthUser: null,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,
//   isHR:false,

//   checkAuth: async () => {  
//     try {
//       const res = await axiosInstance.get("/auth/check");

//       set({ authUser: res.data });
    
//     } catch (error) {
//       console.log("Error in checkAuth:", error.response.data.message);
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//    loginAsHR :async= () => {
    
//     set({isHR:true})
//     // Potentially set a session marker
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const res = await axiosInstance.post("/auth/login", data);
//       set({ authUser: res.data });
//       toast.success("Logged in successfully");
// set({userRole:"employee"})
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isLoggingIn: false });
      
//     }
//   },

//   logout: async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//       set({ authUser: null });
//       toast.success("Logged out successfully");
//       set({userRole:""})
      
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   },

//   updateProfile: async (data) => {
//     set({ isUpdatingProfile: true });
//     try {
//       const res = await axiosInstance.put("/auth/update-profile", data);
//       set({ authUser: res.data });
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("error in update profile:", error);
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isUpdatingProfile: false });
//     }
//   },
// }));