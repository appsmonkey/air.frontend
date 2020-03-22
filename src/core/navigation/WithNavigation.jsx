import React from 'react';
import Header from "../../features/header/components/Header";

class WithNavigation extends React.Component{
  
  render(){
    return(
      <>
        <Header />
        {this.props.children}
      </>
    );
  }
}

export default WithNavigation;