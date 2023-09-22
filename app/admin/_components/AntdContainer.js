import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";

export default function AntdContainer({ children }) {
	return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
}