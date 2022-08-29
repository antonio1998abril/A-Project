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
import { Formik } from "formik";
import Select from "react-select";
import { newCollaboratorSchema } from "../validationSchema/newCollaborator";
import CustomInput from "../../InputCustom/index";
import { adminService } from "../../../service/adminService";
import { AuthContext } from "../../../context";


const accountOptions = [
  { label: "Yes", value: "public" },
  { label: "No", value: "private" },
];
const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Manager", value: "Manager" },
  { label: "Collaborator", value: "Collaborator" },
];


function NewCollaboratorButton() {
  const { registerNewUser } = adminService();
  const updateTemplate = useRef(null);
  const state = useContext(AuthContext);
  const [callback, setCallback] = state.User.callback;
  const [isAdmin] = state.User.isAdmin;

  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);



  const [newCollaboratorModal, setNewCollaboratorModal] = useState(false);
  const [accountStatus, setAccountStatus] = useState({
    label: "No",
    value: "private",
  });

  const [role, setRole] = useState({
    label: "Collaborator",
    value: "Collaborator",
  });

  const handleClose = () => {
    setNewCollaboratorModal(false);
  };
  const onSubmit = async (values) => {
    const { email, lastName, name, occupation } = values;

    const body = {
      email: email,
      lastName: lastName,
      name: name,
      occupation: occupation,
      status: accountStatus.value,
      role: role.value,
    };
    const res = await registerNewUser(body);
    setNewCollaboratorModal(false);
    setCallback(!callback);
  };
  return (
    <>
      <div
        onClick={() => setNewCollaboratorModal(true)}
        className="container general_Top"
      >
        <div className="open_icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.31 28.83">
            <path
              className="plus_sign"
              d="M20.74,20.83V9.59H27.2V20.83h11v6.28h-11v11.3H20.74V27.11H9.85V20.83h10.9Z"
              transform="translate(-9.85 -9.59)"
            />
          </svg>
        </div>
      </div>

      <Modal show={newCollaboratorModal} onHide={handleClose}>
        <div ref={updateTemplate}>
          <Formik
            /* enableReinitialize */
            initialValues={{
              name: "",
              lastName: "",
              email: "",
              occupation: "",
            }}
            validationSchema={newCollaboratorSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} id="formTemplate">
                <Modal.Header closeButton>
                  <Modal.Title>Create a new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row className="mb-6">
                    <Col xs={12} lg={12} className="mb-4">
                      <label
                        htmlFor="blockAccountDropDown"
                        className="form-label"
                      >
                        This account will be private or public?
                      </label>
                      <Select
                        id="blockAccountDropDown"
                        name="blockAccountDropDown"
                        options={accountOptions}
                        isSearchable={false}
                        getOptionLabel={(option) => option.label || ""}
                        getOptionValue={(option) => option.value || ""}
                        value={accountStatus}
                        onChange={(selected) => setAccountStatus(selected)}
                      />
                    </Col>
                    {isAdmin && (
                      <Col xs={12} lg={12} className="mb-4">
                        <label
                          htmlFor="roleAccountDropDown"
                          className="form-label"
                        >
                          Choose the User role
                        </label>
                        <Select
                          id="roleAccountDropDown"
                          name="roleAccountDropDown"
                          options={roleOptions}
                          isSearchable={false}
                          getOptionLabel={(option) => option.label || ""}
                          getOptionValue={(option) => option.value || ""}
                          value={role}
                          onChange={(selected) => setRole(selected)}
                        />
                      </Col>
                    )}

                    <Col xs={12} md={12} aria-label="Name" className="mb-4">
                      <CustomInput
                        label="Name"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={props.values.name}
                        required
                      />
                    </Col>

                    <Col xs={12} md={12} aria-label="lastName" className="mb-4">
                      <CustomInput
                        label="Last Name"
                        name="lastName"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={props.values.lastName}
                        required
                      />
                    </Col>

                    <Col xs={12} md={12} aria-label="email" className="mb-4">
                      <CustomInput
                        label="Email"
                        name="email"
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={props.values.email}
                        required
                      />
                    </Col>

                    <Col
                      xs={12}
                      md={12}
                      aria-label="occupation"
                      className="mb-4"
                    >
                      <CustomInput
                        label="Occupation"
                        name="occupation"
                        id="occupation"
                        type="text"
                        placeholder="Occupation"
                        value={props.values.occupation}
                        required
                      />
                    </Col>
                  </Row>

                  <input
                    type="file"
                    name="file"
                    id="file_up" /* onChange={handleUpload} */
                  ></input>
                  {loading ? (
                    <div id="file_img"></div>
                  ) : (
                    <div id="file_img" /* style={styleUpload} */>
                      <img src={images ? images.url : ""} alt=""></img>
                      {/*  <span onClick={handleDestroy}>X</span> */}
                    </div>
                  )}
                </Modal.Body>
              </Form>
            )}
          </Formik>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" form="formTemplate">
            Create user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewCollaboratorButton;
