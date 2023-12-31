"use client";

import {
	UserOutlined,
	MenuFoldOutlined,
	DashboardOutlined,
	MenuUnfoldOutlined
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;

export default function AntAdmin({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer }
	} = theme.useToken();
	const nav = useRouter();

	return (
		<Layout style={{ height: "100vh" }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["/admin/dashboard"]}
					defaultOpenKeys={["/admin/dashboard"]}
					onClick={({ key }) => {
						nav.push(key);
					}}
					items={[
						{
							key: "/admin/dashboard",
							icon: <DashboardOutlined />,
							label: "看板"
						},
						{
							key: "/admin/users",
							icon: <UserOutlined />,
							label: "用户信息"
						}
					]}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer
					}}
				>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64
						}}
					/>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}
