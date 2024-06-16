import React, { useState, useEffect } from 'react';
import './leavereq.css';
import Head from '../../Component/Head/head';
import { styled, alpha } from '@mui/material/styles';
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

const LeaveReq = () => {
    const [rows, setRows] = useState([]);
    const [openDetails, setOpenDetails] = useState({});

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/leavereq');
            const data = await response.json();
            setRows(data);
        } catch (error) {
            console.error('Error fetching leave request data:', error);
        }
    };

    const handleOpenDetails = (rowId) => {
        setOpenDetails({ ...openDetails, [rowId]: !openDetails[rowId] });
    };

    const handleReject = async (studentID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/leavereq/${studentID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Leave request deleted successfully.');
                // Update frontend state to remove the deleted row
                setRows(rows.filter(row => row.StudentID !== studentID));
            } else {
                console.error('Failed to delete leave request.');
            }
        } catch (error) {
            console.error('Error deleting leave request:', error);
        }
    };

    return (
        <div>
            <Head />
            <div className='leavereq-main-big-big-rect'>
                <div>
                    <h2 className='leavereq-big-main-rect-topic'>Welcome to Student Leave Request!</h2>
                </div>
                <div className='leavereq-mid-big-rect'>
                    <div>
                        <h2 className='leavereq-big-mid-rect-topic'>Student Leave Request</h2>
                    </div>
                    <div className='leavereq-main-table-rect'>
                        <div className='leavereq-std-table-rect'>
                            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">ID</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Course Name</StyledTableCell>
                                            <StyledTableCell align="center">Reason</StyledTableCell>
                                            <StyledTableCell align="center">Contact Number</StyledTableCell>
                                            <StyledTableCell align="center">Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <React.Fragment key={row.StudentID}>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">{row.StudentID}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.StudentName}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.CourseName}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{ backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                                            onClick={() => handleOpenDetails(row.StudentID)}
                                                        >
                                                            {openDetails[row.StudentID] ? 'Hide Details' : 'View'}
                                                        </Button>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{row.HeadOfDepartment}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Button variant="contained" size="small" sx={{ mr: 1, backgroundColor: 'rgb(0, 230, 58)', color: 'white', ':hover': { backgroundColor: 'rgb(0, 130, 33)' } }}>
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            color="error"
                                                            sx={{ ':hover': { backgroundColor: 'darkred' } }}
                                                            onClick={() => handleReject(row.StudentID)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                {openDetails[row.StudentID] && (
                                                    <TableRow>
                                                        <StyledTableCell colSpan={6}>
                                                            <p>{row.ReasonForLeave}</p>
                                                            <p>{row.LeaveDuration}</p>
                                                        </StyledTableCell>
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeaveReq;
