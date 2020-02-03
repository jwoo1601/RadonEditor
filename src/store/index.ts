import { createStore } from 'redux';
import rootReducer from '../reducers/index';

const store = createStore(rootReducer);
store.subscribe(() => {
    console.log(`State changed: ${store.getState()}`);
});

export default store;