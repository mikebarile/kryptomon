import React from 'react';
import { Link } from 'react-router';

class AddListingIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AddListingIndex;
