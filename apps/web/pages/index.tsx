import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { Button } from "ui";

const USER_KEY = "USER_KEY";

const fetchUser = async (baseUrl: string): Promise<{ name: string }> => {
  const res = await fetch(`${baseUrl}/api/user`);

  return await res.json();
};

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient();
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  await queryClient.prefetchQuery([USER_KEY], () => fetchUser(baseUrl));

  return {
    props: {
      baseUrl,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
