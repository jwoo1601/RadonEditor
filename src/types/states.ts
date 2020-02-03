import { Tuple2D } from './math';
import { URL } from 'url';
import { Color } from 'csstype';
import { RadonWindowManager } from '../components/RadonWindow';
import ResourceManager from '../../temp/resourceManager';

export interface State
{
    theme: Theme;
    editorWindows: object;

    windowManager: RadonWindowManager;
    resourceManager: ResourceManager;

    dummies: object;
}

export interface Action
{
    type: string;
    payload: object;
}

export interface Theme
{
    colors: object;
    defaults: object;
}

export interface EditorWindowState
{
    visible: boolean;
    
    panels: object;
    baseFontSize: number;
}

interface DirectionalState
{
    top: boolean;
    left: boolean;
    right: boolean;
    bottom: boolean;
}

export interface EditorPanelState
{
    visible: boolean;
    minimized: boolean;
    focused: boolean;
    movable: boolean;
    resizable: DirectionalState;
    frame: EditorPanelFrameState;

    position: Tuple2D;
    offset: Tuple2D;
    size: Tuple2D;
}

export interface EditorPanelFrameState
{
    icon: string;
    title: string;
    color: Color;

    buttons: object;
}

export interface EditorPanelFrameButtonState
{
    icon: string;
    color: Color;
}