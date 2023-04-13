import type { Post } from '../interfaces/post';

export async function getPosts(){
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

  return posts;
};
