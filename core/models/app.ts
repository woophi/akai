export type AppState = {
  ui: {
    lastUpdate: number;
    light: boolean;
    count: number;
  }
};

export type AppDispatch =
| { type: 'ADD' }
| { type: 'TICK'; payload: number }
;
