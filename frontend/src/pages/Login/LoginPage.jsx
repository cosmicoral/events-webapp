import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authClient } from "../../services/authentication"

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await authClient.signIn.email({
      email,
      password
    })

    if (error) {
      setError(error.message)
      return
    }

    navigate('/feed')
  }

  return (
    <div>
      <h1>Log in</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}
