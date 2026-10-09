import { useState } from "react";
import {
  Building2,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/authLayout";

function Register() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyname:"",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Register Data:", formData);

    // Backend API will be connected here later.

    // Temporary navigation
    // navigate("/login");
  };

  return (
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
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
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
              onClick={() =>
                setShowConfirmPassword((previous) => !previous)
              }
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
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

         {/* Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="mb-2 block text-sm font-semibold text-text-dark"
          >
            company name
          </label>

          <div className="relative">
            <Building2
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
              id="companyName"
              type="text"
              name="companyName"
              value={formData.companyname}
              onChange={handleChange}
              placeholder="Enter your company name"
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
            shadow-lg
            shadow-primary/15
            hover:bg-primary-light
            active:scale-[0.99]
          "
        >
          Create account

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
  );
}

export default Register;