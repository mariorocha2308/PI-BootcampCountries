import React, { useState, useEffect } from 'react';
import { Spin, Alert } from 'antd'

const Loading = props => {

  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => setDelay(true), 3000)
  },[])

  if (delay) {
    return <Alert message={props.error} type="error" showIcon style={{display: 'flex', marginTop: '20rem', alignSelf: 'center', width: '300px', padding: '1.5rem', fontFamily: 'Poppins', fontWeight: 'bold', color: '#282c34' }} />
  }

  return ( 
    <div className='notAvalaible'>
      <Spin size="large"/>
      <label className='notFound-text'>Loading</label>
    </div>
  );
}
 
export default Loading;