import axios from "@/utils/request";
//登录的接口
export const login = (data) => {
  return axios({
    url: "/v1_0/authorizations",
    method: "post",
    data,
  });
};

//获取短信验证码接口
export const getSmsCode = (mobile) => {
  return axios({
    method: "get",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
