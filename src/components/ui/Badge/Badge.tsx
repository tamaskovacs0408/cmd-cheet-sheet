import { memo } from "react";
import "./badge.scss";

interface BadgeProps {
  text: string;
  variant?: "default" | "coming-soon";
}

export const Badge = memo(function Badge({
  text,
  variant = "default",
}: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{text}</span>;
});
