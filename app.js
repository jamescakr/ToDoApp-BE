const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log( `server is on ${PORT}`);
});


mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });


//<회원가입> 로직
//1. 유저가 이메일, 패스워드, 유저이름을 입력해서 백엔드로 보낸다
//2. 백엔드에서는 받은 정보를 저장한다 >> 데이터베이스 모델이 필요함
//3. 패스워드를 암호화(!) 시켜서 저장

//<회원가입> 코드구성
//1. 라우터 (/home /register /login 등의 경로)
//2. 모델 (데이터를 저장할 포맷, 설계도 >> userSchema)
//3. 데이터 저장(이미가입된 유저 유무 파악, 패스워드 암호화)
//4. 회원가입이 되었는지 응답을 해줌

//<로그인> 로직
//1. 이메일, 패스워드를 입력해서 보냄
//2. 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
//3. 없으면? 로그인 실패
//4. 있다면? 유저정보 + 토큰정보를 보내줌
//5. 프론트엔트에서 이 정보를 저장

//<로그인> 코드구성
//1. 라우터 설정
//2. 이메일, 패스워드 정보 읽어오기
//3. 이메일에 해당하는 유저정보 가져오기
//4. 데이터베이스에 있는 패스워드와 프론트엔드가 보낸 패스워드 일치여부 확인
//5. 틀리면? 에러메시지 발송
//6. 맞으면? 토큰 발행
//7. 유저정보 + 토큰을 보냄