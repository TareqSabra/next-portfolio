"use client";

import * as React from "react";
import { Button, ScrollIndicator } from "@portfolio/ui";
import { motion, AnimatePresence } from "motion/react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const canSubmit = name.trim() && email.trim() && message.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section
      id="contact"
      className="snap-section"
      style={{}}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          color: "var(--text-primary)",
          fontWeight: 700,
          letterSpacing: "-0.5px",
        }}
      >
        Let&apos;s Connect
      </h2>
      <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
        Have a project in mind or want to collaborate? Send a message directly.
      </p>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        animate={status === "success" ? { opacity: 0.5 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          className="contact-input"
          type="text"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
        />
        <input
          className="contact-input"
          type="email"
          placeholder="Your Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <textarea
          className="contact-input"
          style={{ minHeight: "120px", resize: "none" }}
          placeholder="Your Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "8px",
          }}
        >
          <Button
            variant="primary"
            style={{
              width: "fit-content",
              background: "linear-gradient(135deg, var(--accent-pink-primary), var(--accent-pink-secondary))",
              boxShadow: "var(--shadow-glow-pink)",
            }}
            disabled={!canSubmit || status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>

          <AnimatePresence>
            {status === "success" && (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                style={{
                  fontSize: "0.85rem",
                  color: "var(--accent-pink-primary)",
                }}
              >
                Message sent successfully!
              </motion.span>
            )}
            {status === "error" && (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: "0.85rem",
                  color: "var(--accent-pink-primary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {errorMsg}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.form>

      <ScrollIndicator href="#architecture" label="How it's built" />
    </section>
  );
}
