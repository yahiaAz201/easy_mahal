import apisauce from "apisauce";

const client = apisauce.create({
  baseURL: process.env.NODE_ENV == "development" ? "http://localhost:3001" : "",
});

export default client;
