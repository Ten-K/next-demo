import { Card } from "antd";

export default function PageContainer({ children, title }) {
	return <Card title={title}>{children}</Card>;
}
