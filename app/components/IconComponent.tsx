import type { IconType } from "react-icons/lib";
export const getIcon = ({
  icon,
  size,
  color,
}: {
  icon: IconType;
  size?: number;
  color?: string;
}) => {
  const IconComponent: IconType = icon;
  return (
    <IconComponent
      className={`w-${size || 6} h-${size || 6} ${color ? color : ""}`}
    />
  );
};