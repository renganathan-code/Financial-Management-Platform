import {
  ArrowUpRight,
  BarChart3,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-wrapper flex items-center justify-center">
      <div
        className="
          auth-container
          flex
          w-full
          max-w-6xl
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-white
          shadow-[0_20px_60px_rgba(42,10,56,0.10)]
        "
      >
        {/* Left Side */}
        <section
          className="
            auth-brand-section
            relative
            flex
            w-1/2
            flex-col
            justify-between
            overflow-hidden
            bg-primary
            p-10
            text-white
          "
        >
          {/* Background decorations */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />

          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-accent/10" />

          <div className="relative z-10">
            {/* Logo */}
            <div className="mb-16 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                <WalletCards size={23} strokeWidth={2.2} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">Business 360</h1>
                <p className="text-xs text-white/60">Financial Management</p>
              </div>
            </div>

            {/* Heading */}
            <div className="max-w-md">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/60">
                Manage smarter
              </p>

              <h2 className="text-4xl font-bold leading-tight tracking-tight">
                Take control of your business finances.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
                Manage income, expenses, invoices, inventory and financial
                operations from one simple platform.
              </p>
            </div>

            {/* Feature cards */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <BarChart3 size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Clear financial insights
                  </p>

                  <p className="mt-1 text-xs text-white/55">
                    Track your business performance easily.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Secure financial data</p>

                  <p className="mt-1 text-xs text-white/55">
                    Keep your business information protected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-10 flex items-center justify-between text-xs text-white/45">
            <span>© 2026 Business 360</span>

            <div className="flex items-center gap-1">
              Simple. Secure. Smart.
              <ArrowUpRight size={13} />
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section
          className="
            auth-form-section
            flex
            w-1/2
            items-center
            justify-center
            bg-white
            px-12
            py-10
          "
        >
          <div className="auth-card w-full max-w-md">
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-primary-light">
                Welcome to Business 360
              </p>

              <h2 className="auth-title text-3xl font-bold tracking-tight text-text-dark">
                {title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                {subtitle}
              </p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
