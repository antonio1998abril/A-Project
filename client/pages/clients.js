import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { AuthContext } from "../context/index";
import { useRouter } from "next/router";

import withAuth from "./HOC/withAuth.jsx";
import Image from "next/image";
import NewClientButton from "../components/ModalComponents/Client/newClient";
import ClientInfo from "../components/ModalComponents/Client/getClientInfo";
import { clientService } from "../service/clientService";

function Clients() {
  const state = useContext(AuthContext);
  const [callback, setCallback] = state.User.callback;
  const [infoModal, setInfoModal] = useState(false);
  const [itemMT, setItemMT] = useState();
  const [client, setClients] = useState([]);
  const { getClient } = clientService();

  const getClientsList = async () => {
    const res = await getClient();
    setClients(res.data);
  };

  const deleteClient = async() => {
    
  }

  useEffect(() => {
    getClientsList();
  }, [callback]);
  return (
    <>
      <br />
      <div className="content-wrap">
        <NewClientButton />
        <br />
        <div className="gridClient">
          {client?.map((item) => {
            return (
              <div key={item._id}>
                <div className="card mb-3" /* style={{ width: "40rem" }} */>
                  <Image
                    className="card-img-top"
                    width={400}
                    height={150}
                    src="https://res.cloudinary.com/antoapex19/image/upload/v1663555285/A-Project/pexels-steve-johnson-1509534_auueyi.jpg"
                    alt="Card client"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      Client: {item.name}
                    </h5>
                    <div className="card-text text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setInfoModal(true), setItemMT(item._id);
                        }}
                        className="btn btn-primary btn-small"
                      >
                        See more
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        /*  onClick={() => setInfoModal(true)} */
                        className="btn btn-warning btn-small"
                      >
                        Update information
                      </button>
                      &nbsp;
                      <button
                        type="button"
                             onClick={() => deleteClient(true)} 
                        className="btn btn-danger btn-small"
                      >
                        Delete Client
                      </button>
                      <ClientInfo
                        show={infoModal}
                        onHide={() => {
                          setInfoModal(false);
                        }}
                        item={itemMT}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default withAuth(Clients);
