import React from "react";

import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import {Router} from '../routes';
function RequestRow(props) {
  const { Row, Cell } = Table;
  const { ID, request, approversCount } = props;
  const readyToFinalize = request.approvalCount > (approversCount / 2);
  const onApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign=Campaign(props.address);
    await campaign.methods.approveRequest(ID).send({
        from: accounts[0]
    });
    Router.replaceRoute(`/campaigns/${props.address}/request`);
  };
  const onFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign=Campaign(props.address);
    await campaign.methods.finalizeRequest(ID).send({
        from: accounts[0]
    });
    Router.replaceRoute(`/campaigns/${props.address}/request`);
}

  return (
    <Row disabled={request.complete} positive={readyToFinalize&&!request.complete}>
      <Cell>{ID}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>{
          request.complete ?null:(
        <Button color="green" basic onClick={onApprove}>
          Approve
        </Button>)
        }
      </Cell>
      <Cell>
        {
           request.complete ?null:(
        <Button color="red" basic onClick={onFinalize}>
          Finalize
        </Button>)}
      </Cell>
    </Row>
  );
}

export default RequestRow;
