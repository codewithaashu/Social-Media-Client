const GetUsername = (url = "ggfgf") => {
  if (url.charAt(url.length - 1) !== "/") {
    url = url + "/";
  }
  const arr = url.split("/");
  const username = arr[arr.length - 2];
  return username;
};
export default GetUsername;
