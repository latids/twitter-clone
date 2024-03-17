import { Montserrat } from "next/font/google";
import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import Form from "@/components/Form";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={montserrat.className}>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </main>
  );
}
