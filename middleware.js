import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
	// 访问的是否为管理后台
	if (!request.nextUrl.pathname.startsWith("/admin")) return;
	// 是登录页
	if (request.nextUrl.pathname.startsWith("/admin/login")) return;
	// 判断是否有token
	if (request.cookies.get("admin-token")) return;
	// 没有token，跳转到登录页
	return NextResponse.redirect(new URL("/admin/login", request.url));
}
