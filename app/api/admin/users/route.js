import prisma from "@/app/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
	// 乘于1转成number类型
	const per = req.nextUrl.searchParams.get("per") * 1 ?? 10;
	const page = req.nextUrl.searchParams.get("page") * 1 ?? 1;
	const username = req.nextUrl.searchParams.get("username") ?? "";
	// 查询数据，根据创建时间倒叙排列
	const data = await prisma.users.findMany({
		where: {
			username: {
				contains: username
			}
		},
		orderBy: {
			createdAt: "desc"
		},
		skip: (page - 1) * per, // 跳过多少条数据
		take: per // 取多少条数据
	});

	const total = await prisma.users.count();

	return NextResponse.json({
		success: true,
		message: "获取数据成功",
		data,
		page,
		total
	});
};

export const POST = async (req) => {
	const data = await req.json();
	await prisma.users.create({ data });

	return NextResponse.json({
		success: true,
		message: "创建成功",
		data: {}
	});
};

export const PUT = async (req) => {
	const data = await req.json();
	await prisma.users.update({
		where: {
			id: data.id
		},
		data
	});

	return NextResponse.json({
		success: true,
		message: "修改数据成功"
	});
};

export const DELETE = async (req) => {
	const { id } = await req.json();
	await prisma.users.delete({
		where: {
			id
		}
	});

	return NextResponse.json({
		success: true,
		message: "删除数据成功"
	});
};
