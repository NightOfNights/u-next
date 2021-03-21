import MainLayout from '../layouts/mainLayout';
import { useSession, getSession } from 'next-auth/client';

export default function Home() {
  const [session] = useSession();
  console.log(session);
  return (
    <MainLayout>
      <div>Home page</div>
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

    if (session) {  
    return { props: {  } };
  } else {
    return { redirect: { permanent: false, destination: '/api/auth/signin' } };
  }
};