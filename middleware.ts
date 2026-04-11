import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {},
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/admin/login")) {
          return true;
        }

        return !!token;
      }
    },
    pages: {
      signIn: "/admin/login"
    }
  }
);

export const config = {
  matcher: ["/admin/:path*"]
};

