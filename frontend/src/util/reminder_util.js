import axios from "axios";

export const getUserReminders = (id) => {
  return axios.get(`/api/reminders/user/${id}`);
};

export const writeReminder = (data) => {
  return axios.post("/api/reminders/", data);
};

export const getReminder = (id) => {
    return axios.get(`api/reminders/${id}`)
}

export const deleteReminder = (id) => {
    debugger
    return axios.delete(`api/reminders/${id}`)
}
