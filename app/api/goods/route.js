import prisma from "@/app/db";
import { NextResponse } from "next/server";

export const GET = async () => {
	// 查询数据，根据创建时间倒叙排列
	const data = await prisma.goods.findMany({
		orderBy: {
			createdAt: "desc"
		}
	});

	return NextResponse.json({
		success: true,
		message: "获取数据成功",
		data
	});
};

export const POST = async (req) => {
	const data = await req.json();
	await prisma.goods.create({data})

	return NextResponse.json({
		success: true,
		message: "创建成功",
		data:{}
	});
};
