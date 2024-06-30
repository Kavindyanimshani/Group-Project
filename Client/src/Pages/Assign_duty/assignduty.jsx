import React, { useState, useEffect } from 'react';
import './assignduty.css';
import Head from '../../Component/Head/head';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderRadius: theme.shape.borderRadius,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const AssignDuty = () => {
    const [studentId, setStudentId] = useState('');
    const [place, setPlace] = useState('');
    const [unmatchedStudents, setUnmatchedStudents] = useState([]);
    const [assignedWork, setAssignedWork] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
        fetchAssignedWork();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/unmatched_students');
            const data = await response.json();
            setUnmatchedStudents(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            alert(`Error fetching data: ${error.message}`);
        }
    };

    const fetchAssignedWork = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/assigned_work');
            const data = await response.json();
            setAssignedWork(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            alert(`Error fetching data: ${error.message}`);
        }
    };

    const handleStudentIdChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setStudentId(value);
        }
    };

    const handlePlaceChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setPlace(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!place) {
            alert('Place cannot be empty and must contain only letters.');
            return;
        }

        try {
            const url = editMode ? `http://localhost:5000/api/update_work/${editId}` : 'http://localhost:5000/api/add_work';
            const method = editMode ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ StudentID: studentId, Place: place }),
            });

            if (response.ok) {
                alert(`Work ${editMode ? 'updated' : 'added'} successfully`);
                setStudentId('');
                setPlace('');
                fetchData();
                fetchAssignedWork();
                setEditMode(false);
                setEditId(null);
            } else {
                const errorData = await response.json();
                console.error(`Error ${editMode ? 'updating' : 'adding'} work:`, errorData.message);
                alert(`Error ${editMode ? 'updating' : 'adding'} work: ${errorData.message}`);
            }
        } catch (error) {
            console.error(`Error ${editMode ? 'updating' : 'adding'} work:`, error.message);
            alert(`Error ${editMode ? 'updating' : 'adding'} work: ${error.message}`);
        }
    };

    const handleEdit = (work) => {
        setStudentId(work.StudentID);
        setPlace(work.Place);
        setEditMode(true);
        setEditId(work.id);
    };

    return (
        <div>
            <Head />
            <div className='asduty-big-rect8'>
                <div>
                    <h2 className='asduty-top-head8'>Welcome To Duty Assign!</h2>
                </div>

                <div className='asduty-xs-add-sub7'>
                    <div>
                        <h2 className='asduty-top-head8'>{editMode ? 'Edit Work' : 'Add Work'}</h2>
                    </div>
                    <div>
                        <h2 className='available-std-txt-topic'>Student ID </h2>
                    </div>
                    <div className='btn-btn shared-box-width'>
                        <Box
                            component="form"
                            sx={{
                                marginTop: -1,
                                backgroundColor: 'rgb(188, 187, 187)',
                                borderRadius: 2,
                                '& > :not(style)': { m: 1, width: '90%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="studentId"
                                label="Enter student ID"
                                variant="standard"
                                value={studentId}
                                onChange={handleStudentIdChange}
                            />
                        </Box>
                    </div>
                    <div>
                        <h2 className='available-std-txt-topic'>Place / Work</h2>
                    </div>
                    <div>
                        <Box
                            component="form"
                            sx={{
                                marginTop: -1,
                                backgroundColor: 'rgb(188, 187, 187)',
                                borderRadius: 2,
                                '& > :not(style)': { m: 1, width: '97%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="place"
                                label="What is the place & work?"
                                variant="standard"
                                value={place}
                                onChange={handlePlaceChange}
                            />
                        </Box>
                    </div>
                    <div>
                        <div className='asduty-add-save-btn7'>
                            <Stack direction="row" spacing={4}>
                                <Button
                                    variant="contained"
                                    endIcon={<SaveIcon />}
                                    className='edit-btn-min4'
                                    style={{ width: '100%', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                    onClick={handleSubmit}
                                >
                                    {editMode ? 'Update' : 'Save'}
                                </Button>
                            </Stack>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className='available-std'>Available Students</h2>
                </div>

                <div className='asduty-std-table-rect'>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">ID</StyledTableCell>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Course Name</StyledTableCell>
                                    <StyledTableCell align="center">Phone Number</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unmatchedStudents.map((student) => (
                                    <StyledTableRow key={student.studentId}>
                                        <StyledTableCell align="center">{student.studentId}</StyledTableCell>
                                        <StyledTableCell align="center">{`${student.firstName} ${student.lastName}`}</StyledTableCell>
                                        <StyledTableCell align="center">{student.courseName}</StyledTableCell>
                                        <StyledTableCell align="center">{student.phoneNumber}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div>
                    <h2 className='available-std'>Assigned Work</h2>
                </div>

                <div className='asduty-std-table-rect'>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">ID</StyledTableCell>
                                    <StyledTableCell align="center">Student ID</StyledTableCell>
                                    <StyledTableCell align="center">Place</StyledTableCell>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assignedWork.map((work) => (
                                    <StyledTableRow key={work.id}>
                                        <StyledTableCell align="center">{work.id}</StyledTableCell>
                                        <StyledTableCell align="center">{work.StudentID}</StyledTableCell>
                                        <StyledTableCell align="center">{work.Place}</StyledTableCell>
                                        <StyledTableCell align="center">{`${work.firstName} ${work.lastName}`}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                variant="contained"
                                                endIcon={<EditIcon />}
                                                onClick={() => handleEdit(work)}
                                            >
                                                Edit
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default AssignDuty;
