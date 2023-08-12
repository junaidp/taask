import request from "./request";
// ref:https://gist.github.com/sheharyarn/7f43ef98c5363a34652e60259370d2cb

function get(url, token) {
  return request({
    method: "GET",
    url,
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
}
function getWithBody(url, data, token) {
  return request({
    method: "GET",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function post({ url, data, token, contentType }) {
  return request({
    method: "POST",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      // ...(contentType == "multipart/form-data" && {
      //   "Content-Type": "multipart/form-data",
      // }),
      // ...(contentType == "application/json" && {
      //   "Content-Type": "application/json",
      // }),
    },
  });
}

function update({ url, data, token }) {
  return request({
    method: "PUT",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function remove({ url, data, token }) {
  return request({
    method: "DELETE",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const Service = {
  get,
  post,
  update,
  remove,
  getWithBody,
};
export default Service;
