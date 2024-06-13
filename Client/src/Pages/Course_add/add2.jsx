import React, { useState } from 'react';
import './add2.css';
import Head from '../../Component/Head/head';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

const Add2 = () => {
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [moduleCoordinatorName, setModuleCoordinatorName] = useState('');
    const [coordinatorPhoneNumber, setCoordinatorPhoneNumber] = useState('');
    const [noOfStudent, setNoOfStudent] = useState('');
    const [courseDuration, setCourseDuration] = useState('');
    const [descriptionOfCourse, setDescriptionOfCourse] = useState('');

    const handleCourseIdChange = (e) => setCourseId(e.target.value.toUpperCase());
    const handleCourseNameChange = (e) => setCourseName(e.target.value);
    const handleModuleCoordinatorNameChange = (e) => setModuleCoordinatorName(e.target.value);
    const handleCoordinatorPhoneNumberChange = (e) => setCoordinatorPhoneNumber(e.target.value);
    const handleNoOfStudentChange = (e) => setNoOfStudent(e.target.value);
    const handleCourseDurationChange = (e) => setCourseDuration(e.target.value);
    const handleDescriptionChange = (e) => setDescriptionOfCourse(e.target.value);

    const handleSubmit = async () => {
        const courseData = {
            courseId,
            courseName,
            moduleCoordinatorName,
            coordinatorPhoneNumber,
            noOfStudent,
            courseDuration,
            descriptionOfCourse,
        };

        try {
            const response = await fetch('http://localhost:5000/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData),
            });

            const responseData = await response.json();
            
            if (response.ok) {
                console.log('Course added successfully');
                alert('Course added successfully');
                // Reset form fields
                setCourseId('');
                setCourseName('');
                setModuleCoordinatorName('');
                setCoordinatorPhoneNumber('');
                setNoOfStudent('');
                setCourseDuration('');
                setDescriptionOfCourse('');
            } else {
                console.error('Error adding course:', responseData.error);
                alert('Error adding course: ' + responseData.error);
            }
        } catch (error) {
            console.error('Error adding course:', error.message);
            alert('Error adding course: ' + error.message);
        }
    };

    return (
        <div>
            <Head />
            <div className='big-rect9'>
                <div>
                    <h2 className='top-head9'>Add Course!</h2>
                </div>
                <div className='std-info-rect9'>
                    <div>
                        <h2 className='add-top-head9'>Course Information!</h2>
                    </div>
                    <div className='xs-add-main-info-rect9'>
                        <div className='xs-add-sub9'>
                            <div>
                                <Box
                                    component="form"
                                    sx={{ marginTop: 7, backgroundColor: 'rgb(188, 187, 187)', borderRadius: 4, '& > :not(style)': { m: 1, width: '90%' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="courseId" label="Course ID" variant="standard" value={courseId} onChange={handleCourseIdChange} />
                                </Box>
                            </div>
                            <div>
                                <Box
                                    component="form"
                                    sx={{ marginTop: 7, backgroundColor: 'rgb(188, 187, 187)', borderRadius: 4, '& > :not(style)': { m: 1, width: '90%' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="coordinatorPhoneNumber" label="Coordinator Phone Number" variant="standard" value={coordinatorPhoneNumber} onChange={handleCoordinatorPhoneNumberChange} />
                                </Box>
                            </div>
                        </div>

                        <div className='xs-add-sub9'>
                            <div>
                                <Box
                                    component="form"
                                    sx={{ marginTop: 7, backgroundColor: 'rgb(188, 187, 187)', borderRadius: 4, '& > :not(style)': { m: 1, width: '90%' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="courseName" label="Course Name" variant="standard" value={courseName} onChange={handleCourseNameChange} />
                                </Box>
                            </div>
                            <div>
                                <Box
                                    component="form"
                                    sx={{ marginTop: 7, backgroundColor: 'rgb(188, 187, 187)', borderRadius: 4, '& > :not(style)': { m: 1, width: '90%' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="noOfStudent" label="No Of Student" variant="standard" value={noOfStudent} onChange={handleNoOfStudentChange} />
                                </Box>
                            </div>
                        </div>

                        <div className='xs-add-sub9'>
                            <div>
                                <Box
                                    component="form"
                                    sx={{ marginTop: 7, backgroundColor: 'rgb(188, 187, 187)', borderRadius: 4, '& > :not(style)': { m: 1, width: '90%' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="moduleCoordinatorName" label="Module Coordinator Name" variant="standard" value={moduleCoordinatorName} onChange={handleModuleCoordinatorNameChange} />
                                </Box>
                            </div>
                            <div>
                                <Box
                                    component="form"
                                    sx={{ marginTop: 7, backgroundColor: 'rgb(188, 187, 187)', borderRadius: 4, '& > :not(style)': { m: 1, width: '90%' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="courseDuration" label="Course Duration" variant="standard" value={courseDuration} onChange={handleCourseDurationChange} />
                                </Box>
                            </div>
                        </div>
                    </div>

                    <div className='xs-add-des-info-rect9'>
                        <div>
                            <Box
                                component="form"
                                sx={{ backgroundColor: 'rgb(188, 187, 187)', borderRadius: 4, '& > :not(style)': { m: 1, width: '97%' } }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="descriptionOfCourse" label="Description Of Course" variant="standard" value={descriptionOfCourse} onChange={handleDescriptionChange} />
                            </Box>
                        </div>
                    </div>
                    <div className='add-save-btn'>
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                style={{ width: '70%', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add2;
