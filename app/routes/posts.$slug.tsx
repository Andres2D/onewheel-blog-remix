import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import invariant from "tiny-invariant";
import { marked } from 'marked';
import { getPost } from "~/models/post.server";

type LoaderData = {
  title: string;
  html: string;
}

export const loader: LoaderFunction = async ({params}) => {
  const { slug } = params;
  invariant(slug, 'Slug is required');
  const post = await getPost(slug);

  invariant(post, `Post not found: ${slug}`);
  const html = marked(post?.markdown);
  return json<LoaderData>({title: post.title, html});
};

const PostRoute = () => {
  const {title, html} = useLoaderData() as LoaderData;
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </main>
  )
};

export default PostRoute;
