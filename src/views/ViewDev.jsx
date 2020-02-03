import React from 'react';
import EditorPanel from '../components/editorPanel';

import $prefs from '../resources/userPreferences.json';

export default class ViewDev extends React.Component
{
    render()
    {
        return (
            <>
                <div className="container" style={{
                    backgroundColor: $prefs.theme["main-theme-color"],
                    width: "1000px",
                    height: "800px"
                }}>
                    <EditorPanel name="panel-project-explorer" title="Project Explorer" posX="0" posY="0" resizable={true}></EditorPanel>
                    <EditorPanel name="panel-extensions" title="Extensions" posX="250" posY="0" resizable={true}></EditorPanel>
                    <EditorPanel name="panel1" title="test panel1" posY="200"></EditorPanel>
                    <EditorPanel name="panel2" title="킹동준" posX="500" resizable={{top: false, bottom: false, left: true, right: true}}></EditorPanel>
                    <EditorPanel name="panel3" title="새로운 패널"></EditorPanel>
                    <EditorPanel title="새로운창"></EditorPanel>
                </div>
            </>  
        );
    }
}