export type AppState = {
  ui: {
    lastUpdate: number;
    light: boolean;
    count: number;
    token: string
  }
};

export type AppDispatch =
| { type: 'ADD' }
| { type: 'TICK'; payload: number }
| { type: 'SET_TOKEN'; payload: string }
;
