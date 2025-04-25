export const API_ROUTES = {
  TASK: {
    BASE: process.env.SERVER_URL + '/task',
    TOGGLE_COMPLETED: (id: number) => process.env.SERVER_URL + `/task/${id}/toggle/`,
    DELETE: (id: number) => process.env.SERVER_URL + `/task/${id}`,
  },
};
