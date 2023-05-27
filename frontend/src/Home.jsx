import React from 'react';
import Nav from './Nav';
import Footer from './Footer'
import Rate from './Rate'
import LineChart from './linechart'
import Calculator from './Calculator';
import { useLocation } from 'react-router-dom';



function Home() {
    let location = useLocation()
    let name = location.state
    return (
        <div>
                    <div id="content-wrapper" className="d-flex flex-column bg-light">
                        <div id="content">
                            <Nav Name={name}></Nav>
                            <div className="container-fluid">
                                <Rate />
                                <div className="row">
                                    <div className="col-lg-12">
                                    <div className='trans rounded rounded mb-3'>
                                     <LineChart />
                                    </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <Calculator />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
        </div>
    )
}

export default Home;