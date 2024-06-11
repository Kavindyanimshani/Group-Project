import React, { useState } from 'react';
import './assignduty.css';
import Head from '../../Component/Head/head';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

const AssignDuty = () => {
    const [studentId, setStudentId] = useState('');
    const [place, setPlace] = useState('');

    const handleStudentIdChange = (e) => {
        setStudentId(e.target.value);
    };

    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/add_work', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ StudentID: studentId, Place: place }),
            });
    
            if (response.ok) {
                alert('Work added successfully');
                setStudentId('');
                setPlace('');
            } else {
                const errorData = await response.json();
                console.error('Error adding work:', errorData.message);
                alert(`Error adding work: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error adding work:', error.message);
            alert(`Error adding work: ${error.message}`);
        }
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
                        <h2 className='asduty-top-head8'>Add work</h2>
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
                                    Save
                                </Button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignDuty;
