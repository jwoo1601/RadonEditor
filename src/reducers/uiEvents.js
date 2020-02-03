import { EDITOR_PANEL_FRAME_MOVE_START, EDITOR_PANEL_FRAME_ON_MOVE, CREATE_EDITOR_PANEL, SHOW_EDITOR_PANEL, MINIMIZE_EDITOR_PANEL, RESTORE_EDITOR_PANEL, TOGGLE_EDITOR_PANEL_VISIBLE, SET_EDITOR_PANEL_FOCUSED, SET_EDITOR_PANEL_MOVABLE, TOGGLE_EDITOR_PANEL_MOVABLE, SET_EDITOR_PANEL_RESIZABLE, CREATE_EDITOR_WINDOW } from '../const/actionTypes';
import { EditorPanelState } from '../types/states'

export const editorWindowEvents = (state, action) => {
    let newState = { ...state };
    
    switch (action.type)
    {
        case CREATE_EDITOR_WINDOW:
            const { wid } = action.payload;

            newState.editorWindows[wid] = {
                visible: true,
                
                panels: { }
            }

            return newState;
    }
}

export const editorPanelEvents = (state, action) => {
    const { wid, name } = action.payload;
    let newState = { ...state };

    switch (action.type)
    {
        case CREATE_EDITOR_PANEL:
            const { options } = action.payload;
            const colors = state.theme.colors;
            const defaults = state.theme.defaults;

            newState.editorWindows[wid].panels[name] = {
                visible: true,
                focused: true,
                movable: true,
                resizable: {
                    left: true,
                    top: true,
                    bottom: true,
                    right: true
                },

                frame: {
                    color: colors["sub-frame-color"]
                },

                position: {
                    x: defaults.editorPanel.position.x,
                    y: defaults.editorPanel.position.y
                },

                offset: {
                    x: 0,
                    y: 0
                },

                size: {
                    x: defaults.editorPanel.size.x,
                    y: defaults.editorPanel.size.y
                },

                ...options
            };

            return newState;

        case DESTROY_EDITOR_PANEL:
            newState.editorWindows[wid].panels[name] = undefined;

            return newState;

        case HIDE_EDITOR_PANEL:
            newState.editorWindows[wid].panels[name].visible = false;
            
            return newState;

        case SHOW_EDITOR_PANEL:
            newState.editorWindows[wid].panels[name].visible = true;

            return newState;

        case MINIMIZE_EDITOR_PANEL:
            newState.editorWindows[wid].panels[name].visible = false;
            newState.editorWindows[wid].panels[name].minimized = true;

            return newState;

        case RESTORE_EDITOR_PANEL:
            newState.editorWindows[wid].panels[name].visible = true;
            newState.editorWindows[wid].panels[name].minimized = false;

            return newState;

        case BEGIN_MOVE_EDITOR_PANEL:
            const { event } = action.payload;
            let newState = { ...state };
            let target = newState.editorWindows[wid].panels[name];

            newState.editorWindows[wid].panels[name].offset = {
                x: event.pageX - target.position.x,
                y: event.pageY - target.position.y
            }

            event.dataTransfer.setDragImage(state.dummies.dragImage, 0, 0);

            return newState;

        case MOVE_EDITOR_PANEL:
            const { pos } = action.payload;
            let target = state.editorWindows[wid].panels[name];

            let position = {
                x: pos.x - target.offset.x,
                y: pos.y - target.offset.y
            }

            return { ...state, position };

        case TOGGLE_EDITOR_PANEL_VISIBLE:
            const { visible } = state.editorWindows[wid].panels[name];
            newState.editorWindows[wid].panels[name].visible = !visible;

            return newState;

        case SET_EDITOR_PANEL_FOCUSED:
            const { focused } = action.payload;
            newState.editorWindows[wid].panels[name].focused = focused;

            return newState;

        case SET_EDITOR_PANEL_MOVABLE:
            const { movable } = action.payload;
            newState.editorWindows[wid].panels[name].movable = movable;

            return newState;

        case TOGGLE_EDITOR_PANEL_MOVABLE:
            newState.editorWindows[wid].panels[name].movable = !state.editorWindows[wid].panels[name].movable;

            return newState;

        case SET_EDITOR_PANEL_RESIZABLE:
            const { resizable } = action.payload;
            newState.editorWindows[wid].panels[name].resizable = resizable;

            return newState;

        default:
            return state;
    }
}