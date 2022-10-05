import React, { useRef, useState } from "react";
import {
  Modal,
  OverlayTrigger,
  Tooltip,
  Form,
  Button,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import { Formik } from "formik";
import TextAreaInput from "../TextAreaInput/TextAreaInput";

function DailyInfo({ item }) {
  const commentTemplate = useRef(null);
  const [commentModal, setCommentModal] = useState(false);

  const handleClose = () => {
    setCommentModal(false);
  };

  const onSubmit = async (values) => {
    const { email, lastName, name, occupation } = values;

    const body = {};
    /*         const res = await registerNewUser(body);
        setNewCollaboratorModal(false);
        setCallback(!callback); */
  };
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id={`tooltip-bottom`}>
            <strong>Daily information</strong>.
          </Tooltip>
        }
      >
        <svg
          onClick={() => setCommentModal(true)}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-file-earmark-spreadsheet-fill"
          viewBox="0 0 16 16"
          type="submit"
        >
          <path d="M6 12v-2h3v2H6z" />
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z" />
        </svg>
      </OverlayTrigger>

      <Modal show={commentModal} onHide={handleClose}>
        <div ref={commentTemplate}>
          <Formik
            initialValues={{
              name: item.name,
              lastName: item.lastName,
              email: item.email,
              occupation: item.occupation,
            }}
            /*  validationSchema={newCollaboratorSchema} */
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} id="formTemplateComment">
                <Modal.Header closeButton>
                  <Modal.Title>
                    Daily observation {item.name} {item.lastName}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                    </tbody>
                  </Table>

                  <Row className="mb-6">
                    <Col xs={12} md={12} aria-label="lastName" className="mb-4">
                      <TextAreaInput
                        label="Last Name"
                        name="lastName"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={props.values.lastName}
                        required
                      />
                    </Col>
                  </Row>
                </Modal.Body>
              </Form>
            )}
          </Formik>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" form="formTemplateComment">
            Create Comment
          </Button>
          <Button type="submit" variant="danger" form="formTemplateComment">
            Export to CSV
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DailyInfo;
