import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/authLayout";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Login Data:", formData);

    // Backend API will be connected here later.

    // Temporary navigation
    // navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Enter your credentials to access your financial dashboard."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-text-dark"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-text-muted
              "
            />

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                outline-none
                placeholder:text-gray-400
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              "
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-text-dark"
            >
              Password
            </label>

            <button
              type="button"
              className="text-xs font-semibold text-primary-light hover:text-primary"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-text-muted
              "
            />

            <input
              id="password"
              type={showPassword ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-white
                py-3.5
                pl-11
                pr-12
                text-sm
                outline-none
                placeholder:text-gray-400
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-lg
                p-2
                text-text-muted
                hover:bg-primary-soft
                hover:text-primary
              "
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-primary
            px-4
            py-3.5
            text-sm
            font-semibold
            text-white
            cursor-pointer
            shadow-lg
            shadow-primary/15
            hover:bg-primary-light
            active:scale-[0.99]
          "
        >
          Sign in
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </form>

      {/* Register */}
      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="text-sm text-text-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary-light hover:text-primary"
          >
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
