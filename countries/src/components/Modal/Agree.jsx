import React from 'react';
import { Modal } from 'antd';

const Agree = props => {
  return (  
    <Modal title="Are you sure?" visible={props.visible} onOk={props.handleOk} onCancel={props.handleCancel}>
      <p>You won't be able to revert this!</p>
    </Modal>
  );
}

export default Agree;