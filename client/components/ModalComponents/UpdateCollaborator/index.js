import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { clientService } from "../../../service/clientService";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const { updateUser, uploadFile, deleteFile } = adminService();
  const { getManager, getTechLead } = clientService();
  const [updateCollaboratorModal, setUpdateCollaboratorModal] = useState(false);
  const [showAlert, setShowAlert] = state.User.alert;
  const [callback, setCallback] = state.User.callback;
  const [isAdmin] = state.User.isAdmin;
  const [id, setId] = useState("");
  const [itemsClients] = state.User.itemsClients
  /* iMAGES */
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState(item?.userImage?.url);
  const [imagesId, setImagesId] = useState("");
  /* iMAGES */
  const [enableManagerTechLeadHTML, setEnableManagerTechLeadHTML] =
    useState(false);
  const [hired, setHired] = useState(
    item?.hired ? new Date(item?.hired) : new Date()
  );
  const [birthDay, setBirthDay] = useState(
    item?.birthDay ? new Date(item?.birthDay) : new Date()
  );
  const [clientList, setClientList] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [techLeadList, setTeachLeadsList] = useState([]);

  const [accountStatus, setAccountStatus] = useState({
    label: "No",
    value: "private",
  });

  const [role, setRole] = useState({
    label: "Collaborator",
    value: "Collaborator",
  });

  const [clientStatusUpdate, setClientStatusUpdate] = useState({
    label: "N/A",
    value: null || "",
  });
  const [managerStatus, setManagerStatus] = useState({
    label: "N/A",
    value: "",
  });
  const [techLeadStatus, setTechLeadStatus] = useState({
    label: "N/A",
    value: "",
  });

  const handleClose = () => {
    setUpdateCollaboratorModal(false);
    if(item?.currentClient){
      handleList({ item });
    }
/*     setManagerStatus({ label: "N/A", value: "" });
    setTechLeadStatus({ label: "N/A", value: "" });
    setClientStatusUpdate({label: "N/A",
    value: ""}) */ 
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
      currentManager: managerStatus.value,
      currentTechLead: techLeadStatus.value,
      currentClient: clientStatusUpdate.value,
      birthDay: birthDay,
      hired: hired,
    };
    const res = await updateUser(id, body);
    if (res.status !== 200) {
      setShowAlert({
        status: true,
        message: "there was an error please try again!!!",
        type: "ERROR",
        duration: 3000,
        position: "top-right",
      });
    } else {
      setShowAlert({
        status: true,
        message: "User Updated",
        type: "SUCCESS",
        duration: 5000,
        position: "top-right",
      });
    }
    setUpdateCollaboratorModal(false);
    setCallback(!callback);
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

    if( clientStatusUpdate.value !== null){
      setEnableManagerTechLeadHTML(true);
      setManagerStatus({
        label: "N/A",
        value: "",
      });
      setTechLeadStatus({
        label: "N/A",
        value: "",
      });
    getDataTM(clientStatusUpdate.value);
}   

  }, [clientStatusUpdate]);

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
  const handleList = async ({ item }) => {
    try {

      if(item?.currentClient !== null) {
        const  setClientListToDropDown =itemsClients.find(
          (o) => o._id === item?.currentClient
        );
        setClientStatusUpdate({
          label: setClientListToDropDown?.name,
          value: item?.currentClient,
        });

        newData(item?.currentClient);
        setEnableManagerTechLeadHTML(true);
      }else {
        setClientStatusUpdate({value:null})
       
      }
      
     
  
  

      /*  setClientStatusUpdate({ label: setClientListToDropDown, value: item?.currentClient });  */

      
    } catch (err) {
      console.log(err);
    }
  };



  const newData = async (get) => {

    if (get !== null) {

      await getManager(get).then(async (response) => {
        const setClientListToDropDown = response?.data?.find(
          (o) => o._id === item?.currentManager 
        );
        setManagerStatus({
          label: setClientListToDropDown?.clientManagerName || "N/A",
          value: item?.currentManager || "",
        });

       

        setManagerList(
          response?.data?.map((item) => ({
            label:
              item?.clientManagerName + " " + item?.clientManagerLastName ||
              "N/A",
            value: item?._id || "",
          }))
        );
      });

      await getTechLead(get).then(async (response) => {
        const setTechLeadListToDropDown = response?.data?.find(
          (o) => o._id === item?.currentTechLead 
        );
        setTechLeadStatus({
          label:
            setTechLeadListToDropDown?.projectTechLeadName ||
            "N/A" + " " + setTechLeadListToDropDown?.projectTechLeadLastName ||
            "N/A",
          value: item?.currentTechLead || "",
        });

        setTeachLeadsList(
          response?.data?.map((item) => ({
            label: item?.projectTechLeadName || "N/A",
            value: item?._id || "",
          }))
        );
      });
    } 
  };

  const getDataTM = async (clientID) => {
console.log('selected',clientID)
console.log('type',typeof(clientID))

if(clientID !== ""){
    const resManager = await getManager(clientID);
    
    setManagerList(resManager?.data.map((item) => ({
      label:
        item?.clientManagerName + " " + item?.clientManagerLastName ||
        "N/A",
      value: item?._id || "",
    })));
 
    const resTechLead = await getTechLead(clientID);     setTeachLeadsList(resTechLead?.data.map((item) => ({
      label: item?.projectTechLeadName || "N/A",
      value: item?._id || "",
    })));
 

  }
  };

