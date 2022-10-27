"use client";

if (process.env.NODE_ENV === "production") {
  navigator.serviceWorker.register("/sw.js");
}

export {};
