"use client";
import { useState } from "react";
export function CookieBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return <div className="cookie-banner" role="dialog" aria-label="Cookie notice"><p>We use essential cookies to personalize your journey through the Zylra Silk Route collections.</p><button className="button button-small" onClick={() => setVisible(false)}>Accept Experience</button></div>;
}
