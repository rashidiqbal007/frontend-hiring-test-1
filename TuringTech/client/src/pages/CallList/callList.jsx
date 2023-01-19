import { React, useState, useEffect } from 'react'
import Navbar from '../../components/navbar'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { Call } from './data.js'
import './callList.css'
import { json } from 'react-router-dom';
import Pagination from '../../components/pagination';

const callList = () => {
    const [show, setShow] = useState(false);
    const [filter, setFilter] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [CallsPerPage] = useState(3);
    const handleClose = () => setShow(false);
    // const [archive, setArchive] = useState(false);
    const handleShow = () => setShow(true);
    // console.log(Call)



    const handleReset = () => {
        setFilter(users)
    }

    const setarchive = (searchedVal) => {
        searchedVal = "Archived"
        const filteredRows = Call.filter((row) => {
            return row.is_archived.toString().includes(searchedVal.toString());
        });
        if (searchedVal.length < 1) {
            setFilter(data)
        }
        else {
            setFilter(filteredRows)
        }
    };
    const setunarchive = (searchedVal) => {
        searchedVal = "Unarchived"
        const filteredRows = Call.filter((row) => {
            return row.is_archived.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
        });
        if (searchedVal.length < 1) {
            setFilter(data)
        }
        else {
            setFilter(filteredRows)
        }
    };

    const setToAll = () => {
        setFilter(Call);
    };
    useEffect(() => {
        const indexOfLastCall = currentPage * CallsPerPage;
        const indexOfFirstCall = indexOfLastCall - CallsPerPage;
        setFilter(Call.slice(indexOfFirstCall, indexOfLastCall));
    }, [])




    const paginate = pageNumber => setCurrentPage(pageNumber);
    const getData = () => {
        try {
            axios.get("https://frontend-test-api.aircall.io/#")
                .then(response => { console.log(response) })
                .catch(err => {
                    console.log(err)
                })

        } catch (error) {

        }


    }
    // getData()

    return (
        <div style={{ "font-family": "Roboto, Helvetica, Arial, sans-serif" }}><Navbar />
            <h1 style={{ "margin-left": "23px" }}>Turing Technologies Frontend Test</h1>
            <Dropdown>
                <Dropdown.Toggle style={{ "margin": "0.5%", "margin-left": "23px" }} variant="success" id="dropdown-basic">
                    Status
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={setarchive}>Archived</Dropdown.Item>
                    <Dropdown.Item onClick={setunarchive}>Unarchived</Dropdown.Item>
                    <Dropdown.Item onClick={setToAll}>All</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className='main'>

                <Modal style={{ "font-family": "Roboto, Helvetica, Arial, sans-serif" }} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Notes<br /></Modal.Title>
                        {/* id here */}
                    </Modal.Header>
                    <Modal.Body><b>Call Type: {Call[0].call_type} </b></Modal.Body>
                    <Modal.Body><b>Duration: {Call[0].duration} </b></Modal.Body>
                    <Modal.Body><b>From: {Call[0].from} </b></Modal.Body>
                    <Modal.Body><b>To: {Call[0].to} </b></Modal.Body>
                    <Modal.Body><b>Via: {Call[0].via} </b></Modal.Body>
                    <Modal.Body><h5>Notes: {Call[0].Notes} </h5><input type="textarea" className='notes-input' placeholder='Add Notes' /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" style={{ "min-width": "98%" }} onClick={handleClose}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="table-container">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>CALL TYPE</th>
                                <th>DIRECTION</th>
                                <th>DURATION</th>
                                <th>FROM</th>
                                <th>TO</th>
                                <th>VIA</th>
                                <th>CREATED AT</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filter.map((data) => (
                                <tr>

                                    <td>{data.call_type}</td>
                                    <td>{data.direction}</td>
                                    <td>{data.duration}</td>
                                    <td>{data.from}</td>
                                    <td>{data.to}</td>
                                    <td>{data.via}</td>
                                    <td>{data.created_at}</td>
                                    <td>{data.is_archived}</td>
                                    <td><button onClick={handleShow} className="btn">Add Note</button></td>



                                </tr>
                            ))}
                            <div className="pagination">
                                <Pagination
                                    CallsPerPage={CallsPerPage}
                                    totalPosts={filter.length}
                                    paginate={paginate}
                                />
                            </div>

                        </tbody>
                    </Table>
                </div>
            </div></div>
    )
}

export default callList