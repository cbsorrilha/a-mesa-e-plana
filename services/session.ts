import formatDate from "../utils/formatDate.ts";
import notionRequest from "../utils/notionRequest.ts";

interface Session {
  place: string;
  date: string;
  title: string;
  gm: string;
  description: string;
  summary: string;
  attendees: string;
}

export async function getNextSession(): Promise<Session>{
  const filters = {
    "filter": {
      "property": "Data",
      "date": {
        "on_or_after": formatDate()
      }
    },
    "sorts": [
      {
        "property": "Data",
        "direction": "descending"
      }
    ]
  }
  const sessionsQuery = await notionRequest(`/databases/${Deno.env.get("NOTION_DATABASE_ID")}/query`, filters, 'POST')
  const nextSession = sessionsQuery.results[0];
  const pageId = nextSession.id;

  const pageData = await notionRequest(`/blocks/${pageId}/children?page_size=100`)

  const pageContent = pageData.results.reduce((stack: string, block: any) => {
    return stack + block.paragraph.rich_text[0].plain_text
  }, '')

  return {
    gm: nextSession.properties.GM.people[0].name,
    place: nextSession.properties.Lugar.rich_text[0].plain_text,
    title: nextSession.properties['Título'].title[0].plain_text,
    attendees: nextSession.properties['Participantes'].people.map((person: any) => person.name),
    date: nextSession.properties.Data.date.start,
    description: nextSession.properties['Descrição'].rich_text[0].plain_text,
    summary: pageContent,
  }
}