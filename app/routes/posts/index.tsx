import { Link, useLoaderData } from '@remix-run/react';
import { json, type LoaderFunction } from '@remix-run/node';
import { getPostingListing } from '../../models/post.server';

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostingListing>>
}

export const loader: LoaderFunction = async () => {
  const posts = await getPostingListing();
  return json<LoaderData>({posts})
};

const PostsRoutes = () => {

  const { posts } = useLoaderData() as LoaderData;

  return ( 
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PostsRoutes;
