import React from 'react';
import { Spin, Alert } from 'antd'

const Loading = props => {

  if (props.load === false) {
    return <div style={{display: 'flex', marginTop: '20rem', justifyContent: 'center'}}>
      <Alert message={props.error} type="error" showIcon style={{display: 'flex', width: '300px', padding: '1.5rem', fontFamily: 'Poppins', fontWeight: 'bold', color: '#282c34'}} />
    </div>
  }

  return ( 
    <div style={{display: 'flex', marginTop: '20rem', alignSelf: 'center', flexDirection: 'column'}}>
      <Spin size="large"/>
      <label style={{marginTop: '1rem', fontSize: '15px'}}>Loading</label>
    </div>
  );
}

export default Loading;