import formatDate from "../utils/formatDate.ts";
import {getNotionPage} from "../adapters/notion.ts";
import type {SessionDTO, SessionService} from '../adapters/interfaces/session-service.ts'

type SessionResponse = {
  session: SessionDTO | null,
  error: string | null 
}

export default class Session {
  constructor(private sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  async getNextSession(): Promise<SessionResponse> {
    try {
      //TODO: melhorar como passamos esses filtros pro Notion
      const filters = {
        "filter": {
          "property": "date",
          "date": {
            "on_or_after": formatDate()
          }
        },
        "sorts": [
          {
            "property": "date",
            "direction": "ascending"
          }
        ]
      }
  
      const nextSession = (await this.sessionService.getSessions(filters))[0];
      
      const pageId = nextSession.id;
  
      nextSession.summary = await this.sessionService.getNotionPageContentAsPlainText(pageId);
      
      return {session: nextSession, error: null};
    } catch (error) {
      console.error(error)
      return {session: null, error: error.message};
    }
    
  }
}