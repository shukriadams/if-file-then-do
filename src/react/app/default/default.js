import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class View extends React.Component {

    render(){
        return(
            <Fragment>
                loaded
                <ul>
                    {
                        this.props.events.map((item, index)=>{
                            return(                            
                                <li key={index}>
                                    <div>
                                        {index+1}
                                    </div>
                                    <div>
                                        {item.date}
                                    </div>
                                    <div>
                                        {item.file}
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
            events : state.events.events
        }
    }
)(View)

export { View }
