import { useContext,  useState } from "react";
import NewClientButton from "../../../components/ModalComponents/Client/newClient";
import ClientInfo from "../../../components/ModalComponents/Client/getClientInfo";
import DeleteClient from "../../../components/ModalComponents/Client/Options/DeleteClient";
import roleAccess from "../../Role/Manager/roleAccess";
import { AuthContext } from "../../../context";
import { Table } from "react-bootstrap";

function Index() {
  const state = useContext(AuthContext);
  const [infoModal, setInfoModal] = useState(false);
  const [itemMT, setItemMT] = useState();
  const [itemsClients] = state.User.itemsClients;

  return (
    <>
      <br />
      <div className="content-wrap">
        <NewClientButton />
        <br />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Client name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {itemsClients?.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <DeleteClient item={item} clientStatus={true} />
                    &nbsp;
                    <button
                      type="button"
                      onClick={() => {
                        setInfoModal(true), setItemMT(item._id);
                      }}
                      className="btn btn-primary btn-small"
                    >
                      See more
                    </button>
                    {/* &nbsp;
                        <button
                          type="button"
                          className="btn btn-warning btn-small"
                        >
                          Update information
                        </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <ClientInfo
          show={infoModal}
          onHide={() => {
            setInfoModal(false);
          }}
          item={itemMT}
        />
      </div>
    </>
  );
}

export default roleAccess(Index);
