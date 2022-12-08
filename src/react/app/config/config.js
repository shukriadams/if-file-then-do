import React, { Fragment } from 'react'
import { connect } from 'react-redux'

class View extends React.Component {
    render(){
        return(
            <Fragment>
                <h2>Config</h2>
                Watching :
                <ul>
                    {
                        this.props.settings.watch.map((item, index)=>{
                            return(                            
                                <li key={index}>
                                    <div>
                                        {index+1} - {item.name}
                                    </div>
                                    <div>
                                        Path: {item.path}
                                    </div>
                                    <div>
                                        Command: {item.command}
                                    </div>
                                    <div>
                                        On: {item.on}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>                
            </Fragment>
        );
    }
}

View.defaultProps = {

}

View = connect(
    function (state) {
        return {  
            settings : state.settings
        }
    }
)(View)

export { View }
