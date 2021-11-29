import React from 'react'

const Login = () => {
  const handleGoogleLogin = () => {
    const domain =
      import.meta.env.VITE_NODE_ENV === 'production'
        ? window.location.origin
        : import.meta.env.VITE_SERVER_DOMAIN
    window.location.replace(`${domain}/api/public/auth/google`)
  }

  handleGoogleLogin()

  return <p>redirecting to login ...</p>
}

export default Login
