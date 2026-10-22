import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/authLayout";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setSuccessMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    { successMessage && (
      <div className="fixed right-10 top-5 z-50 flex items-center gap-3 rounded-lg border border-green-400 bg-white px-4 py-4 shadow-lg ">
      <div className="flex h-8 w-8 items-center justify-center font-bold rounded-full bg-green-100 text-green-700 text-lg">
       ✓
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">Registration Successful</p>
        <p className="text-xs text-gray-500">Redirecting to login...</p>
      </div>
      </div>
    )}
    <AuthLayout
      title="Create your account"
      subtitle="Set up your account and start managing your business finances."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-semibold text-text-dark"
          >
            Full name
          </label>

          <div className="relative">
            <User
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
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
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
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-text-dark"
          >
            Password
          </label>

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
              placeholder="Create a password"
              autoComplete="new-password"
              required
              minLength={6}
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
              aria-label={showPassword ? "hide password" : "show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-text-dark"
          >
            Confirm password
          </label>

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
              id="confirmPassword"
              type={showConfirmPassword ? "password" : "text"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
              minLength={6}
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
              onClick={() => setShowConfirmPassword((previous) => !previous)}
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
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div>
            
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* {successMessage && (
          <p className="text-sm text-green-600">{successMessage}</p>
        )} */}

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-border accent-[#2a0a38]"
          />

          <label htmlFor="terms" className="text-xs leading-5 text-text-muted">
            I agree to the terms and conditions and privacy policy.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
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
          {loading ? "Creating account..." : "Create account"}
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </form>

      {/* Login */}
      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary-light hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
    </>
  );
}

export default Register;
