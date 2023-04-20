import { Outlet, useRouteError } from "@remix-run/react";

export default function PostsRoute() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error: any = useRouteError();
  return (
    <div className='text-red-500'>
      Oh no, something went wrong!
      <pre>{error.message}</pre>
    </div>
  )
};
