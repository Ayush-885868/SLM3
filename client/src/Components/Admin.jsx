import React, { useEffect, useState } from 'react';
import './Admin.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FaPenToSquare } from 'react-icons/fa6'

const customStyles = {
    rows: {
        styled: {
            backgroundColor: (row) => {
                if (row.Status === 'approved') {
                    return 'green';
                } else if (row.Status === 'rejected') {
                    return 'red';
                } else {
                    return 'yellow';
                }
            }
        },
    },
    headCells: {
        style: {
            fontSize: 15 + "px",
            fontWeight: 600,
        },
    },
    cells: {
        style: {
            fontSize: 13 + "px",
            fontWeight: 500,
        },
    },
};







function Admin() {
    const [contacts, setContacts] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [previousStatus, setPreviousStatus] = useState({}); // for restricting admin to change status if changed once



    const columns = [
        /* {
             name: 'ID',
             selector: 'id',
             sortable: true,
         },*/
        /* {
             name: 'ID',
             selector: (row)=>row.id,
             sortable: true,
         },*/

        {
            name: "Software_Name",
            selector: (row) => row.Dropdown
        },
        {
            name: "Other_Software",

            selector: (row) => row.DifferentSoft
        },
        {
            name: "Purpose",
            selector: (row) => row.Purpose
        },
        {
            name: "Hostname",
            selector: (row) => row.Hostname
        },
        {
            name: "Remark",
            selector: (row) => row.Remark
        },
        {

            name: "Status",
            cell: (row) => (
                <select value={row.Status} onChange={(e) => handleStatusChange(e, row)}>
                    <option value="pending" className="badge text-bg-success">Pending</option>
                    <option value="approved" className="badge text-bg-danger">Approved</option>
                    <option value="rejected" className="badge text-bg-warning">Rejected</option>
                </select>
            )

            // name: "Status",
            // cell: (row) => (
            //   // Check if the user is an admin
            //   //localStorage.getItem('role') === 'admin'
            //   contacts.Status == ("approved" || "rejected")
            //     ? // If the user is an admin, don't show the status change option
            //     <span>{row.Status}</span>
            //     : // If the user is not an admin, show the status change option
            //     <select value={row.Status} onChange={(e) => handleStatusChange(e, row)}>
            //       <option value="pending" className="badge text-bg-success">Pending</option>
            //       <option value="approved" className="badge text-bg-danger">Approved</option>
            //       <option value="rejected" className="badge text-bg-warning">Rejected</option>
            //     </select> 
            // )
        },
    ]

    //const [Software_Name, Other_Software, Purpose, Hostname, Remark, Status] = contacts.body;

    const handleStatusChange = async (e, row) => {
        try {
            // Check if the status has already been changed
            if (previousStatus[row._id] === e.target.value) {
                // If the status is the same as the previous one, do not allow the update
                return;
            }

            const updatedRow = { ...row, Status: e.target.value };
            //   await axios.put(`${window.location.origin}/contactmsyt/records/${row._id}`, updatedRow, {
            //     headers: {
            //       Authorization: `Berear ${localStorage.getItem('token')}`,
            //     },
            //   })
            //     .then((res) => {
            //       if (res.data.success) {
            //         // Update the contacts state and the previousStatus state
            //         setContacts((prevContacts) => prevContacts.map((contact) => {
            //           if (contact._id === row._id) {
            //             return { ...contact, Status: e.target.value };
            //           }
            //           return contact;
            //         }));
            //         setPreviousStatus((prev) => ({
            //           ...prev,
            //           [row._id]: e.target.value,
            //         }));
            //       }
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     });
            try {
                const response = await axios.put(`${window.location.origin}/contactmsyt/records/${row._id}`, updatedRow, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    // Update the contacts state and the previousStatus state
                    setContacts((prevContacts) =>
                        prevContacts.map((contact) => {
                            if (contact._id === row._id) {
                                return { ...contact, Status: e.target.value };
                            }
                            return contact;
                        })
                    );
                    setPreviousStatus((prev) => ({
                        ...prev,
                        [row._id]: e.target.value,
                    }));
                }
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Request failed with status code:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                } else {
                    // Something else happened while setting up the request
                    console.error('Error:', error.message);
                }
            }


        } catch (error) {
            console.log(error);
        }
    };




    // const handleStatusChange = async (e, row) => {
    //     try {
    //         const updatedRow = { ...row, Status: e.target.value };
    //         await axios.put(`http://127.0.0.1:3000/contactmsyt/records/${row._id}`, updatedRow,{
    //             headers: {
    //                 Authorization: `Berear ${localStorage.getItem('token')}`
    //             }
    //         }) // Assuming the endpoint for updating the record is '/api/records/:id'
    //             // Handle successful update
    //             .then((res) => {
    //                 if (res.data.success) {
    //                     //console.log(updatedRow)
    //                     //console.log("updated");
    //                     setContacts(prevContacts => prevContacts.map(contact => {
    //                         if (contact._id === row._id) {
    //                             return { ...contact, Status: e.target.value };
    //                         }
    //                         return contact;
    //                     }));
    //                 }
    //             }).catch((err) => {
    //                 // Handle error
    //                 console.log(err);

    //             });
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };




    // useEffect(() => {
    //     // setLoading(true)
    //     fetch('http://127.0.0.1:3000/contactmsyt/contacts')
    //         .then(response => response.json())
    //         .then(data => setContacts(data))
    //         // setLoading(false)
    //         .catch(error => console.error('Error fetching records: ', error)
    //             //setLoading(false)
    //         );

    // }, [contacts]);

    // useEffect(() => {
    //     // setLoading(true)
    //     fetch(`${window.location.origin}/contactmsyt/contacts`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setContacts(data);
    //             // Initialize the previousStatus state
    //             const initialPreviousStatus = {};
    //             data.forEach(contact => {
    //                 initialPreviousStatus[contact._id] = contact.Status;
    //             });
    //             setPreviousStatus(initialPreviousStatus);
    //         })
    //         .catch(error => console.error('Error fetching records: ', error));
    // }, [contacts]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/contactmsyt/contacts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                setContacts(response.data);

                // Initialize the previousStatus state
                const initialPreviousStatus = {};
                response.data.forEach((contact) => {
                    initialPreviousStatus[contact._id] = contact.Status;
                });
                setPreviousStatus(initialPreviousStatus);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Request failed with status code:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                } else {
                    // Something else happened while setting up the request
                    console.error('Error:', error.message);
                }
            }
        };

        fetchContacts();
    }, []);


    const { user } = useContext(UserContext);
    const navigate = useNavigate();



    return (

        <>
            <Header />

            <div className='bg-light' style={{ border: '2px solid black', margin: '5px', background: 'white', borderRadius: '5px', marginTop: '5px' }}>
                <span className='Autofill'>Name:{user.name}</span>
                <span className='Autofill'>Location:Noida</span>
                <span className='Autofill'>Department:BIS</span>
            </div>
            <div className='Maincontainer'>
                <div className='col-2 box bg-light' id='box2'>
                    <button className='btn btn-primary block bttn mb-2' type="submit"><a href='/Usser' className='text text-light text-decoration-none'>New Request</a></button>
                    <button className='btn btn-primary block bttn' style={{ backgroundColor: 'red', border: '1px solid red' }} type="submit"><a href="/Login" className='text text-light text-decoration-none'>Log Out</a></button>
                </div>


                <div className='col-1 box bg-light contact-list ' >
                    {/* <input
                    type="text"
                    placeholder="Search by any field"
                    onChange={(e) => setFilterText(e.target.value)}
                />*/}
                    <DataTable
                        columns={columns}
                        data={contacts}
                        customStyles={customStyles}
                        pagination />
                </div>



            </div>
        </>
    );
}

