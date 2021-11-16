import { React, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

export default function Container() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState(1);
    const [status, setStatus] = useState(1);
    const [result, setResult] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedName, seSselectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedGender, setSelectedGender] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState(1);

    const baseUrl = 'https://gorest.co.in/public-api/users';

    const headers = {
        'Authorization': 'Bearer 9e99287bdd6384a489f60afe7af98550160f0e8cdfd45eb44dc665282be30b27',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    function search() {
        fetch(`${baseUrl}?gender=${parseInt(gender) === 0 ? `female` : `male`}&status=${parseInt(status) === 0 ? `inactive` : `active`}&name=${name}&email=${email}`)
            .then(response => response.json())
            .then(data => {
                let result = data.data;
                setResult(result);
            })
            .catch(err => {
                console.log(err);
            });;
    }

    function detailResult(e, id) {
        fetch(`${baseUrl}?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setResult(data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    Modal.setAppElement('#root');

    function editData(e, id, name, email, gender, status) {
        setSelectedId(id);
        seSselectedName(name);
        setSelectedEmail(email);
        setSelectedGender(gender);
        setSelectedStatus(status);
        setIsOpen(true);
    }

    function update() {
        setIsOpen(false);

        axios.patch(`${baseUrl}/${selectedId}`,
            {
                name: selectedName,
                email: selectedEmail,
                gender: selectedGender === 0 ? "female" : "male",
                status: selectedStatus === 0 ? "inactive" : "active",
            },
            { headers: headers }
        )
            .then(res => {
                if (res.status === 200) {
                    detailResult(res, selectedId);
                }
            })
            .catch(err => {
                console.log('error: ', err);
            })
    }

    function closeModal() {
        setIsOpen(false);

    }

    function deleteData(e, id) {
        alert('Do you want to delete it?');

        axios.delete(`${baseUrl}/${id}`, { headers })
            .then(res => {
                if (res.status === 200) {
                    search();
                }
            })
            .catch(err => {
                console.log('error', err);
            });
    }

    function clear() {
        setName('');
        setEmail('');
        setGender(1)
        setStatus(1);
        setResult([]);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="row g-3">
                    <div className="col-md-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="col-md-3 padding-top gender-select">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select className="form-select select" onChange={(e) => setGender(e.target.value)} value={gender}>
                            <option value="0">female</option>
                            <option value="1">male</option>
                        </select>
                    </div>
                    <div className="col-md-3 padding-top">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select select" onChange={(e) => setStatus(e.target.value)} value={status}>
                            <option value="0">inactive</option>
                            <option value="1">active</option>
                        </select>
                    </div>

                    <div className="col-12 button-right" style={{ marginTop: "50px", marginBottom: "50px" }}>
                        <button type="submit" className="btn btn-primary orange-button" onClick={() => search()}>Search</button>
                        <button type="submit" className="btn btn-primary orange-button clear-button" onClick={() => clear()}>Clear</button>
                    </div>

                    {result.length > 0 && <div className="resultTable">
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>GENDER</th>
                                    <th>STATUS</th>
                                    <th>EDIT</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((person, index) => (
                                    <tr key={index}>
                                        <td><a href="#!" onClick={(e) => detailResult(e, person.id)}>{person.id}</a></td>
                                        <td>{person.name}</td>
                                        <td>{person.email}</td>
                                        <td>{person.gender}</td>
                                        <td>{person.status}</td>
                                        <td><a href="#!" onClick={(e) => editData(e, person.id, person.name, person.email, person.gender === 'male' ? 1 : 0, person.status === 'active' ? 1 : 0)}>Edit</a></td>
                                        <td><a href="#!" onClick={(e) => deleteData(e, person.id)}>Delete</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Edit Modal"
                    >
                        <h2 style={{ textAlign: "center" }}>Edit Modal</h2>
                        <div style={{ display: "flex" }}>
                            <div className="col-md-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" onChange={(e) => seSselectedName(e.target.value)} value={selectedName} />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control" id="name" onChange={(e) => setSelectedEmail(e.target.value)} value={selectedEmail} />
                            </div>
                            <div className="col-md-3 padding-top gender-select">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select className="form-select select" onChange={(e) => setSelectedGender(e.target.value)} value={selectedGender}>
                                    <option value="0">female</option>
                                    <option value="1">male</option>
                                </select>
                            </div>
                            <div className="col-md-3 padding-top">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select className="form-select select" onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
                                    <option value="0">inactive</option>
                                    <option value="1">active</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => update()} style={{ float: "right", marginTop: "20px", marginRight: "15px" }}>Update</button>
                    </Modal>
                </div>
            </div>
        </div>
    );
}