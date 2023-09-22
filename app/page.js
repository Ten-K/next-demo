"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const nav = useRouter();
	useEffect(() => {
		nav.push("/admin/login");
	});
	return <></>;
}
