import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer.jsx";
import Styles2 from "./Login2.module.css";
// import kakao from "../assets/kakao.png";
import React, { useState } from "react";
import axios from "axios";
import NewNav from "../components/layout/NewNav.jsx";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Kakaojoin from "./Kakaojoin.jsx";

const { Kakao } = window;

function Login2() {

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

    const loginSuccess = () => {
        Swal.fire({
          title: "로그인 성공!",
          text: "POLLING에 오신 것을 환영합니다!",
          icon: "success",
          confirmButtonColor: "#73E0C1",
          confirmButtonText: "확인",
        })
      };
    
      const loginFail = () => {
        Swal.fire({
          title:"로그인 실패!",
          icon: 'error',
          confirmButtonColor: '#73E0C1',
          confirmButtonText: '확인'
        })
      }

    //이메일 받아오기
    const [email, setEmail] = useState("");
    const getEmail = (e) => {
        setEmail(e.target.value);
        console.log(email);
    };

    //비밀번호 받아오기
    const [password, setPassword] = useState("");
    const getPassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    };

    //페이지 이동
    const navigate = useNavigate();

    // 회원가입 로그인하기
    const onLogin = (e) => {
        if(email === "" || password === ""){
            e.preventDefault();
            alert("이메일/비밀번호를 입력해주세요");
        } else if(email !== "" && password !==""){
            axios
              .post(
                "https://j6a304.p.ssafy.io:8080/api/auth",
                  {
                      email: email,
                      password: password,
                  },
              )
            .then((res) => {
                console.log("res", res);
                //토큰 찍어보기
                console.log("토큰",res.headers.refreshToken);
                // console.log("토큰",res.headers.get("refreshToken"));
                console.log("로그인 성공");
                loginSuccess();
                alert("로그인 성공");
                //백에 닉네임, e-mail 같이 넘겨달라고 하기.
                // if (state.length === 0) {
                //   DispatchaddInfo({
                //     seq: res.data.seq,
                //     nickname: res.data.nickname,
                //     token: res.data.token,
                //     email: res.data.email,
                //   });
                // }
                navigate("/");
            })
            .catch(error => {
                const message = error.message;
                console.log("error", error);
                console.log("message", message);
                alert("로그인 실패");
                loginFail();
              });
        }
    };

    //카톡 로그인
    const LoginWithKakao = () => {
      
      Kakao.Auth.login({
          success: (response) => {
            // console.log(response.refresh_token);
            console.log(response.access_token);
            const accessToken = response.access_token;
            axios
              .post("https://j6a304.p.ssafy.io:8080/api/auth/validate", {
                accessToken: response.access_token,
                // accessToken: response.refresh_token,
              })
              .then((res) => {
                console.log("res",res);
                console.log("res",res.data.member);
                console.log("token",res.data.token);
                // const token 
                
                if(res.data.member === false){
                  // localStorage.setItem("token", res.data.token);
                  // if (state.length === 0) {
                    //   DispatchaddInfo({
                      //     id: res.data.seq,
                      //     nickname: res.data.nickname,
                      //     role: res.data.token,
                      //     email: res.data.email,
                      //   });
                      // }
                  // <Kakaojoin accessToken={accessToken}/>
                  navigate(`/Kakaojoin/${accessToken}`);
                } else if (res.data.member === true){
                  // if (state.length === 0) {
                  //   DispatchaddInfo({
                  //     id: res.data.seq,
                  //     nickname: res.data.nickname,
                  //     role: res.data.token,
                  //     email: res.data.email,
                  //   });
                  // }
                  loginSuccess();
                  navigate("/");
                }
                
              })
              // .catch(error => {
              //   const message = error.message;
              //   console.log("error", error);
              //   console.log("message", message);
              //   alert("로그인 실패");
              //   loginFail();
              // });
          },
          fail: (error) => {
            console.log(error);
            const message = error.message;
            console.log("error", error);
            console.log("message", message);
            loginFail();
            navigate("/");
            
          },
        });
      };

    return (
        <>
        <div>
            {/* <Nav/> */}
            <NewNav />
            {/* 로그인 */}
            {/* <div className={Styles2.container} onclick="onclick" > */}
            <div className={Styles2.container} >
                <div className={Styles2.top}></div>
                <div className={Styles2.bottom}></div>
                <div className={Styles2.center}>
                    <div className={Styles2.signin}>Sign In&nbsp;</div>
                    {/* <h2>Sign In &nbsp;</h2>  */}
                    {/* <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/> */}
                        <input type={"email"} placeholder=" E-mail" className={Styles2.email} onChange={getEmail} name="email"/>
                        <input type={"password"} placeholder=" Password" className={Styles2.password} onChange={getPassword} name="password"/>
                        <button className={Styles2.signinbtn} onClick={onLogin}>Sign in</button>
                    <div>
                        <Link to="/Companylogin" className={Styles2.company}>기업회원 로그인 / </Link>
                        {/* <button className={Styles2.kakao}>
                            <img src={kakao}  alt="kakaoTalk" className={Styles2.kakaoimg}></img>
                        </button> */}
                        <button className={Styles2.kakao} onClick={LoginWithKakao}> 카카오톡 로그인 </button>
                    </div>
                    <div className={Styles2.question}>Don’t have an account?</div>
                    <Link to="/join" className={Styles2.join}>Join us</Link>
                    <h2>&nbsp;</h2>
                </div>
            </div>

            
            {/* <Footer /> */}
        </div>
        </>
    );
}

export default Login2;