import React, { useState, useEffect } from 'react';
import './kitchen_duty.css';
import Head from '../../Component/Head/head';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const KitchenDuty = () => {
    const [formValues, setFormValues] = useState({
        firstStudentName: '',
        secondStudentName: '',
        thirdStudentName: '',
        fourthStudentName: '',
        fiveStudentName: '',
        firstStudentID: '',
        secondStudentID: '',
        thirdStudentID: '',
        fourthStudentID: '',
        fivethStudentID: '',
    });

    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/kitchen_duty');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let error = '';

        switch (id) {
            case 'firstStudentName':
            case 'secondStudentName':
            case 'thirdStudentName':
            case 'fourthStudentName':
            case 'fiveStudentName':
                if (/^[A-Za-z\s]*$/.test(value)) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only letters and spaces are allowed.';
                }
                break;
            case 'firstStudentID':
            case 'secondStudentID':
            case 'thirdStudentID':
            case 'fourthStudentID':
            case 'fivethStudentID':
                if (/^[A-Z0-9]*$/.test(value)) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only numbers and capital letters without spaces are allowed.';
                }
                break;
            default:
                setFormValues({ ...formValues, [id]: value });
                break;
        }

        setErrors({ ...errors, [id]: error });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/kitchen_duty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log('Kitchen duty data saved successfully:', result);
            fetchStudents(); // Fetch updated list of students
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/kitchen_duty/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            console.log('Kitchen duty data deleted successfully');
            fetchStudents(); // Fetch updated list of students
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <Head />
            <div className='kitchen_duty-big-rect3'>
                <div>
                    <h2 className='kitchen_duty-top-head3'>Student Kitchen Duty!</h2>
                </div>
                <div className='kitchen_duty-rect3'>
                    <div>
                        <h2 className='kitchen_duty-sub-top-head3'>Add student for kitchen duty!</h2>
                    </div>
                    <div className='xs-kitchen_duty-rect3'>
                        <div className='xs-kitchen_duty-sub3'>
                            {['first', 'second', 'third', 'fourth', 'five'].map((prefix, index) => (
                                <div key={index} className="form-group">
                                    <TextField
                                        id={`${prefix}StudentName`}
                                        label={`${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Student`}
                                        value={formValues[`${prefix}StudentName`]}
                                        onChange={handleInputChange}
                                        error={!!errors[`${prefix}StudentName`]}
                                        helperText={errors[`${prefix}StudentName`]}
                                        variant='outlined'
                                        sx={{ m: 1, width: '100%' }}
                                    />
                                    <TextField
                                        id={`${prefix}StudentID`}
                                        label={`${prefix.charAt(0).toUpperCase() + prefix.slice(1)} ID`}
                                        value={formValues[`${prefix}StudentID`]}
                                        onChange={handleInputChange}
                                        error={!!errors[`${prefix}StudentID`]}
                                        helperText={errors[`${prefix}StudentID`]}
                                        variant='outlined'
                                        sx={{ m: 1, width: '100%' }}
                                    />
                                </div>
                            ))}
                        </div>
                        <Box sx={{ m: 1, width: '25ch' }}>
                            <Stack direction='row' spacing={2}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={handleSubmit}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            </Stack>
                        </Box>
                    </div>
                    <div className='table-container'>
                        <h2>Assigned Students</h2>
                        <TableContainer component={Paper}>
                            <Table className='table' aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Student Name</TableCell>
                                        <TableCell>Student ID</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.firstStudentName}</TableCell>
                                            <TableCell>{student.firstStudentID}</TableCell>
                                            <TableCell>{student.secondStudentName}</TableCell>
                                            <TableCell>{student.secondStudentID}</TableCell>
                                            <TableCell>{student.thirdStudentName}</TableCell>
                                            <TableCell>{student.thirdStudentID}</TableCell>
                                            <TableCell>{student.fourthStudentName}</TableCell>
                                            <TableCell>{student.fourthStudentID}</TableCell>
                                            <TableCell>{student.fiveStudentName}</TableCell>
                                            <TableCell>{student.fivethStudentID}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant='contained'
                                                    className='delete-button'
                                                    onClick={() => handleDelete(student.id)}
                                                    startIcon={<DeleteIcon />}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KitchenDuty;
