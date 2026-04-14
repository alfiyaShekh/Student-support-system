import { useState } from "react";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 px-4">

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white p-8 flex flex-col justify-center">

          <h3 className="text-sm font-semibold mb-4">
            COMPANY LOGO
          </h3>

          <h1 className="text-3xl font-bold">
            Welcome to <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent p-1">Mentora</span>
          </h1>

          <p className="mt-4 text-sm opacity-90">
            Connect with mentors and make your college journey smooth and confident
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8">

          <h2 className="text-2xl font-bold text-blue-500">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {isLogin
              ? "Welcome! Login to continue."
              : "Create your account to get started."}
          </p>

          {/* FORM */}
          <form className="mt-6 space-y-4">

            {/* SIGNUP ONLY */}
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Class"
                  className="w-full p-3 border rounded-lg"
                />

                <select className="w-full p-3 border rounded-lg">
                  <option value="">Register As</option>
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </select>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg"
                />
              </>
            )}

            {/* LOGIN FIELD */}
            {isLogin && (
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border rounded-lg"
              />
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
            />

            {/* Checkbox */}
            {isLogin && (
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
            </button>

          </form>

          {/* TOGGLE */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            {isLogin ? "New User?" : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 ml-1 font-medium"
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;