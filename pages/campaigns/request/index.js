import React from "react";
import Layout from "../../../components/Layout";
import { Button,Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

function RequestIndex(props) {
    const {Header,Row,HeaderCell,Body,Cell} = Table;

   const renderRow=(props)=>{
    return props.request.map((request,index)=>{
        return <RequestRow 
        request={request}
        key = {index}
        ID={index}
        address={props.address}
        approversCount={props.approversCount}  />
    });
   }
  return (
    <Layout>
        <Link route={`/campaigns/${props.address}/request/new`}>
        <a>
          <Button primary floated={"right"}>Add Request</Button>
        </a>
      </Link>
      <h3>Request Index</h3>
      
        <Table>
            <Header>
                <Row>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Recipient</HeaderCell>
                    <HeaderCell>Approval Count</HeaderCell>
                    <HeaderCell>Approve</HeaderCell>
                    <HeaderCell>Finalize</HeaderCell>
                </Row>
            </Header>
            <Body>
                {renderRow(props)}
            </Body>
        </Table>
        <div>Found {props.requestCount} requests</div>
    </Layout>
  );
}

RequestIndex.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const request = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  return { address ,request, requestCount,approversCount };
};
export default RequestIndex;
