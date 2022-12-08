import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ClassNames from 'classnames'
import timebelt from 'timebelt'
import ago from 's-ago'

class View extends React.Component {

    formatResult(result){
        // \n to <br>
        result = result.replace(/\\n/g, '<br />')
        // remove leading and trailing "
        result = result.replace(/^"(.*)"$/, '$1')
        return result
    }

    render(){
        return(
            <Fragment>
                <ul className="list --striped">
                    {
                        this.props.events.map((item, index)=>{
                            const classes = ClassNames(
                                'list-row',
                                {
                                    'list-row--error' : !item.passed
                                })

                            return(                            
                                <ul className={classes} key={index}>
                                    <div>
                                        <div>
                                            <x-list-cell>
                                                Name: {item.name}
                                            </x-list-cell>
                                            <x-list-cell>
                                                {ago(new Date(item.date))} <span className="quiet">{timebelt.toShort(item.date)}</span>
                                            </x-list-cell>
                                        </div>
                                        <div>
                                            <x-list-cell>
                                                Triggered by: {item.file} <span className="quiet">{item.eventType}</span>
                                            </x-list-cell>
                                        </div>
                                        <div className="quiet">
                                            <span dangerouslySetInnerHTML={{ __html: this.formatResult(JSON.stringify(item.result)) }} />
                                        </div>

                                    </div>
                                </ul>
                            )
                        })
                    }
                </ul>
            </Fragment>
        )
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
