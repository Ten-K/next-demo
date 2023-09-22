"use client";
import { useRouter } from "next/navigation";
import { Card, Form, Button, Input } from "antd";

function Login() {
	const nav = useRouter();

	async function submit(v) {
		await fetch("/api/admin/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(v)
		}).then((res) => res.json());
		nav.push("/admin/dashboard");
	}

	return (
		<div className="pt-20">
			<Card title="欢迎登录" className="w-4/5 mx-auto mt-20">
				<Form
					labelCol={{ span: 3 }}
					onFinish={(v) => submit(v)}
					initialValues={{ usename: "admin", password: "admin" }}
				>
					<Form.Item name="usename" label="用户名">
						<Input placeholder="请输入用户名" />
					</Form.Item>
					<Form.Item name="password" label="密码">
						<Input.Password placeholder="请输入密码" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="w-full">
							登录
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

export default Login;
