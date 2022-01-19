import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background: #fff;
  a {
    display: block;
    text-align: right;
    text-decoration: underline;
  }
`;

export const ModalHeader = styled.div`
  position: relative;
  height: 29px;
  margin-bottom: 41px;
  h2 {
    margin-bottom: 0;
    font-size: 19px;
  }
`;

export const BtnClose = styled.span`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: url("/images/btn_close.png") no-repeat left top;
  background-size: 18px;
`;

export const ModalBody = styled.div`
  background: #fff;
`;
