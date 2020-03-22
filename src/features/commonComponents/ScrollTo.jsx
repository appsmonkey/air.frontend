import React from "react";
import { withRouter } from "react-router-dom";

class ScrollTo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scrolled: false,
    }
  }
  render(){
    const { scrolled } = this.state;
    const { identifier, delay, children, location } = this.props;
    
    return (
      <div ref={ref=>{
        this.$ref=ref;
         if (!scrolled && ref && location.hash === `#${identifier}`) {
           this.setState({scrolled: true})
           setTimeout(()=>{
             ref.scrollIntoView({
                 // optional params
                 behaviour: 'smooth',
                 block: 'start',
             });
           }, delay || 500)
          }
        }}>
        {children}
      </div>
    );
  }
};

export default withRouter(ScrollTo);
