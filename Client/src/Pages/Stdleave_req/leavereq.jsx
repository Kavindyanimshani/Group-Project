import React, { useState } from 'react';
import './leavereq.css';
import Student_head from '../../Component/Student_head/sthead';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/send';

const LeaveReq = () => {
    const [formValues, setFormValues] = useState({
        studentID: '',
        StudentName: '',
        CourseName: '',
        HeadOfDepartment: '',
        LeaveDuration: '',
        ReasonForLeave: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/leavereq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const result = await response.json(); // Parse the JSON response

            if (!response.ok) {
                throw new Error(result.error || 'Failed to save the leave request data.');
            }

            console.log('Leave request data saved successfully:', result);
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <Student_head />
            <div className='leavereq-big-rect1'>
                <div>
                    <h2 className='leavereq-top-head1'>Apply Leave Request!</h2>
                </div>
                <div className='leavereq-big-main-rect1'>
                    <div className='leavereq-sub-main-rect1'>
                        <div className='leavereq-main-txt-rec'>
                            <div>
                                <h2 className='leavereq-rect-topic'>Student ID:</h2>
                            </div>
                            <div className='leavereq-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex', 
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="studentID" label="Your student ID" variant="filled" value={formValues.studentID} onChange={handleInputChange} />

                                </Box>
                            </div>
                        </div>
                        <div className='leavereq-main-txt-rec'>
                            <div>
                                <h2 className='leavereq-rect-topic'>Student Name:</h2>
                            </div>
                            <div className='leavereq-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex', 
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="StudentName" label="Your Name" variant="filled" value={formValues.StudentName} onChange={handleInputChange} />

                                </Box>
                            </div>
                        </div>
                        <div className='leavereq-main-txt-rec'>
                            <div>
                                <h2 className='leavereq-rect-topic'>Course Name:</h2>
                            </div>
                            <div className='leavereq-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex', 
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="CourseName" label="Your course name" variant="filled" value={formValues.CourseName} onChange={handleInputChange} />

                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className='leavereq-sub-main-rect2'>
                        <div className='leavereq-main-txt-rec'>
                            <div>
                                <h2 className='leavereq-rect-topic'>Head Of Department:</h2>
                            </div>
                            <div className='leavereq-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex', 
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="HeadOfDepartment" label="Your department head name" variant="filled" value={formValues.HeadOfDepartment} onChange={handleInputChange} />

                                </Box>
                            </div>
                        </div>
                        <div className='leavereq-main-txt-rec'>
                            <div>
                                <h2 className='leavereq-rect-topic'>Leave Duration:</h2>
                            </div>
                            <div className='leavereq-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex', 
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="LeaveDuration" label="Leave duration" variant="filled" value={formValues.LeaveDuration} onChange={handleInputChange} />

                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className='leavereq-sub-main-rect3'>
                        <div>
                            <h2 className='leavereq-rect-topic1'>Reason For Leave:</h2>
                        </div>
                        <div className='leavereq-first-txt-rec'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '116.5ch', borderRadius: 20 },
                                    display: 'flex', 
                                    alignItems: 'end',
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="ReasonForLeave" label="Reason for leave request" variant="filled" value={formValues.ReasonForLeave} onChange={handleInputChange} />

                            </Box>
                        </div>
                    </div>
                    <div className='leavereq-send-btn'>
                        <Stack direction="row" spacing={4}>
                            <Button variant="contained" endIcon={<SaveIcon />} className='edit-btn-min' style={{ width: '70%', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }} onClick={handleSubmit}>
                                Send
                            </Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveReq;
