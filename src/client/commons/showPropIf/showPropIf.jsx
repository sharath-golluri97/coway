import React, {Component} from "react";

export default class ShowIfPropTrue extends Component {
    render() {
        const { prop } = this.props;
        return prop ? React.cloneElement(this.props.children) : null;
    }
}
