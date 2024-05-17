import { getBlogs } from "./actions/getBlogs";
import BlogCard from "./components/BlogCard";
import Container from "./components/Container";

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <main className="my-36">
      <Container>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 sm:gap-4">
          {blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />;
          })}
        </ul>
      </Container>
    </main>
  );
}
