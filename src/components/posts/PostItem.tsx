import { useState, useCallback, useMemo } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineDelete,
} from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import Avatar from "../Avatar";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id });

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const handleDelete = useCallback(
    async (ev: any) => {
      ev.stopPropagation();
      try {
        const response = await axios.delete(`/api/posts/${data.id}`);
        console.log(response.data);
        router.push("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    [data.id, router]
  );

  const confirmDeletePost = useCallback(() => {
    setConfirmDelete(true);
  }, []);

  const cancelDeletePost = useCallback(() => {
    setConfirmDelete(false);
  }, []);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const DeleteCheckBtn = () => {
    return (
      <div className="absolute z-50 text-white rounded-md pb-2 bg-neutral-700 transition-all duration-300 opacity-100">
        <button
          className="bg-red-500 mt-1 rounded-md text-white  px-2 ml-1 py-1 mr-1"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-green-500 rounded-md text-white mt-1 ml-1 mr-1 px-2 py-1"
          onClick={cancelDeletePost}
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
            {data.userId === currentUser?.id && (
              <div className="relative">
                {confirmDelete ? <DeleteCheckBtn /> : null}

                <AiOutlineDelete
                  className="text-white cursor-pointer"
                  size={20}
                  onClick={confirmDeletePost}
                />
              </div>
            )}
          </div>
          <div className="text-white mt-1">{data.body}</div>
          {data.image && (
            <div className="mt-3">
              <Image
                src={data.image}
                alt="Post Image"
                width={450}
                height={300}
                className="object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            "
            >
              <LikeIcon color={hasLiked ? "red" : ""} size={20} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
