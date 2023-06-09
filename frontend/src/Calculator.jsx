import React from 'react'
import './Calculator.css'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useRef } from 'react';


function Calculator() {

    //Data save points
    const [res, setres] = useState([]);
    const [city, setcity] = useState("");
    const [purity, setpurity] = useState("");
    const [gram, setgram] = useState();
    const [result, setresult] = useState();
    const [resstate, setresstate] = useState();
    const [respurity, setrespurity] = useState();
    const [resgram, setresgram] = useState();
    const [resval, setresval] = useState(0);
    const [data, setdata] = useState([]);
    const [days1, setdays1] = useState([]);
    const pdfRef = useRef(null);
    let states = [];

    //API call point
    let getData = async () => {
        let response = await axios.get("https://gold-rate-calculator-backend.vercel.app/All_Data");
        try {
            setres(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    //API Call time 
    useEffect(() => {
        getData();
    }, []);

    //Data Loop and store;
    res.map((ele) => {
        states.push(ele.state);
    });

    const handleChange = (event) => {
        setcity(event.target.value);
    };

    const handleChange1 = (event) => {
        setpurity(event.target.value);
    };

    const handleChange2 = (event) => {
        setgram(event.target.value);
    };

    //Conditions and Data push method;
    let f;
    let s;
    let data24;
    let data22;
    let days;
    const handlesubmit = (event) => {
        event.preventDefault();
        res.filter((elem) => {
            if (elem.state === city) {
                f = elem.today[0];
                s = elem.today[1];
                data24 = elem.data24;
                data22 = elem.data22;
                days = elem.days;
            }
        });
        setdays1(days);
        setresstate(city);
        setrespurity(purity);
        setresgram(gram);

        if (purity === "24Carat") {
            setresval(f);
            let value = (f / 10) * gram;
            setresult(value);
            setdata(data24);
        } else {
            setresval(s);
            setdata(data22);
            setresult((s / 10) * gram);
        }
    };

    //Data Html to PDF converter part
    const handleDownload = () => {
        const content = pdfRef.current;

        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save('Gold_data.pdf');
            },
            width: 180, // <- here
            windowWidth: 500, // <- here
            hight: 1000,
        });
    };


    return (
        <>
            <div className="card mb-2 price">
                <div className="card-body text-center">
                    <h3 className='odd'>Gold Rate Calculator</h3>
                </div>
            </div>
            <div className="card mb-4 price">
                <div className="card-header">
                    <form className='Cal1 needs-validation' onSubmit={handlesubmit}>
                        <select className="form-select mb-2 mt-1 price Cal odd" onChange={handleChange} value={city} aria-label=".form-select-lg example" required>
                            {!city && <option className='odd' value="DEFAULT">Select City</option>}
                            {
                                states.map((ele, i) => {
                                    return (
                                        <option className='odd' key={i} value={ele}>{ele}</option>
                                    )
                                })
                            }
                        </select>

                        <div className="col-auto">
                            <input type="text" id="inputPassword6" onChange={handleChange2} value={gram || ""} className="form-control  mb-2 mt-1 price Cal" placeholder='Enter Gold Gram' aria-describedby="passwordHelpInline" required />
                        </div>

                        <select className="form-select mb-2 mt-1 price Cal odd" required onChange={handleChange1} value={purity} aria-label="Default select example" >
                            <option className='odd' value="DEFAULT">Select Purity</option>
                            <option className='odd' value="24Carat">24 Carat</option>
                            <option className='odd' value="22Carat">22 Carat</option>
                        </select>

                        <div>
                            <button className="btn btn-warning odd mb-2 mt-1" type='submit'>calculate</button>
                        </div>
                    </form>
                </div>
                {
                    result ? <div className="card-body" ref={pdfRef} id="tata">
                        <h4 className='text-center mb-4 mt-1 odd'>{respurity} Gold Price In {resstate} Today</h4>

                        <table className="table table-hover text-center odd">
                            <thead>
                                <tr>
                                    <th>Gram</th>
                                    <th>Gold Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1 Gram</td>
                                    <td>{resval / 10}</td>
                                </tr>
                                <tr>
                                    <td>8 Gram</td>
                                    <td>{(resval / 10) * 8}</td>
                                </tr>
                                <tr>
                                    <td>10 Gram</td>
                                    <td>{resval}</td>
                                </tr>
                                <tr>
                                    <td>100 Gram</td>
                                    <td>{resval * 10}</td>
                                </tr>
                                <tr>
                                    <td><mark>{gram} Gram</mark></td>
                                    <td><mark>{(resval / 10) * gram }</mark></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> : null
                }
                {
                    result ? <div className="card-footer text-end text-muted price">
                        <button type="button" className="btn btn-warning btn-floating" onClick={handleDownload}>
                            <i className="fas fa-download">Download as Pdf</i>
                        </button>
                    </div> : null
                }
            </div>
        </>
    )
}

export default Calculator;