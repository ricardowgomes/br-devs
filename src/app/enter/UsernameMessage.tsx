type UsernameMessage = {
  username: string, isValid: boolean, loading: boolean
}

export default function UsernameMessage({
  username, isValid, loading }: UsernameMessage) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}