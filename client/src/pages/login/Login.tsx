
const Login = () => {
  const domain = import.meta.env.VITE_NODE_ENV === 'production'
    ? window.location.origin
    : import.meta.env.VITE_SERVER_DOMAIN

  const handleGoogleLogin = () => {
    window.location.replace(`${domain}/api/public/auth/google`)
  }

  handleGoogleLogin()

  return null
}

export default Login
