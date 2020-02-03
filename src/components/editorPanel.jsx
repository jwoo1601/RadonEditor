import React, { useState, useEffect } from "react";
import "./style/editorPanel.css";
import $prefs from "../resources/userPreferences.json";

import IconPin from "./style/icons/pin.svg";
import IconUnpin from "./style/icons/unpin.svg";
import IconClose from "./style/icons/close.svg";

import { connect } from "react-redux";
import { fireUIEvent } from "../reducers/uiEvents";

const DummyDragImage = document.createElement("img");

/**
 * Available attributes:
 * visible (boolean)
 * title (string)
 * posX, posY (number/string) - specifies the x and y position of the panel (from the top-left corner)
 * width, height (string)
 * fontSize (number/string)
 * resizable (boolean/object { left, right, top, bottom }) -
 * movable (boolean)
 * closable (boolean)
 * pinnable (boolean)
 */
export default class EditorPanel extends React.Component {
  timeoutId;

  constructor(props) {
    super(props);

    this.resizeLeft = this.resizeLeft.bind(this);
    this.resizeRight = this.resizeRight.bind(this);
    this.resizeTop = this.resizeTop.bind(this);
    this.resizeBottom = this.resizeBottom.bind(this);
    this.onMoveStart = this.onMoveStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onClickPinUnpin = this.onClickPinUnpin.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      visible: true,
      movable: props.movable === undefined ? true : props.movable,
      x: parseInt(props.posX || 0),
      y: parseInt(props.posY || 0),
      width: props.width ? props.width : $prefs.default["editor-panel-width"],
      height: props.height
        ? props.height
        : $prefs.default["editor-panel-height"],
      fontSize: props.fontSize
        ? parseInt(props.fontSize)
        : parseInt($prefs.default["editor-panel-font-size"]),
      offsetX: 0,
      offsetY: 0,
      bOnFocus: false
    };
  }

  render() {
    let resizable;

    if (
      this.props.resizable != undefined &&
      typeof this.props.resizable === "boolean"
    ) {
      resizable = {
        left: this.props.resizable,
        top: this.props.resizable,
        bottom: this.props.resizable,
        right: this.props.resizable
      };
    } else {
      resizable = {
        left: true,
        top: true,
        bottom: true,
        right: true
      };

      if (this.props.resizable) {
        resizable = Object.assign(resizable, this.props.resizable);
      }
    }

    let style = {
      left: Math.max(0, this.state.x),
      top: Math.max(0, this.state.y),
      width: this.state.width,
      height: this.state.height,
      fontSize: this.state.fontSize,
      backgroundColor: $prefs.theme["main-theme-color"],
      zIndex: this.state.bOnFocus ? 1 : 0
    };

    let contentStyle = {
      backgroundColor: $prefs.theme["main-theme-color"]
    };

    let barStyle = {
      backgroundColor: $prefs.theme["main-frame-color"]
    };

    return (
      <div
        id={this.props.name || ""}
        className="editor-panel"
        style={style}
        hidden={!this.state.visible}
        tabIndex="1"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <EditorPanelFrame
          title={this.props.title}
          backgroundColor={$prefs.theme["main-frame-color"]}
          foregroundColor={$prefs.theme["main-font-color"]}
          movable={this.state.movable}
          onMoveStart={this.onMoveStart}
          onMove={this.onMove}
          onClickPinUnpin={this.onClickPinUnpin}
          onClickClose={this.onClickClose}
        ></EditorPanelFrame>

        <div className="content" style={contentStyle}></div>

        {resizable.left ? (
          <div
            className="left-resize-bar"
            style={barStyle}
            onMouseOver={e => {
              e.currentTarget.style.cursor = "w-resize";
            }}
            draggable="true"
            onDragStart={e => {
              e.dataTransfer.setDragImage(DummyDragImage, 0, 0);
            }}
            onDrag={this.resizeLeft}
          ></div>
        ) : null}

        {resizable.right ? (
          <div
            className="right-resize-bar"
            style={barStyle}
            onMouseOver={e => {
              e.currentTarget.style.cursor = "e-resize";
            }}
            draggable="true"
            onDragStart={e => {
              e.dataTransfer.setDragImage(DummyDragImage, 0, 0);
            }}
            onDrag={this.resizeRight}
          ></div>
        ) : null}

        {resizable.top ? (
          <div
            className="top-resize-bar"
            style={barStyle}
            onMouseOver={e => {
              e.currentTarget.style.cursor = "n-resize";
            }}
            draggable="true"
            onDragStart={e => {
              e.dataTransfer.setDragImage(DummyDragImage, 0, 0);
            }}
            onDrag={this.resizeTop}
          ></div>
        ) : null}

        {resizable.bottom ? (
          <div
            className="bottom-resize-bar"
            style={barStyle}
            onMouseOver={e => {
              e.currentTarget.style.cursor = "s-resize";
            }}
            draggable="true"
            onDragStart={e => {
              e.dataTransfer.setDragImage(DummyDragImage, 0, 0);
            }}
            onDrag={this.resizeBottom}
          ></div>
        ) : null}

        {resizable.top && resizable.left ? (
          <div
            className="top-left-resize-square"
            style={barStyle}
            onMouseOver={e => {
              e.currentTarget.style.cursor = "nw-resize";
            }}
            draggable="true"
            onDragStart={e => {
              e.dataTransfer.setDragImage(DummyDragImage, 0, 0);
            }}
            onDrag={e => {
              this.resizeTop(e);
              this.resizeLeft(e);
            }}
          ></div>
        ) : null}

        {resizable.bottom && resizable.left ? (
          <div
            className="bottom-left-resize-square"
            style={barStyle}
            onMouseOver={e => {
              e.currentTarget.style.cursor = "sw-resize";
            }}
            draggable="true"
            onDragStart={e => {
              e.dataTransfer.setDragImage(DummyDragImage, 0, 0);
            }}
            onDrag={e => {
              this.resizeBottom(e);
              this.resizeLeft(e);
            }}
          ></div>
        ) : null}

        {resizable.bottom && resizable.right ? (
          <div
            className="bottom-right-resize-square"
            style={barStyle}
            onMouseOver={e => {
              e.currentTarget.style.cursor = "se-resize";
            }}
            draggable="true"
            onDragStart={e => {
              e.dataTransfer.setDragImage(DummyDragImage, 0, 0);
            }}
            onDrag={e => {
              this.resizeBottom(e);
              this.resizeRight(e);
            }}
          ></div>
        ) : null}

        {resizable.top && resizable.right ? (
          <div
            className="top-right-resize-square"
            style={barStyle}
            onMouseOver={e => {
              e.currentTarget.style.cursor = "ne-resize";
            }}
            draggable="true"
            onDragStart={e => {
              e.dataTransfer.setDragImage(DummyDragImage, 0, 0);
            }}
            onDrag={e => {
              this.resizeTop(e);
              this.resizeRight(e);
            }}
          ></div>
        ) : null}
      </div>
    );
  }

  resizeLeft(event) {
    if (event.pageX > 0) {
      this.setState({
        x: event.pageX,
        width:
          Math.max(
            0,
            -(
              event.pageX -
              event.currentTarget.parentElement.getBoundingClientRect().right
            )
          ) /
            this.state.fontSize +
          "em"
      });
    }
  }

  resizeRight(event) {
    if (event.pageX > 0) {
      this.setState({
        width:
          Math.max(
            0,
            event.pageX -
              event.currentTarget.parentElement.getBoundingClientRect().left
          ) /
            this.state.fontSize +
          "em"
      });
    }
  }

  resizeTop(event) {
    if (event.pageY > 0) {
      this.setState({
        y: event.pageY,
        height:
          Math.max(
            0,
            -(
              event.pageY -
              event.currentTarget.parentElement.getBoundingClientRect().bottom
            )
          ) /
            this.state.fontSize +
          "em"
      });
    }
  }

  resizeBottom(event) {
    if (event.pageY > 0) {
      this.setState({
        height:
          Math.max(
            0,
            event.pageY -
              event.currentTarget.parentElement.getBoundingClientRect().top
          ) /
            this.state.fontSize +
          "em"
      });
    }
  }

  onMoveStart(event) {
    if (this.state.movable) {
      this.setState({
        offsetX:
          event.pageX -
          event.currentTarget.parentElement.getBoundingClientRect().left,
        offsetY:
          event.pageY -
          event.currentTarget.parentElement.getBoundingClientRect().top
      });
    }

    event.dataTransfer.setDragImage(DummyDragImage, 0, 0);
  }

  onMove(event) {
    if (this.state.movable) {
      this.setState({
        x: event.pageX - this.state.offsetX,
        y: event.pageY - this.state.offsetY
      });
    }
  }

  onClickPinUnpin(event) {
    this.setState({
      movable: !this.state.movable
    });
  }

  onClickClose(event) {
    this.setState({
      visible: false
    });
  }

  onFocus(event) {
    clearTimeout(this.timeoutId);

    if (!this.state.bOnFocus) {
      this.setState({
        bOnFocus: true
      });
    }
  }

  onBlur(event) {
    this.timeoutId = setTimeout(() => {
      if (this.state.bOnFocus) {
        this.setState({
          bOnFocus: false
        });
      }
    }, 0);
  }
}

