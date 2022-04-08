import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const Kakao = () => {
  const navigate = useNavigate();
  const query = queryString.parse(window.location.search);
  useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  });

  const getKakaoTokenHandler = async (code) => {
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_KEY,
      redirect_uri: "http://localhost:3000/auth/kakao/callback",
      code: code,
    };
    const queryString = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

    //토큰 발급 REST API
    axios
      .post("https://kauth.kakao.com/oauth/token", queryString, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        //서버에 토큰 전송
        sendKakaoTokenToServer(res.data.access_token, res.data.expires_in);
      })
      .catch((err) => navigate("/", true));
  };

  const sendKakaoTokenToServer = (token, expiresIn) => {
    axios
      .post(
        "/test/kakao",
        { access_token: token, expires_in: expiresIn },
        { withCredentials: true }
      ) // localhost:5000/test/kakao로 전송
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          window.localStorage.setItem("token", JSON.stringify(res.data.jwt));
          //토큰 만료시간 지나면 자동 삭제
          setTimeout(() => {
            window.localStorage.removeItem("token");
          }, expiresIn * 1000);
          navigate("/", true);
        } else {
          window.alert("로그인에 실패하였습니다.");
          navigate("/");
        }
      });
  };

  return <></>;
};

export default Kakao;
