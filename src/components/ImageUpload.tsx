import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<DropzoneProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
<<<<<<< HEAD
      "image/jpg": [],
=======
>>>>>>> main
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
<<<<<<< HEAD
          " p-2 text-white rounded-md text-center border-2 border-dotted border-neutral-700",
=======
          "w-full p-4 text-white rounded-md text-center border-2 border-dotted border-neutral-700",
>>>>>>> main
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
<<<<<<< HEAD
          <Image src={base64} height="60" width="75" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white ">{label}</p>
=======
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
>>>>>>> main
      )}
    </div>
  );
};

export default ImageUpload;
