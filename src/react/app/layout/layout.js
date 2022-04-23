import React, { Fragment } from 'react'

class Layout extends React.Component {
    render() {
        return (
            <Fragment>
                <x-header className="--sticky  ">
                    <x-header-logocontainer>
                        <a href="/">
                            <i className="icon icon-cube"></i>
                            <x-header-logo>
                                title
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
                                <a className="sideMenu-anchor" href="#">
                                    History
                                </a>
                            </li>
                        </ul>
                    </x-nav>
                
                    <x-content>
                        <div className="dashboardDemo-pageGeneralContent">
                            <div className="dashboardDemo-cards">
                                {this.props.children}
                            </div>
                        </div>
                    </x-content>
                </x-main>  
            </Fragment>          
        )
    }
}

export { Layout }
