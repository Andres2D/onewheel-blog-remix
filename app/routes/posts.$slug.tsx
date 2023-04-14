const PostRoute = () => {
  const post = { title: 'foo' };
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
    </main>
  )
};

export default PostRoute;
