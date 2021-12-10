import styled from "@emotion/styled";

export const WrapYakwan = styled.div`
  padding: 50px 0;
  h1 {
    padding-left: 1.5rem;
    font-size: 20px;
  }
  .modal-body {
    position: relative;
    padding: 15px;
  }
`;

export const WrapPayedInfo = styled.div`
  display: flex;
  width: 830px;
  margin: 5rem auto;

  .payed_list {
    margin-left: auto;
    &.no {
      margin: 30px 0 0 100px;
    }
  }
  .userInfo {
    .name {
      font-size: 20px;
      font-weight: bold;
    }
    .withdrawal {
      margin-top: 10px;
      color: #aaa;
    }
  }
  .item {
    margin-top: 50px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .top {
    display: flex;
    .txt_pay_date {
      margin-left: auto;
    }
  }
  .box_payment_info {
    display: flex;
    padding: 1.5rem 0;
    border: 1px solid #ccc;
    .box {
      &:nth-of-type(1) {
        padding-left: 20px;
        width: 30%;
      }
      &:nth-of-type(2) {
        padding-left: 20px;
        width: 25%;
      }
      &:nth-of-type(3) {
        padding-left: 20px;
        width: 20%;
      }
      &:nth-of-type(4) {
        padding-left: 20px;
        width: 25%;
      }
    }

    dt {
      margin-bottom: 1rem;
      color: #999;
      font-size: 11px;
    }
    .box_btns {
      margin: 0 10px 0 auto;
      .button {
        border: 1px solid #ccc;
        padding: 3px;
        border-radius: 50px;
        &:first-of-type {
          margin-right: 10px;
        }
      }
    }
  }
`;
