import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await httpService.put(userEndpoint + id, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(userEndpoint + id);
    return data;
  },
  getById: async (id) => {
    const { data } = await httpService.get(userEndpoint + id);
    return data;
  },
};

export default userService;
