import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

//Employee ---> User      

export const useChatStore = create((set, get) => ({
  isUsersLoading: false,

  //to get all employees
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data.filteredUsers });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  
  //to send feedback for that particular employee
  sendFeedback: async (feedbackData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/feedback/send/${selectedUser._id}`, feedbackData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  
  //to select that particular employee
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));