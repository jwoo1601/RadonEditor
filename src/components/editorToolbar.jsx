import { connect } from 'react-redux'; 

const ConnectedEditorToolbar = ({ name, items }) => {
    return (
        <ul className="editor-toolbar" id={name}>
            {
                items.map((it) => (
                <li className="editor-toolbar-item">{it.text}</li>
                ))
            }
        </ul>
    );
}

const EditorToolbar = connect()(ConnectedEditorToolbar);

export default EditorToolbar;