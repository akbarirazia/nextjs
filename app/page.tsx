import Link from "next/link"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Welcome to the Mini App</h1>
      <p className="text-xl mb-4">
        This is a simple application for user authentication and profile
        management.
      </p>
      <div className="flex space-x-4">
        <Link href="/register">
          <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
            Register
          </span>
        </Link>
        <Link href="/login">
          <span className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
            Login
          </span>
        </Link>
        <Link href="/profile">
          <span className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 cursor-pointer">
            Profile
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Home
