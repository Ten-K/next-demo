"use client";
import { useState, useEffect } from "react";
import {
	Form,
	Table,
	Input,
	Button,
	Card,
	Modal,
	Space,
	message,
	Popconfirm
} from "antd";
import {
	SearchOutlined,
	PlusOutlined,
	EditOutlined,
	DeleteOutlined
} from "@ant-design/icons";

export default function UsersPage() {
	const [form] = Form.useForm();
	const [currentId, setCurrentId] = useState();
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalTitle, setModalTitle] = useState("新增");
	const [tableData, setTableData] = useState([]);
	const [total, setTotal] = useState(0);
	const [query, setQuery] = useState({
		page: 1,
		per: 10,
		username: ""
	});
	const [messageApi, contextHolder] = message.useMessage();
	const columns = [
		{
			title: "用户名",
			dataIndex: "username",
			key: "username"
		},
		{
			title: "手机号",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "部门",
			dataIndex: "department",
			key: "department"
		},
		{
			title: "创建时间",
			dataIndex: "createdAt",
			key: "createdAt"
		},
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<>
					<Button
						size="small"
						type="primary"
						icon={<EditOutlined />}
						onClick={() => {
							openUserModal("编辑");
							setCurrentId(record.id);
							// 填充表单数据
							form.setFieldsValue(record);
						}}
					>
						编辑
					</Button>
					<Popconfirm title="是否确认删除" onConfirm={deleteUser}>
						<Button
							size="small"
							className="ml-2"
							type="primary"
							danger
							icon={<DeleteOutlined />}
							onClick={() => {
								setCurrentId(record.id);
							}}
						>
							删除
						</Button>
					</Popconfirm>
				</>
			)
		}
	];

	useEffect(() => {
		async function fetchData() {
			const { data, total } = await await fetch(
				`/api/admin/users?page=${query.page}&per=${query.per}&username=${query.username}`
			)
				.then((res) => res.json())
				.catch((err) => {
					console.log(err);
				});
			setTotal(total);
			setTableData(data);
		}
		fetchData();
	}, [query]);

	const openUserModal = (title) => {
		setOpen(true);
		setModalTitle(title);
	};
	const handleOk = () => {
		form.submit();
	};
	const handleCancel = () => {
		setOpen(false);
	};

	async function addUser(values) {
		const data = await fetch("/api/admin/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(values)
		})
			.then((res) => res.json())
			.catch((err) => {
				console.log(err);
			});
		setConfirmLoading(false);
		if (!data) return;
		setOpen(false);
		messageApi.success(data.message);
		// 触发useEffect，重新请求表格数据
		setQuery({ ...query });
	}

	async function editUser(values) {
		const obj = {
			id: currentId,
			...values
		};
		const data = await fetch("/api/admin/users", {
			method: "PUT",
			body: JSON.stringify(obj)
		})
			.then((res) => res.json())
			.catch((err) => {
				console.log(err);
			});
		setConfirmLoading(false);
		if (!data) return;
		setOpen(false);
		messageApi.success(data.message);
		// 触发useEffect，重新请求表格数据
		setQuery({ ...query });
	}

	async function deleteUser() {
		const obj = {
			id: currentId
		};
		const data = await fetch("/api/admin/users", {
			method: "DELETE",
			body: JSON.stringify(obj)
		})
			.then((res) => res.json())
			.catch((err) => {
				console.log(err);
			});
		messageApi.success(data.message);
		// 触发useEffect，重新请求表格数据
		setQuery({ ...query });
	}

	const useActionMap = {
		新增: (values) => addUser(values),
		编辑: (values) => editUser(values)
	};

	/**
	 * 提交表单 - 用于新增用户和修改用户
	 * @param {object} values - 表单数据
	 * @returns
	 */
	const onFinish = async (values) => {
		setConfirmLoading(true);
		useActionMap[modalTitle](values);
	};

	return (
		<>
			{contextHolder}
			<Card
				title={"用户信息"}
				extra={
					<>
						<Button
							icon={<PlusOutlined />}
							type="primary"
							onClick={() => {
								openUserModal("新增");
								form.resetFields();
							}}
						>
							新增
						</Button>
					</>
				}
			>
				<Form
					layout="inline"
					onFinish={(v) => {
						setQuery({
							...query,
							username: v.username ?? ""
						});
					}}
				>
					<Form.Item name="username">
						<Input allowClear placeholder="请输入用户名" />
					</Form.Item>
					<Form.Item>
						<Button icon={<SearchOutlined />} type="primary" htmlType="submit">
							搜索
						</Button>
					</Form.Item>
				</Form>
				<Table
					className="mt-2"
					rowKey="id"
					dataSource={tableData}
					columns={columns}
					pagination={{
						total,
						onChange(page) {
							setQuery({
								...query,
								page
							});
						}
					}}
				/>

				{/* 用户弹窗 */}
				<Modal
					title={modalTitle}
					open={open}
					onOk={handleOk}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
				>
					<Form
						form={form}
						onFinish={onFinish}
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 14 }}
						layout="horizontal"
					>
						<Form.Item name="username" label="用户名">
							<Input placeholder="请输入用户名" />
						</Form.Item>
						<Form.Item name="phone" label="手机号">
							<Input placeholder="请输入手机号" />
						</Form.Item>
						<Form.Item name="department" label="部门">
							<Input placeholder="请输入部门" />
						</Form.Item>
					</Form>
				</Modal>
			</Card>
		</>
	);
}
