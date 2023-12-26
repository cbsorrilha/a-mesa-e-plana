export default async function notionRequest(uri: string, payload?: Record<string, unknown>, method = 'GET') {
  const rawResponse = await fetch(`https://api.notion.com/v1${uri}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get("NOTION_API_KEY")}`,
      'Notion-Version': '2022-06-28' //string marretada
    },
    body: JSON.stringify(payload)
  });
  return await rawResponse.json();
}