// const EditorPanelFrame = (props) => (
// <div className='editor-panel-frame'
// style={{
// backgroundColor: props.backgroundColor,
// color: props.foregroundColor
// }}
//
// draggable={props.movable}
// >
{
  /* </div> */
}
// );

export class EditorPanelFrame extends React.Component {
  constructor(props) {
    super(props);

    this.movePanelStart = this.movePanelStart.bind(this);
    this.movePanel = this.movePanel.bind(this);
    this.onClickPinUnpin = this.onClickPinUnpin.bind(this);
    this.onClickClose = this.onClickClose.bind(this);

    this.state = {
      pinned: !props.movable
    };
  }

  render() {
    let style = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.foregroundColor
    };

    return (
      <div
        className="frame"
        style={style}
        draggable={this.props.movable}
        onDragStart={this.movePanelStart}
        onDrag={this.movePanel}
        onMouseOver={e => {
          if (!this.state.pinned) {
            e.currentTarget.style.cursor = "move";
          }
        }}
      >
        <div className="title-bar" draggable={false}>
          <p className="title" draggable={false}>
            {this.props.title}
          </p>
        </div>
        <div className="btn-group">
          <EditorPanelFrameButton
            image={`${IconPin}`}
            color={
              this.state.pinned
                ? $prefs.theme["sub-button-active-color"]
                : undefined
            }
            onClick={this.onClickPinUnpin}
          ></EditorPanelFrameButton>
          <EditorPanelFrameButton
            image={`${IconClose}`}
            onClick={this.onClickClose}
          ></EditorPanelFrameButton>
        </div>
      </div>
    );
  }

  movePanelStart(event) {
    this.props.onMoveStart(event);
  }

  movePanel(event) {
    if (!this.state.pinned && event.pageX > 0 && event.pageY > 0) {
      this.props.onMove(event);
    }
  }

  onClickPinUnpin(event) {
    this.setState({
      pinned: !this.state.pinned
    });

    this.props.onClickPinUnpin(event);
  }

  onClickClose(event) {
    this.props.onClickClose(event);
  }
}