/* const changeData = useCallback(()=>{
  setClientStatusUpdate({value:item?.currentClient})
},[])
 */
  useEffect(() => {

/*     if(item?.currentClient != null){ */
  /*     setClientStatusUpdate({value:item?.currentClient}) */
  if(item?.currentClient){
    handleList({ item });
  }
      
      setClientList(
        itemsClients.map((item) => ({
          label: item?.name,
          value: item?._id,
        }))
      ); 


  /*   } else{
      getDataTM(clientStatusUpdate.value);
    } */
    
    
    
 
  }, []);

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id={`tooltip-bottom`}>
            <strong>Update information of {item.name}</strong>.
          </Tooltip>
        }
      >
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
      </OverlayTrigger>
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
            /* validationSchema={newCollaboratorSchema} */
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} id="formTemplateUpdateUser">
                <Modal.Header closeButton>
                  <Modal.Title>
                    Update info of {item.name} {item.lastName}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="imageTitle">Select a image: </div>
                  <div className="upload">
                    <input
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

                    <Col xs={12} md={12} aria-label="birthDay" className="mb-4">
                      <span>Birth Day</span>
                      <ReactDatePicker
                        selected={birthDay}
                        onChange={(date) => setBirthDay(date)}
                      />
                    </Col>

                    <Col xs={12} md={12} aria-label="hired" className="mb-4">
                      <span>Hired</span>
                      <ReactDatePicker
                        selected={hired}
                        onChange={(date) => setHired(date)}
                      />
                    </Col>

                    <Col xs={12} lg={12} className="mb-4">
                      <label htmlFor="client" className="form-label">
                        Current Client
                      </label>
                      <Select
                        id="client"
                        name="client"
                        options={clientList}
                        isSearchable={true}
                        getOptionLabel={(option) => option.label || "N/A"}
                        getOptionValue={(option) => option.value || ""}
                        value={clientStatusUpdate}
                        onChange={(selected) => setClientStatusUpdate(selected)}
                      />
                    </Col>

                    {clientStatusUpdate.label != "N/A" ? (
                      <>
                        <Col xs={12} lg={12} className="mb-4">
                          <label htmlFor="manager" className="form-label">
                            Current Manager
                          </label>
                          <Select
                            id="manager"
                            name="manager"
                            options={managerList}
                            isSearchable={true}
                            getOptionLabel={(option) => option.label || "N/A"}
                            getOptionValue={(option) => option.value || ""}
                            value={managerStatus}
                            onChange={(selected) => setManagerStatus(selected)}
                          />
                        </Col>

                        <Col xs={12} lg={12} className="mb-4">
                          <label htmlFor="techLead" className="form-label">
                            Current Tech Lead
                          </label>
                          <Select
                            id="techLead"
                            name="techLead"
                            options={techLeadList}
                            isSearchable={true}
                            getOptionLabel={(option) => option.label || "N/A"}
                            getOptionValue={(option) => option.value || ""}
                            value={techLeadStatus}
                            onChange={(selected) => setTechLeadStatus(selected)}
                          />
                        </Col>
                      </>
                    ) : null}
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
          <Button type="submit" variant="primary" form="formTemplateUpdateUser">
            Update user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUser;
