export const onRequest = async ({ env }) => {
	const value = await fetch(env.TURSO_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.TURSO_AUTH_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			requests: [
				{ type: "execute", stmt: { sql: "select count from request_count where id = 1" } },
				{ type: "close" },
			],
		}),
	})
		.then((res) => res.json())
		.then((res) => res.results[0].response.result.rows[0][0].value)
		.catch((err) => console.log(err));
	return new Response(value, { status: 200 });
}
