interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type = "text",
  onChange,
  label,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && (
        <p className="text-xl text-white font-semibold mb-2">{label}</p>
      )}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
            w-full
            bg-black 
            text-white
            p-4 
            text-lg 
            border-2
            border-neutral-800 
            focus:border-sky-500
            rounded-md
            transition
            outline-none
            focus:border-2
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
          "
      />
    </div>
  );
};

export default Input;
