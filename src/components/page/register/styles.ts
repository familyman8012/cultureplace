import styled from "@emotion/styled";

const RegisterForm = styled.div` 
width: 49rem;
margin: 5rem auto;
h2 {
  margin-bottom: 5rem;
}
.h1 {
  margin-top: 8rem;
  color: white;
  font-size: 25px;
  padding-bottom: 0px;
}

.form {
  max-width: 80rem;
  margin: 0 auto;
}

.p {
  color: #bf1650;
  text-align: center;
}

select,
input:not([type=checkbox]):not([type=radio]) {
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.4rem;
  border: 1px solid #ddd;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 14px;
}

.box_radio {
padding:20px 0;
input[type=radio] {
  margin-left:50px;
  margin-right:10px;
  &:first-of-type {margin-left:0;}
}
}


.label,
section > label {
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 1.3rem;
  margin-top: 2rem;
  font-size: 14px;
  font-weight: 200;
}

input[type="submit"],
.button {
  background: #ec5990;
  color: white;
  text-transform: uppercase;
  border: none;
  margin-top: 2rem;
  padding: 2rem;
  font-size: 16px;
  font-weight: bold;
  display: block;
  appearance: none;
  border-radius: 0.4rem;
  width: 100%;
  font-weight: lighter;
}
input[type="submit"] {
  margin-bottom: 0;
}
.txt_read_yakawn {
  margin: 0 0 1.5rem;
  padding: 1.5rem 0;
  text-align: center;
  border-bottom: 1px solid rgba(16, 22, 26, 0.15);
}
.notice_yakwan {
  font-size: 12px;
  text-align: center;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(16, 22, 26, 0.15);
}

.buttonBlack {
  background: black;
  border: 1px solid white;
}

.App {
  max-width: 60rem;
  margin: 0 auto;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
}

.counter {
  font-weight: 400;
  background: white;
  color: black;
  padding: 1rem 1.5rem;
  border-radius: 0.4rem;
  position: fixed;
  top: 2rem;
  right: 3rem;
  z-index: 9999999;
}

button[type="button"] {
  padding: 0.5rem;
  background: #516391;
  color: white;
  letter-spacing: 0px;
  text-transform: none;
  padding: 1rem;
  letter-spacing: 0.2rem;
}

button[type="button"]:hover {
  background: #bf1650;
  color: white;
}
}

.login_wrapper {
display: flex;
width: 100vw;
height: 100vh;
.login_area,
.login_mv {
  width: 50%;
}
.login_area {
  display: flex;
  flex-direction: column;
  background: #fff;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 18px;
    font-weight: bold;
  }
  h2 {
    margin: 3rem 0;
  }
  .login_form {
    width: 37.6rem;
  }
}

.login_mv {
  background: url("../public/images/login-bg.jpg") no-repeat left top;
  background-size: cover;
}
`;

export default RegisterForm;
