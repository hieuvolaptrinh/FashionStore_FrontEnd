import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface TableRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country?: string;
  zip?: string;
  status?: string;
}

const Tables: React.FC = () => {
  const tableData: TableRow[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'jhon@email.com' },
    { id: 2, firstName: 'Mark', lastName: 'Otto', email: 'mark@email.com' },
    { id: 3, firstName: 'Jacob', lastName: 'Thornton', email: 'jacob@email.com' },
  ];

  const responsiveTableData: TableRow[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'jhon@email.com', country: 'USA', zip: '123', status: 'Member' },
    { id: 2, firstName: 'Mark', lastName: 'Otto', email: 'mark@email.com', country: 'UK', zip: '456', status: 'Member' },
    { id: 3, firstName: 'Jacob', lastName: 'Thornton', email: 'jacob@email.com', country: 'AU', zip: '789', status: 'Member' },
  ];

  const tableTypes = [
    { title: 'Basic Table', className: 'table' },
    { title: 'Accented Table', className: 'table table-striped' },
    { title: 'Hoverable Table', className: 'table table-hover' },
    { title: 'Color Table', className: 'table table-dark' },
    { title: 'Bordered Table', className: 'table table-bordered' },
    { title: 'Table Without Border', className: 'table table-borderless' },
  ];

  return (
    <Container fluid>
      <Row className="g-4">
        {tableTypes.map((table, index) => (
          <Col sm={12} xl={6} key={index}>
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">{table.title}</h6>
              <table className={table.className}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id}>
                      <th scope="row">{row.id}</th>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        ))}
        <Col sm={12}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Responsive Table</h6>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Country</th>
                    <th scope="col">ZIP</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {responsiveTableData.map((row) => (
                    <tr key={row.id}>
                      <th scope="row">{row.id}</th>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.email}</td>
                      <td>{row.country}</td>
                      <td>{row.zip}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Tables;