export default Admin;





/****import React, { useEffect, useState } from 'react';
import './Admin.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FaPenToSquare } from 'react-icons/fa6'
//import CircleLoader from 'react-spinners/CircleLoader'

const customStyles = {
    headCells: {
        style: {
            fontSize: 15 + "px",
            fontWeight: 600,
        },
    },
    cells: {
        style: {
            fontSize: 13 + "px",
            fontWeight: 500,
        },
    },
};



const handleStatusChange = async (e, row) => {
    try {
        const updatedRow = { ...row, Status: e.target.value };
        await axios.put(`http://127.0.0.1:3000/contactmsyt/records/${row._id}`, updatedRow) // Assuming the endpoint for updating the record is '/api/records/:id'
            // Handle successful update
            .then((res) => {
                if (res.data.success) {
                    console.log("updated");
                }
            }).catch(error)
        // Handle error
        console.log(err);

    }
catch(error){
    console.log(error)
}};

function Admin() {
    const [contacts, setContacts] = useState([])
    // const [loading, setLoading] = useState(false)
    /* const handleEdit = (id) => {
      // Implement edit functionality based on the cell's value
      console.log('Editing row with ID:', id);
    };*/
/****const columns = [
    {
        name: "_id",
        selector: (row) => row._id
    },
    {
        name: "Dropdown",
        selector: (row) => row.Dropdown
    },
    {
        name: "DifferentSoft",

        selector: (row) => row.DifferentSoft
    },
    {
        name: "Purpose",
        selector: (row) => row.Purpose
    },
    {
        name: "Hostname",
        selector: (row) => row.Hostname
    },
    {
        name: "Remark",
        selector: (row) => row.Remark
    },
    {
        /* name:"Status",
         selector:(row)=>row.Status*/
