import React from 'react'
import './splashScreen.css'

class SplashScreen extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
        <div className="splash-screen">
            <div className="splash-outer-circle">
                <div className="splash-inner-circle">
                    <div className="splash-inner-box"></div>
                    <div className="splash-inner-vbox"></div>
                </div>
            </div>
            <p className="splash-text">{this.props.text}</p>
            <p className="display-text">{this.props.displayText}</p>
            <p className="splash-caption">{this.props.caption}</p>
        </div>
        )
    }
}

export default SplashScreen