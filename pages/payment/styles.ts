import styled from "@emotion/styled";

const WrapPayment = styled.div`
  background: #f3f3f3;
  .wrap_box_area {
    display: flex;
    justify-content: center;
    padding-bottom: 7rem;
  }
  h2 {
    padding: 5rem 0 3rem;
    font-size: 28px;
    text-align: center;
  }
  h3 {
    font-size: 16px;
    margin-bottom: 1.5rem;
  }
  .info {
    margin-right: 1.5rem;
  }
  .box {
    padding: 2.4rem 1.6rem;
    background: #fff;
    &.box_product {
      width: 52rem;
      margin-bottom: 1.5rem;
      .cont {
        display: flex;
      }
    }
    &.box_user {
      .tel {
        width: 80%;
        height: 30px;
        margin-top: 1rem;
        padding-left: 1rem;
        border: 1px solid #ccc;
      }
    }
    &.box_price {
      width: 32.5rem;
      margin-bottom: 1.5rem;

      p {
        display: flex;
      }
      .price {
        margin-left: auto;
        font-size: 20px;
      }
    }
    .thumb {
      width: 90px;
      height: 90px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .price {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .box_agree {
    input {
      margin-right: 1rem;
    }
    font-size: 13px;
  }
  .btn_pay {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 53px;
    cursor: pointer;
    background: #000;
  }
`;

export default WrapPayment;
