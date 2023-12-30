export const domain = () => {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  else return process.env.DOMAIN_URL;
};
