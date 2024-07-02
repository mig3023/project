import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!, // 데이터베이스 이름
  process.env.MYSQL_USER!, // 사용자 이름
  process.env.MYSQL_PASSWORD!, // 사용자 비밀번호
  {
    host: process.env.MYSQL_HOST!, // 호스트 주소
    dialect: "mysql",
  }
);

export default sequelize;
