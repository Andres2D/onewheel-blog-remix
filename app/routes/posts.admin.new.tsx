import { Form, useActionData } from "@remix-run/react";
import { type ActionFunction, redirect, json } from "@remix-run/node";
import { createPost } from "~/models/post.server";
import invariant from 'tiny-invariant';
const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

type ActionData = {
  title: null | string,
  slug: null | string,
  markdown: null | string
} | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData(); 
  const title = formData.get('title');
  const slug = formData.get('slug');
  const markdown = formData.get('markdown');

  const errors: ActionData = {
    title: title ? null : 'Title is required',
    slug: slug ? null : 'Slug  is required',
    markdown: markdown ? null : 'Markdown is required',
  }
  const hasErrors = Object.values(errors).some(errorMessage => errorMessage);

  if(hasErrors) {
    return json<ActionData>(errors)
  }

  invariant(typeof title === 'string', 'Title must be a string');
  invariant(typeof slug === 'string', 'Slug must be a string');
  invariant(typeof markdown === 'string', 'Markdown must be a string');

  await createPost({title, slug, markdown});

  return redirect("/posts/admin");
};

export default function AdminIndexRoute() {
  const errors = useActionData() as ActionData;
  return (
    <Form method="post">
      <p>
        <label>
          Post Title: { errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input type="text" name="title" className={inputClassName} />
        </label>
      </p>
      <p>
        <label>
          Post Slug: { errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input type="text" name="slug" className={inputClassName} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: { errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}</label>
        <textarea
          id="markdown"
          name="markdown"  
          rows={20} 
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
};
