import React, { useEffect, useState } from "react";
import { LogIn, Mail, KeyRound, Sparkles, BellRing, X } from "lucide-react";
import { DEMO_CREDENTIALS } from "../data/mockUsers";

export default function LoginPage({ onLogin, onGoRegister, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const message = sessionStorage.getItem("login_notice");
    if (message) {
      setToastMessage(message);

      const timer = setTimeout(() => {
        setToastMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10">
      {toastMessage && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 flex items-start gap-3">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0">
            <BellRing className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
              Action Required
            </p>
            <p className="text-sm text-emerald-900 mt-1">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage("")}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <section className="rounded-[36px] border border-slate-200 bg-white p-7 lg:p-10 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-700 mb-3">
            Welcome Back
          </p>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Login to Uthsawa
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Access your dashboard and continue your marketplace journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Email
              </span>
              <span className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Password
              </span>
              <span className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <KeyRound className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
                />
              </span>
            </label>

            {error && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-2 rounded-2xl bg-emerald-900 text-amber-300 py-3.5 text-xs uppercase tracking-wider font-extrabold inline-flex items-center justify-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Login Now
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-6">
            New to Uthsawa?{" "}
            <button
              onClick={onGoRegister}
              className="text-emerald-700 font-bold"
            >
              Register here
            </button>
          </p>
        </section>

        <aside className="rounded-[36px] border border-emerald-100 bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-900 p-7 lg:p-10 shadow-xl text-white">
          <h2 className="text-xl font-black mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-300" />
            Quick Login / Demo Credentials
          </h2>
          <p className="text-sm text-emerald-50/90 mb-6">
            Use any credential below for instant role-based testing.
          </p>

          <div className="space-y-3">
            {DEMO_CREDENTIALS.map((entry) => (
              <div
                key={entry.email}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  {entry.role}
                </p>
                <p className="text-sm font-semibold mt-1">{entry.email}</p>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Password: {entry.password}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
