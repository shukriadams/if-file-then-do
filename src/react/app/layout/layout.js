import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

class Layout extends React.Component {
    render() {
        return (
            <Fragment>
                <x-header className="--sticky  ">
                    <x-header-logocontainer>
                        <a href="/">
                            <i className="icon icon-cube"></i>
                            <x-header-logo>
                                IFTD
                            </x-header-logo>
                        </a>
                    </x-header-logocontainer>
            
                    <x-header-content>
                    </x-header-content>    
                </x-header>

                <x-main>
                    <x-nav>
                        <ul className="sideMenu">
                            <li className="sideMenu-header">
                                Options
                            </li>
                            <li className="sideMenu-item ">
                                <Link className="sideMenu-anchor" to="/">History</Link>
                            </li>
                            <li className="sideMenu-item ">
                                <Link className="sideMenu-anchor" to="/config">Config</Link>
                            </li>                            
                        </ul>
                    </x-nav>
                
                    <x-content>
                        {this.props.children}
                    </x-content>
                </x-main>  
            </Fragment>          
        )
    }
}

export { Layout }
