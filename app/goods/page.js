import React from "react";

async function Goods() {
  // https://github.com/verc  localhost服务在服务端组件中需要绝对路径el/next.js/issues/44062
	const { data } = await fetch(process.env.URL + "/api/goods").then((res) =>
		res.json()
	);
	return (
		<ul>
			{data.map((item) => {
				return <li key={item.id}>{item.name}</li>;
			})}
		</ul>
	);
}

export default Goods;
