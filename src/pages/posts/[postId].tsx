import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import usePost from "@/hooks/usePost";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, error, isLoading } = usePost(postId as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (error || !fetchedPost) {
    return (
      <div className="text-white text-center pt-20">
        We couldn&apos;t find that post. Please try again later.
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
