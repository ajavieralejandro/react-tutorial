import React from 'react';

class ErrorBoudary extends React.Component{
    constructor(){
        super();
        this.state = {
            hasError : false
        }
    }
    static getDerivedStateFromError(error){
        //process the error ...
        return {hasError : true};
        
    }

    componentDidCatch(error,info){
        console.log(error);
    }

    render(){
        if(this.state.hasError)
            return<div>Something went wrong...</div>
        else
        return this.props.children
    }
}

export default ErrorBoudary;