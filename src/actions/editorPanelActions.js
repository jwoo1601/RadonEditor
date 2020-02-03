import { BEGIN_MOVE_EDITOR_PANEL, MOVE_EDITOR_PANEL, TOGGLE_EDITOR_PANEL_VISIBLE, SET_EDITOR_PANEL_MOVABLE, TOGGLE_EDITOR_PANEL_MOVABLE, CREATE_EDITOR_PANEL, DESTROY_EDITOR_PANEL, HIDE_EDITOR_PANEL, SHOW_EDITOR_PANEL, SET_EDITOR_PANEL_RESIZABLE, MINIMIZE_EDITOR_PANEL, RESTORE_EDITOR_PANEL } from '../const/actionTypes';

export const createEditorPanel = (wid, panelName, panelCreationOptions) => {
    return {
        type: CREATE_EDITOR_PANEL,
        payload: {
            wid: wid,
            name: panelName,
            options: panelCreationOptions
        }
    };
}

export const destroyEditorPanel = (wid, panelName) => {
    return {
        type: DESTROY_EDITOR_PANEL,
        payload: {
            wid: wid,
            name: panelName
        }
    };
}

export const hideEditorPanel = (wid, panelName) => {
    return {
        type: HIDE_EDITOR_PANEL,
        payload: {
            wid: wid,
            name: panelName
        }
    };
}

export const showEditorPanel = (wid, panelName) => {
    return {
        type: SHOW_EDITOR_PANEL,
        payload: {
            wid: wid,
            name: panelName
        }
    };
}

export const minimizeEditorPanel = (wid, panelName) => {
    return {
        type: MINIMIZE_EDITOR_PANEL,
        payload: {
            wid: wid,
            name: panelName
        }
    };
}

export const restoreEditorPanel = (wid, panelName) => {
    return {
        type: RESTORE_EDITOR_PANEL,
        payload: {
            wid: wid,
            name: panelName
        }
    };
}

export const beginMoveEditorPanel = (wid, panelName, event) => {
    return {
        type: BEGIN_MOVE_EDITOR_PANEL,
        payload: {
            wid: wid,
            name: panelName,
            event: event
        }
    };
}

export const moveEditorPanel = (wid, panelName, x, y) => {
    return {
        type: MOVE_EDITOR_PANEL,
        payload: {
            wid: wid,
            name: panelName,
            pos: { x: x, y: y }
        }
    };
}

export const toggleEditorPanelVisible = (wid, panelName) => {
    return {
        type: TOGGLE_EDITOR_PANEL_VISIBLE,
        payload: {
            wid: wid,
            name: panelName
        }
    };
}

export const setEditorPanelFocused = (wid, panelName, focused) => {
    return {
        type: SET_EDITOR_PANEL_FOCUSED,
        payload: {
            wid: wid,
            name: panelName,
            focused: focused
        }
    };
}

export const setEditorPanelMovable = (wid, panelName, movable) => {
    return {
        type: SET_EDITOR_PANEL_MOVABLE,
        payload: {
            wid: wid,
            name: panelName,
            movable: movable
        }
    };
}

export const toggleEditorPanelMovable = (wid, panelName) => {
    return {
        type: TOGGLE_EDITOR_PANEL_MOVABLE,
        payload: {
            wid: wid,
            name: panelName
        }
    };
}

export const setEditorPanelResizable = (wid, panelName, resizable) => {
    return {
        type: SET_EDITOR_PANEL_RESIZABLE,
        payload: {
            wid: wid,
            name: panelName,
            resizable: resizable
        }
    }
}