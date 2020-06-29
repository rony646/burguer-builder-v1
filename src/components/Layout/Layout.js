import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import classes from './Layout.css'

class Layout extends Component {
    state = {
        show: false
    };

    sideDrawerClose = () => {
        this.setState({show: false})
    }

    sideDrawerHandler = () => {
        this.setState((prevState) => {
            return {show: !prevState.show}
        })
    }

    render() {
        return(
            <Auxiliary>
                <Toolbar close={this.sideDrawerHandler}/>
                <SideDrawer 
                    open={this.state.show} 
                    closed={this.sideDrawerClose}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
};

export default Layout