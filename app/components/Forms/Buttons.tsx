import type { JSX, ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons/lib";
import { getIcon } from "../IconComponent";
export const variants = {
  primary:
    "text-white bg-primary hover:bg-primary-hover focus:ring-primary-focus",
  blue: "text-white bg-blue hover:bg-blue-hover focus:ring-blue-focus",
  green: "text-white bg-green hover:bg-green-hover focus:ring-green-focus",
  red: "text-white bg-red hover:bg-red-hover focus:ring-red-focus",
  yellow:
    "text-zinc-800 bg-yellow hover:bg-yellow-hover focus:ring-yellow-focus",
  purple: "text-white bg-purple hover:bg-purple-hover focus:ring-purple-focus",
  orange: "text-white bg-orange hover:bg-orange-hover focus:ring-orange-focus",
  light:
    "text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 focus:ring-stone-100 dark:bg-stone-800 dark:text-white dark:border-stone-600 dark:hover:bg-stone-700 dark:hover:border-stone-600 dark:focus:ring-stone-700",
  dark: "text-white bg-stone-800 hover:bg-stone-800 focus:ring-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 dark:focus:ring-stone-700 dark:border-stone-700",
  pink: "text-white bg-pink hover:bg-pink-hover focus:ring-pink-focus",
  outlinePrimary:
    "text-primary hover:text-white border border-primary hover:bg-primary-hover focus:ring-primary-focus",
  outlineBlue:
    "text-blue hover:text-white border border-blue hover:bg-blue-hover focus:ring-blue-focus",
  outlineGreen:
    "text-green hover:text-white border border-green hover:bg-green-hover focus:ring-green-focus",
  outlineRed:
    "text-red hover:text-white border border-red hover:bg-red-hover focus:ring-red-focus",
  outlineYellow:
    "text-zinc-800 hover:text-white border border-yellow hover:bg-yellow-hover focus:ring-yellow-focus",
  outlinePurple:
    "text-purple hover:text-white border border-purple hover:bg-purple-hover focus:ring-purple-focus",
  outlineDark:
    "text-stone-800 hover:text-white border border-stone-800 hover:bg-stone-800 focus:ring-stone-300 dark:border-stone-600 dark:text-stone-400 dark:hover:text-white dark:hover:bg-stone-600 dark:focus:ring-gray-800",
};
const basesClass =
  "w-full cursor-pointer font-medium focus:outline-none focus:ring-4 text-center rounded-lg disabled:cursor-not-allowed disabled:opacity-50 transition-all";
const sizes = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
};
const sizesWithIcon = {
  sm: "p-2 text-xs",
  md: "p-2.5 text-sm",
};

type ButtonProps = {
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};
type ButtonNativeProps = ButtonHTMLAttributes<HTMLButtonElement>;
type Props = ButtonProps &
  ButtonNativeProps & { icon?: { component: IconType; color: string } };
export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  icon,
  ...buttonProps
}: Props): JSX.Element => {
  const Icon = icon
    ? getIcon({
        icon: icon.component,
        color: icon.color,
        size: size === "sm" ? 4 : 5,
      })
    : null;
  return (
    <button
      className={`${basesClass} ${sizes[size]} ${variants[variant]} ${className}`}
      {...buttonProps}
    >
      <span className="flex gap-2 items-center justify-center">
        {Icon && <span>{Icon}</span>}
        {children}
      </span>
    </button>
  );
};
export const ButtonOnlyIcon = ({
  variant = "primary",
  size = "md",
  className,
  icon,
  ...buttonProps
}: Props): JSX.Element => {
  const Icon = icon
    ? getIcon({
        icon: icon.component,
        color: icon.color,
        size: size === "sm" ? 4 : 5,
      })
    : null;
  return (
    <button
      className={`${basesClass} ${variants[variant]} ${className} ${sizesWithIcon[size]} flex items-center justify-center`}
      {...buttonProps}
    >
      {Icon}
    </button>
  );
};
