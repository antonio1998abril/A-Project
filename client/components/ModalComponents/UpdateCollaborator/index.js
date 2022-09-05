import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
  OverlayTrigger,
  Tooltip,
  Form,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import Image from "next/image";
import { Formik } from "formik";
import Select from "react-select";
import { AuthContext } from "../../../context";
import { newCollaboratorSchema } from "../validationSchema/newCollaborator";
import CustomInput from "../../InputCustom/index";
import { adminService } from "../../../service/adminService";
import Back from "../../../public/fondo2.jpg";
import Loading from "../../Loading";

const accountOptions = [
  { label: "Yes", value: "public" },
  { label: "No", value: "private" },
];
const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Manager", value: "Manager" },
  { label: "Collaborator", value: "Collaborator" },
];

function UpdateUser({ item }) {
  const updateTemplate = useRef(null);
  const state = useContext(AuthContext);
  const { updateUser } = adminService();
  const [updateCollaboratorModal, setUpdateCollaboratorModal] = useState(false);

  const [callback, setCallback] = state.User.callback;
  const [isAdmin] = state.User.isAdmin;
  const [id, setId] = useState("");

  /* iMAGES */
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState("");
  const [imagesId, setImagesId] = useState("");
  /* iMAGES */

  const [accountStatus, setAccountStatus] = useState({
    label: "No",
    value: "private",
  });

  const [role, setRole] = useState({
    label: "Collaborator",
    value: "Collaborator",
  });

  const handleClose = () => {
    setUpdateCollaboratorModal(false);
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
      userImage: {
        public_id: imagesId,
        url: imagesUrl,
      },
    };
    const res = await updateUser(id, body);
    setCallback(!callback);
    setUpdateCollaboratorModal(false);
  };

  useEffect(() => {
    if (item.role === "Admin") setRole({ label: "Admin", value: "Admin" });
    if (item.role === "Manager")
      setRole({ label: "Manager", value: "Manager" });
    if (item.role === "Collaborator")
      setRole({ label: "Collaborator", value: "Collaborator" });
    setId(item._id);
    if (item.status === "public") {
      setAccountStatus({ label: "Yes", value: "public" });
    }
  }, []);

  /* IMAGE */
  const styleUpload = {
    display: imagesUrl ? "block" : "none",
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert("file not exist");

      if (file.size > 1024 * 1024) return alert("File not exist");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect");
      setLoading(true);
      let formData = new FormData();
      formData.append("file", file);
      const res = await uploadFile(formData);
      setLoading(false);
      setImagesUrl(res.data.url);
      setImagesId(res.data.public_id);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleDestroy = async () => {
    try {
      setLoading(true);
      const res = await deleteFile({ public_id: imagesId });
      setLoading(false);
      setImagesUrl("");
      setImagesId("");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  /* IMAGE */

  return (
    <>
      <svg
        onClick={() => setUpdateCollaboratorModal(true)}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-pencil-square"
        viewBox="0 0 16 16"
        type="submit"
      >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path
          fillRule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        />
      </svg>

      <Modal show={updateCollaboratorModal} onHide={handleClose}>
        <div ref={updateTemplate}>
          <Formik
            enableReinitialize
            initialValues={{
              name: item.name,
              lastName: item.lastName,
              email: item.email,
              occupation: item.occupation,
            }}
            validationSchema={newCollaboratorSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} id="formTemplate">
                <Modal.Header closeButton>
                  <Modal.Title>
                    Update info of {item.name} {item.lastName}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="imageTitle">Select a image: </div>
                  <div className="upload">
                    <input
                      required
                      type="file"
                      name="file"
                      id="file_up"
                      onChange={handleUpload}
                    ></input>

                    {loading ? (
                      <div id="file_Loader">
                        {" "}
                        <Loading />{" "}
                      </div>
                    ) : (
                      <div id="file_img" style={styleUpload}>
                        <Image
                          src={imagesUrl ? imagesUrl : Back}
                          width={500}
                          height={400}
                          alt="Pro_Image"
                        />

                        <span id="file_img_delete" onClick={handleDestroy}>
                          X
                        </span>
                      </div>
                    )}
                  </div>
                  <Row className="mb-6">
                    <Col xs={12} lg={12} className="mb-4">
                      <label
                        htmlFor="blockAccountDropDown"
                        className="form-label"
                      >
                        This account will be public?
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
            Update user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUser;
