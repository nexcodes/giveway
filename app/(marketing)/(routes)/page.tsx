import { Spinner } from "@/components/misc/spinner";
import Hero from "../_components/hero";
import Participate from "../_components/how-to-participate";
import BlogHome from "../_components/blog-home";
import { getThreePublishedPost } from "@/actions/supabase-actions";



export default async function Home() {

  const posts = await getThreePublishedPost();

    if (posts === undefined) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      );
    }

  return (
    <>
      <Hero />
      <Participate />
      <BlogHome posts={posts} />
    </>
  );
}
