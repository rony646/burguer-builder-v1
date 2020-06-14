import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burguer from '../../components/Burguer/Burguer'

class  BurguerBuilder extends Component {
    render() {
        return(
            <Auxiliary>
                <Burguer />
                <div>Burguer Controls</div>
            </Auxiliary>
        );
    }
}

export default BurguerBuilder 