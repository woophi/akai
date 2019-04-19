import { store } from "core/store";


export const askCount = () => store.dispatch({ type: 'ADD' });
export const askTick = () => store.dispatch({ type: 'TICK', payload: store.getState().ui.lastUpdate + 1 });
