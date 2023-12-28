import formatDate from "../utils/formatDate.ts";
import type {SessionDTO, SessionService} from '../adapters/interfaces/session-service.ts'

type SessionResponse = {
  session: SessionDTO | null,
  error: string | null 
}

type SessionsResponse = {
  sessions: SessionDTO[] | null,
  error: string | null 
}

export default class Session {
  constructor(private sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  async getNextSessions(): Promise<SessionsResponse> {
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
  
      const nextSession = (await this.sessionService.getSessions(filters));
      
      return {sessions: nextSession, error: null};
    } catch (error) {
      console.error(error)
      return {sessions: null, error: error.message};
    }
  }

  async getNextSession(): Promise<SessionResponse> {
    const {sessions, error} = await this.getNextSessions();
    if (error || !sessions) {
      return {session: null, error}
    }
    
    const nextSession = sessions[0]

    nextSession.summary = await this.sessionService.getNotionPageContentAsPlainText(nextSession.id)

    return {session: nextSession, error}
  }
}