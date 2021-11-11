import { React, useState } from 'react';

export default function Container() {

    const [status, setStatus] = useState(0);
    const [result, setResult] = useState([]);

    function search() {
        fetch(`https://gorest.co.in/public-api/users?gender=${parseInt(status) === 0 ? `female` : `male`}`)
            .then(response => response.json())
            .then(data => {
                setResult(data.data);
            });
    }

    function clear() {
        setStatus(0);
        setResult([]);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="row g-3">
                    {/* <div className="col-md-3">
                        <label htmlFor="inputEmail4" className="form-label">Plan Code</label>
                        <select className="form-select select" aria-label="Disabled select example">
                            <option value="0">-- select--</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="inputPassword4" className="form-label">Plan Name</label>
                        <select className="form-select select" aria-label="Disabled select example">
                            <option value="0">-- select--</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="inputPassword4" className="form-label">Client Name</label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="inputPassword4" className="form-label">Program Name</label>
                        <select className="form-select select" aria-label="Disabled select example">
                            <option value="0">-- select--</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="col-md-3 padding-top">
                        <label htmlFor="inputPassword4" className="form-label">Record</label>
                        <select className="form-select select">
                            <option value="0">-- select--</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div> */}
                    <div className="col-md-3 padding-top gender-select">
                        <label htmlFor="inputPassword4" className="form-label">Gender</label>
                        <select className="form-select select" onChange={(e) => setStatus(e.target.value)} value={status}>
                            <option value="0">female</option>
                            <option value="1">male</option>
                        </select>
                    </div>

                    <div className="col-12 button-right">
                        <button type="submit" className="btn btn-primary orange-button" onClick={() => search()}>Search</button>
                        <button type="submit" className="btn btn-primary orange-button clear-button" onClick={() => clear()}>Clear</button>
                    </div>

                    {result.length > 0 && <div>
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>email</th>
                                    <th>gender</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((person, index) => (
                                    <tr key={index}>
                                        <td>{person.id}</td>
                                        <td>{person.name}</td>
                                        <td>{person.email}</td>
                                        <td>{person.gender}</td>
                                        <td>{person.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
        </div>
    );
}