const NamespaceEditorPanelFrame = {
  mapStateToProps: (state, ownProps) => {
    const { name } = ownProps.name;
  },

  mapDispatchToProps: (dispatch, ownProps) => {
    return {
      beginMove: event =>
        dispatch(
          fireUIEvent(EDITOR_PANEL_FRAME_MOVE_START, ownProps.name, event)
        ),
      onMove: event =>
        dispatch(fireUIEvent(EDITOR_PANEL_FRAME_ON_MOVE, ownProps.name, event))
    };
  },

  component: ({
    name,
    title,
    color,
    textColor,
    movable,
    beginMove,
    onMove
  }) => (
    <div
      className="editor-panel-frame"
      id={name}
      style={{
        backgroundColor: color,
        color: textColor
      }}
      draggable={movable}
      onDragStart={beginMove}
      onDrag={onMove}
      onMouseOver={e => {
        if (!this.state.pinned) {
          e.currentTarget.style.cursor = "move";
        }
      }}
    >
      <div className="editor-panel-frame-title-bar" draggable={false}>
        <p className="editor-panel-frame-title-text" draggable={false}>
          {this.props.title}
        </p>
      </div>

      <div className="frame-buttons">
        <EditorPanelFrameButton
          image={`${IconPin}`}
          color={
            this.state.pinned
              ? $prefs.theme["sub-button-active-color"]
              : undefined
          }
          onClick={this.onClickPinUnpin}
        ></EditorPanelFrameButton>
        <EditorPanelFrameButton
          image={`${IconClose}`}
          onClick={this.onClickClose}
        ></EditorPanelFrameButton>
      </div>
    </div>
  )
};

const NamespaceEditorPanelFrameButton = {
  mapStateToProps: (state, ownProps) => {
    const { name } = ownProps.name;
    const { color, icon } = state.editorPanels[
      ownProps.panelName
    ].frame.buttons[name];

    return { name, color, icon };
  },

  component: ({ name, color, icon, action }) => (
    <button
      className="editor-panel-frame-button"
      id={name}
      style={{
        backgroundColor: color,
        backgroundImage: icon,
        backgroundRepeat: "no-repeat"
      }}
      onMouseOver={event => {
        event.target.style.cursor = "pointer";
      }}
      onClick={action}
    ></button>
  )
};

export const EditorPanelFrameButton = connect(
  NamespaceEditorPanelFrameButton.mapStateToProps
)(NamespaceEditorPanelFrameButton.component);

/* export class EditorPanelFrameButton extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render()
    {
        let buttonStyle = {
            backgroundColor: this.props.color || $prefs.theme["sub-button-default-color"],
            backgroundImage: `url(${this.props.image})` || "",
            backgroundRepeat: 'no-repeat'
        };

        return (
            <button className='editor-panel-frame-button' style={buttonStyle}
                onMouseOver={(e) => { e.currentTarget.style.cursor = "pointer"; }}
                onClick={this.handleClick}>
            </button>
        );
    }

    handleClick(event)
    {
        this.props.onClick(event);
    }
} */

const buildResizer = ({ direction, side, setter }) => {
  const coordinatePropName = `page${direction}`;
  const sidePropName = side;

  return () => {
    if (event[coordinatePropName] > 0) {
      setter({
        y: event[coordinatePropName],
        height:
          Math.max(
            0,
            -(
              event[coordinatePropName] -
              event.currentTarget.parentElement.getBoundingClientRect()[
                sidePropName
              ]
            )
          ) /
            this.state.fontSize +
          "em"
      });
    }
  };
};
