"use client";

import * as React from 'react';
import { motion } from 'motion/react';

export interface CardProps {
  title: string;
  description: string;
  href?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, href, children }) => {
  const CardWrapper = href ? motion.a : motion.div;
  
  return (
    // @ts-ignore
    <CardWrapper
      href={href}
      className="portfolio-card"
      style={{ textDecoration: 'none', display: 'block' }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h3 className="portfolio-card-title">{title}</h3>
      <p className="portfolio-card-desc">{description}</p>
      {children}
    </CardWrapper>
  );
};
