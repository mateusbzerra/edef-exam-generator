import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: #6986be;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Content = styled.form`
  background: #eee;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border-radius: 10px;
`;
export const Input = styled.input`
  margin-bottom: 10px;
  height: 44px;
  border: none;
  padding: 0px 10px;
  border-radius: 5px;
  font-size: 14px;
`;
export const Image = styled.img`
  max-width: 100%;
  width: 100%;
  margin-bottom: 20px;
`;
export const Button = styled.button`
  height: 50px;
  background: #40426e;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
`;

export const Label = styled.p`
  font-size: 15px;

  margin: 10px 0px;
  color: #40426e;
`;
