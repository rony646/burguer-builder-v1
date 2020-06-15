import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burguer from '../../components/Burguer/Burguer'

class  BurguerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 2,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return(
            <Auxiliary>
                <Burguer ingredients={this.state.ingredients} />
                <div>Burguer Controls</div>
            </Auxiliary>
        );
    }
}

export default BurguerBuilder 