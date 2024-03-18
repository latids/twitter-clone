import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BiX } from "react-icons/bi";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import Avatar from "./Avatar";
import Button from "./Button";
import Image from "next/image";
import ImageUpload from "./ImageUpload";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);
  const [body, setBody] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [body]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const postData = {
        body,
        image,
      };

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, postData);

      toast.success("Tweet created");
      setBody("");
      setImage(null);
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, image, mutatePosts, isComment, postId, mutatePost]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text.length <= 5000) {
      setBody(text);
    }
  };

  const handleImageChange = useCallback((base64: string) => {
    setImage(base64);
  }, []);

  const removeImage = () => {
    setImage(null);
  };

  const ImagePreview = () => {
    return (
      <div className="w-3/4 text-center mt-3 mx-auto relative">
        <Image
          src={image!}
          alt="Preview"
          className="rounded-md"
          width={400}
          height={300}
        />
        <button
          className="absolute top-2 right-2 text-neutral-500"
          onClick={removeImage}
        >
          <BiX className="bg-white rounded-full" />
        </button>
      </div>
    );
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <div className="flex justify-center">
              {image && <ImagePreview />}
            </div>
            <textarea
              ref={textAreaRef}
              disabled={isLoading}
              onChange={handleTextChange}
              value={body}
              maxLength={5000}
              className="
              bg-black 
              text-white
              w-full 
              disabled:opacity-80
              resize-none 
              mt-3 
              peer
              ring-0 
              outline-none 
              text-[20px] 
              placeholder-neutral-500 
              "
              placeholder={placeholder}
            ></textarea>
            <div className="flex items-center justify-between mt-2">
              <span className="text-neutral-500 text-sm">
                {body.length}/5000
              </span>
              <div className="flex items-center  ">
                <ImageUpload
                  onChange={handleImageChange}
                  label="Add Image"
                  disabled={isLoading}
                />
              </div>
            </div>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || (!body && !image)}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-center text-2xl mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
