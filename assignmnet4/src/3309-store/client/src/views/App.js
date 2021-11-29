import React from 'react';
import Header from 'components/Header'
import ProductList from 'components/ProductList'

//main store application component
class App extends React.Component {
    render() {
        return (
            <div className="App-container">
                
                <Header username=""/>
                <ProductList/>
            </div>
            

        )
    }
}

export default App;