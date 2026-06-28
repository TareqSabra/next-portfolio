"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CircleCheck } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  teus: number;
  totalUSD: number;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose, teus, totalUSD }) => {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.215, 0.610, 0.355, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "var(--glass-blur)",
              border: "1px solid var(--border-muted)",
              borderRadius: "var(--radius-lg)",
              padding: "48px 40px 40px",
              maxWidth: "400px",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              textAlign: "center",
            }}
          >
            {/* Animated checkmark circle */}
            <div style={{ position: "relative", width: "72px", height: "72px" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: [0.215, 0.610, 0.355, 1] }}
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "rgba(226, 155, 159, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3, ease: [0.215, 0.610, 0.355, 1] }}
                >
                  <CircleCheck size={40} style={{ color: "var(--accent-pink-primary)" }} />
                </motion.div>
              </motion.div>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}
              >
                Invoice issued
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Freight invoice for <strong style={{ color: "var(--text-primary)" }}>{teus} TEUs</strong> at{" "}
                <strong style={{ color: "var(--accent-pink-primary)" }}>
                  ${totalUSD.toLocaleString()} USD
                </strong>
                {" "}has been submitted to the clearing house.
              </p>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ borderColor: "var(--accent-neon-blue)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-muted)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 32px",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                transition: "var(--transition-smooth)",
                width: "100%",
              }}
            >
              Done
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
