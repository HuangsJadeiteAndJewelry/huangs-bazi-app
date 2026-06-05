import logo from "../assets/hjj-logo-black.png";
import { useState } from "react";

export default function LeadPopup({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) return;

    console.log("Collected email:", email);
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-[#FFF8EE] p-6 shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="text-center">

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Upgrade Your Feng Shui
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Enter your email to receive a special 30% off code for a purchase from huangsjadeiteandjewelry.com
              </p>
            </div>

            <div className="my-6 rounded-2xl bg-white p-5 text-center shadow-sm">
  <div className="mx-auto flex items-center justify-center">
    <img
      src={logo}
      alt="Huangs Logo"
      className="h-44 w-auto object-contain"
    />
  </div>

  <p className="mt-4 text-sm font-semibold text-slate-800">
    Your 30% off code is waiting...
  </p>
</div>

<form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#C89B5E]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#C89B5E] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#B5894F]"
              >
                Unlock My Code
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              No spam. Just Bazi insights, offers, and Huangs Jadeite and Jewelry updates.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center">
  ✨
</div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              You’re in!
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use this code for your consultation:
            </p>

            <div className="mt-5 rounded-2xl border border-dashed border-[#C89B5E] bg-white px-4 py-4 text-xl font-bold tracking-widest text-[#A67C52]">
              HUANGS10
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}