interface ButtonProps {
  onClick: () => void;
  label: string;
  large?: boolean;
  secondary?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  large,
  secondary,
  fullWidth,
  disabled,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          disabled:opacity-70
          rounded-full
          disabled:cursor-not-allowed
          font-semibold
          hover:opacity-80
          transition
          border-2
          ${fullWidth ? "w-full" : "w-fit"}
          ${secondary ? "bg-white" : "bg-sky-500"}
          ${secondary ? "text-black" : "text-white"}
          ${secondary ? "border-black" : "border-sky-500"}
          ${large ? "text-xl" : "text-md"}
          ${large ? "px-5" : "px-4"}
          ${large ? "py-3" : "py-2"}
          ${outline ? "bg-transparent" : ""}
          ${outline ? "border-white" : ""}
          ${outline ? "text-white" : ""}
        `}
    >
      {label}
    </button>
  );
};

export default Button;
