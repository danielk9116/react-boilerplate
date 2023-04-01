import React from 'react'

export default function Error () {
  const styleSheet = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div className="container" style={styleSheet}>
      <h1>404</h1>
    </div>
  )
}
