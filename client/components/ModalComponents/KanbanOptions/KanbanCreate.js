import React, { useContext, useRef, useState } from "react";
import {
  Modal,
  OverlayTrigger,
  Tooltip,
  Form,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

import { Formik } from "formik";
import Select from "react-select";
import { newTaskSchema } from "../validationSchema/newTask";

import { adminService } from "../../../service/adminService";
import { AuthContext } from "../../../context";
import CustomInput from "../../InputCustom";
import ReactDatePicker from "react-datepicker";

const importanceLevel = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
const observable = [
  { label: "Private", value: "private" },
  { label: "Public", value: "public" },
];

function KanbanCreate({ id }) {
  const { postTask} = adminService();
  const createTemplate = useRef(null);
  const state = useContext(AuthContext);
  const [callback, setCallback] = state.User.callback;

  const [newTaskModal, setNewTaskModal] = useState(false);
  const [importanceStatus, setImportanceStatus] = useState({
    label: "Low",
    value: "low",
  });

  const [observableStatus, setObservableStatus] = useState({
    label: "Private",
    value: "private",
  });
  /* Date */
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => {
    setNewTaskModal(false);
  };
  const onSubmit = async (values) => {
    const { subject, description } = values;

    const body = {
      collaborator_id: id,
      subject: subject,
      description: description,
      importanceLevel: importanceStatus.value,
      observable: observableStatus.value,
      dateToComplete: startDate,
    };
    const res = await postTask(body);
    console.log(res)
    setNewTaskModal(false);
    setCallback(!callback);
  };

  return (
    <>
      <div
        onClick={() => setNewTaskModal(true)}
        className="container general_Top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          className="bi bi-plus-square-fill"
          viewBox="0 0 16 16"
          color="#1470E6"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
        </svg>
      </div>
      <Modal show={newTaskModal} onHide={handleClose}>
        <div ref={createTemplate}>
          <Formik
            /* enableReinitialize */
            initialValues={{
              subject: "",
              description: "",
            }}
            validationSchema={newTaskSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} id="formKanban">
                <Modal.Header closeButton>
                  <Modal.Title>Create a new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row className="mb-6">
                    <Col xs={12} lg={12} className="mb-4">
                      <label htmlFor="importanceLevel" className="form-label">
                        Importance level of this task
                      </label>
                      <Select
                        id="importanceLevel"
                        name="importanceLevel"
                        options={importanceLevel}
                        isSearchable={false}
                        getOptionLabel={(option) => option.label || ""}
                        getOptionValue={(option) => option.value || ""}
                        value={importanceStatus}
                        onChange={(selected) => setImportanceStatus(selected)}
                      />
                    </Col>

                    <Col xs={12} lg={12} className="mb-4">
                      <label
                        htmlFor="roleAccountDropDown"
                        className="form-label"
                      >
                        Will be This task only to me or both (collaborator and
                        me)?
                      </label>
                      <Select
                        id="roleAccountDropDown"
                        name="roleAccountDropDown"
                        options={observable}
                        isSearchable={false}
                        getOptionLabel={(option) => option.label || ""}
                        getOptionValue={(option) => option.value || ""}
                        value={observableStatus}
                        onChange={(selected) => setObservableStatus(selected)}
                      />
                    </Col>

                    <Col xs={12} md={12} aria-label="Name" className="mb-4">
                      <CustomInput
                        label="Title"
                        name="subject"
                        id="subject"
                        type="text"
                        placeholder="Title"
                        value={props.values.subject}
                        required
                      />
                    </Col>

                    <Col xs={12} md={12} aria-label="lastName" className="mb-4">
                      <CustomInput
                        label="Description"
                        name="description"
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={props.values.description}
                        required
                      />
                    </Col>

                    <Col xs={12} md={12} aria-label="lastName" className="mb-4">
                      <span>Date to Complete</span>
                      <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
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
          <Button type="submit" variant="primary" form="formKanban">
            Create task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default KanbanCreate;
