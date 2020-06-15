import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'

class  BurguerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render() {
        return(
            <Auxiliary>
                <Burguer ingredients={this.state.ingredients} />
                <BuildControls />
                
            </Auxiliary>
        );
    }
}

export default BurguerBuilder 