import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { getUserByEmail } from '../../../api/apiRequests';

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      async redirect(url, baseUrl) {
        return Promise.resolve(baseUrl);
      },

      async session(session) {
        console.log('test', session);
        const { id, role } = await getUserByEmail(session.user.email);
        session.user.id = id;
        session.user.role = role;
        return session;
      },
    },
  });
