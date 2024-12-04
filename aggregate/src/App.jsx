import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Table, DarkThemeToggle, Flowbite } from 'flowbite-react';

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        console.log('Données reçues :', response.data);
        setStudents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };
    fetchStudents();
  }, []);

  return (
      <>
        <Navbar fluid rounded>
          <Navbar.Brand href="#">
            <img src="/image.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Aggregation
          </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse></Navbar.Collapse>
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
        </Navbar>

        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Nom</Table.HeadCell>
            <Table.HeadCell>Prénom</Table.HeadCell>
            <Table.HeadCell>Religion</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Modifier</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {students.map((student, index) => (
                <Table.Row
                    key={`student-${index}-${student.student_id || ''}`}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {student.student_id || 'N/A'}
                  </Table.Cell>
                  <Table.Cell>{student.student_nom || 'N/A'}</Table.Cell>
                  <Table.Cell>{student.student_prenom || 'N/A'}</Table.Cell>
                  <Table.Cell>{student.religion || 'N/A'}</Table.Cell>
                  <Table.Cell>
                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
  );
};

export default App;

