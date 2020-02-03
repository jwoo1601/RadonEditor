import React from 'react';
import './editorWindow.css'

import EditorToolbar from './editorToolbar';

const NamespaceEditorWindow = {
    mapStateToProps: (state, ownProps) => {

    },

    mapDispatchToProps: () => {

    },
    
    component: ({ name, }) => {
        return (
            <div className='editor-window' id={`editor-window-${name}`}>
                <EditorWindowFrame></EditorWindowFrame>
                <EditorToolbar name={`window-${name}-toolbar`}></EditorToolbar>

                <div className='editor-window-body'>
                    <EditorPanel wid={name} name="file-explorer"></EditorPanel> 
                </div>

                <EditorStatusBar></EditorStatusBar>
            </div> 
        );
    }
}

export default EditorWindow = connect(NamespaceEditorWindow.mapStateToProps)(NamespaceEditorWindow.component);

const NamespaceEditorWindowFrame = {
    mapStateToProps: (state, ownProps) => {

    },

    component: () => {

    }
};

export const EditorWindowFrame = connect(NamespaceEditorWindowFrame.mapStateToProps)(NamespaceEditorWindowFrame.component);

class EditorWindow extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            toolbarButtons: new Map()
        }
    }

    addToolbarButton(id, text, handler)
    {
        this.state.toolbarButtons.set(id, {
            text: text,
            onClick: handler
        })

        return this
    }

    removeToolbarButton(id)
    {
        this.state.toolbarButtons.delete(id)

        return this
    }

    render()
    {
        return (
            <div className='editor-window'>
                <ul className='editor-toolbar'>

                </ul>
            </div>
        )
    }
}

export default EditorWindow