/****  name: "Status",
 cell: (row) => (
     <select value={row.Status} onChange={(e) => handleStatusChange(e, row)}>
         <option value="pending">Pending</option>
         <option value="approved">Approved</option>
         <option value="rejected">Rejected</option>
     </select>
 )
},
/*{
 name:"Action",
 selector:(row)=><>
 <FaPenToSquare className='table-icon1'>
 </FaPenToSquare>
{/* <aPenTrashCan className='table-icon2'/>*///}
//</>
//},


///***** */ ]
/* useEffect(()=>{
     axios.get('http://127.0.0.1:3000/contactmsyt/installreqs'
             headers: {                                                      //
                 Authorization: `Berear ${localStorage.getItem('token')}`       //
             }
         )
             .then((res) => {
                 if (res.data.success) {
                     
                 setContacts(res.data.contacts)
                     
                 }
             })
         
             .catch((err) => {
                 console.log(err);
 
             });
     
 },[])*/

/*useEffect(() => {
    // setLoading(true)
    fetch('http://127.0.0.1:3000/contactmsyt/contacts')
        .then(response => response.json())
        .then(data => setContacts(data))
        // setLoading(false)
        .catch(error => console.error('Error fetching records: ', error)
            //setLoading(false)
        );

}, []);
const { user } = useContext(UserContext);
const navigate = useNavigate();
/*const handlerSubmit = () => {
    navigate("/Usser");
}*/
/***return (

     <>
         <Header />

         <div className='bg-light' style={{ border: '2px solid black', margin: '5px', background: 'white', borderRadius: '5px', marginTop: '5px' }}>
             <span className='Autofill'>Name:</span>
             <span className='Autofill'>Location:Noida</span>
             <span className='Autofill'>Department:BIS</span>
         </div>
         <div className='Maincontainer'>
             <div className='col-2 box bg-light' id='box2'>
                 <button className='btn btn-primary block bttn mb-2' type="submit"><a href='/Usser' className='text text-light text-decoration-none'>New Request</a></button>
                 {/*} <button className='btn btn-primary block bttn mb-2' type="submit"><a href="/Admin" className='text text-light text-decoration-none'>Admin Dashboard</a></button>
                 <button className='btn btn-primary block bttn mb-2' type="submit"><a href="#" className='text text-light text-decoration-none'>Update Software List</a></button>*/       //***}
/*****   <button className='btn btn-primary block bttn' style={{ backgroundColor: 'red', border: '1px solid red' }} type="submit"><a href="/Login" className='text text-light text-decoration-none'>Log Out</a></button>
</div>

{/* {
loading ? (
  <div className='loader'>
<CircleLoader
loading = {loading}
size={50}
aria-label="Loading Spinner"
data-testid="loader"/></div>)
:
(          *///}
/***  <div className='col-1 box bg-light contact-list ' > {/*needs-validation*/    //***}
/***<DataTable
    columns={columns}
    data={contacts}
    customStyles={customStyles}
    //CustomCell value={yourValue} onEdit={handleEdit}
    pagination />
{/*{length.contacts === 0 ? <h1>Add a Request</h1> : <></>}*/    //***}
///*** </div>

{/*)}*/ }



/*** </div>
</>
);
}

export default Admin;***/

