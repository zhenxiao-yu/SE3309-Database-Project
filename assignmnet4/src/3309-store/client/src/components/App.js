import React from 'react';
import Header from './Header'
import ProductList from './ProductList'

//main store application component
class App extends React.Component {
    render() {
        return (
            <div className="App-container">
                <Header/>
                <ProductList/>
            </div>
            

        )
    }
}

export default App;