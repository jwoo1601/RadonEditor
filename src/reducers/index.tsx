import $prefs from '../resources/userPreferences.json';
import { SET_VISIBILITY, SET_FOCUSED } from '../const/actionTypes.js';

import { RadonWindowManager } from '../components/RadonWindow.js';
import { State, EditorWindowState, Action } from '../types/states';

/* const initialState = {
    visible: true,
    focused: true,
    movable: true,
    resizable: {
        left: true,
        right: true,
        top: true,
        bottom: true
    },
    width: $prefs.default["editor-panel-width"],
    height: $prefs.default["editor-panel-height"],
    fontSize: $prefs.default["editor-panel-font-size"],
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0
}; */

const initialState: State = {
    theme: {
        colors: { },
        defaults: { }
    },

    windowManager: new RadonWindowManager(),
    editorWindows: new Array<EditorWindowState>(),
    dummies: {
        dragImage: document.createElement("img")
    }
};

function rootReducer(state = initialState, action: Action)
{
    switch (action.type)
    {
        case SET_VISIBILITY:
            return {...state, ...action.payload };

        case SET_FOCUSED:
            return {...state, ...action.payload };
            break;

        default:
            return state;
    }
}

export default rootReducer;