import type {SessionDTO, SessionService, Options} from './interfaces/session-service.ts'

export interface QueryResult<T> {
  id: string;
  properties: T;
}

export interface GetPageResult {
  paragraph: {
    rich_text: {plain_text: string}[];
  }
}

export async function notionRequest(uri: string, payload?: Record<string, unknown>, method = 'GET') {
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
  const json = await rawResponse.json()
  if (!rawResponse.ok) {
    throw new Error(json ? json : 'Unknown error');
  }
  return json;
}

export async function queryNotionDatabase<T>(filters: Record<string, unknown>): Promise<QueryResult<T>[]> {
  const sessionsQuery = await notionRequest(`/databases/${Deno.env.get("NOTION_DATABASE_ID")}/query`, filters, 'POST')
  return sessionsQuery.results
}

export async function getNotionPage(pageId: string): Promise<GetPageResult[]> {
  const pageData = await notionRequest(`/blocks/${pageId}/children?page_size=100`)
  return pageData.results
}

interface NotionSessionProperties {
  Data: {
    date: {
      start: string;
    }
  };
  Lugar: {
    rich_text: {
      plain_text: string;
    }[];
  };
  Título: {
    title: {
      plain_text: string;
    }[];
  };
  GM: {
    people: {
      name: string;
    }[];
  };
  Descrição: {
    rich_text: {
      plain_text: string;
    }[];
  };
  Participantes: {
    people: {
      name: string;
    }[];
  };
}

const notionSessionProperties: Record<string, string> = {
  date :'Data',
  place:'Lugar',
  title:'Título',
  gm:'GM',
  description:'Descrição',
  attendees:'Participantes',
}

interface NotionOptionInterface {
  property: string;
}

interface NotionFilterDTO extends NotionOptionInterface {
  date?: {
    on_or_after: string;
  };
}

interface NotionSortDTO extends NotionOptionInterface {
  direction: string;
}

export class NotionSessionService implements SessionService{
  parseFilter(filter: NotionFilterDTO): NotionFilterDTO {
    return {
      ...filter,
      "property": notionSessionProperties[filter.property],
    }
  }
  parseFilters(filters: NotionFilterDTO[]): NotionFilterDTO[] {
    return filters.map((filter) => {
      return {
        ...filter,
        "property": notionSessionProperties[filter.property],
      }
    })
  }
  parseSorts(sorts: NotionSortDTO[]): NotionSortDTO[] {
    return sorts.map((sort: NotionSortDTO) => {
      return {
        ...sort,
        "property": notionSessionProperties[sort.property],
      }
    })
  }
  async getSessions(options: Options): Promise<SessionDTO[]> {

    const filters = {} as Record<string, NotionOptionInterface | NotionOptionInterface[]>

    if (options.filter) {
      filters['filter'] = this.parseFilter(options.filter as unknown as NotionFilterDTO)
    }

    if (options.sorts) {
      filters['sorts'] = this.parseSorts(options.sorts as unknown as NotionSortDTO[])
    }

    if (options.filters) {
      filters['filter'] = this.parseFilters(options.filters as unknown as NotionFilterDTO[])
    }
    
    const results = await queryNotionDatabase<NotionSessionProperties>(filters)
    return results.map((nextSession) => {
      return {
        id: nextSession.id,
        gm: nextSession.properties.GM.people[0].name,
        place: nextSession.properties.Lugar.rich_text[0].plain_text,
        title: nextSession.properties['Título'].title[0].plain_text,
        attendees: nextSession.properties['Participantes'].people.reduce((stack, person: any) => stack + person.name, ''),
        date: nextSession.properties.Data.date.start,
        description: nextSession.properties['Descrição'].rich_text[0].plain_text,
        summary: "",
      }
    })
  }

}
