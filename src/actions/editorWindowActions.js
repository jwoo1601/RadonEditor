import { CREATE_EDITOR_WINDOW, DESTROY_EDITOR_WINDOW, BIND_EDITOR_WINDOW, CLOSE_EDITOR_WINDOW, SET_EDITOR_WINDOW_VISIBLE } from "../const/actionTypes";

export const createEditorWindow = (id, editorWindowCreationOptions) => {
    return {
        type: CREATE_EDITOR_WINDOW,
        payload: {
            wid: id,
            options: editorWindowCreationOptions
        }
    };
}

export const destroyEditorWindow = (id) => {
    return {
        type: DESTROY_EDITOR_WINDOW,
        payload: {
            wid: id
        }
    };
}

export const bindEditorWindow = (id, uuid) => {
    return {
        type: BIND_EDITOR_WINDOW,
        payload: {
            wid: id,
            uuid: uuid
        }
    };
}

export const closeEditorWindow = (uuid) => {
    return {
        type: CLOSE_EDITOR_WINDOW,
        payload: {
            uuid: uuid
        }
    };
}

export const setEditorWindowVisible = (id, visible) => {
    return {
        type: SET_EDITOR_WINDOW_VISIBLE,
        payload: {
            wid: id,
            visible: visible
        }
    };
}