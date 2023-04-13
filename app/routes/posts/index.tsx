import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { Post } from '../../interfaces/post';

export const loader = async () => {
  const posts: Post[] = [
    {
      slug: 'how-to-became-frontend-developer',
      title: 'How to became a frontend developer'
    },
    {
      slug: 'create-your-first-portfolio-page',
      title: 'Create your first portfolio page'
    },
  ];
  
  return json({posts})
};

const PostsRoutes = () => {

  const { posts } = useLoaderData();

  return ( 
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: Post) => (
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
