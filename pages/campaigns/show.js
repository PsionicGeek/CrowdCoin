import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Card, Grid, Button } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

CampaignShow.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();
  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    address: address,
  };
};

function CampaignShow(props) {
  const renderCards = () => {
    const {
      balance,
      minimumContribution,
      manager,
      requestCount,
      approversCount,
    } = props;
    const items = [
      {
        header: manager,
        description:
          "The manager created this campaign and can create requests to withdraw money.",
        meta: "Address of Manager",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        description:
          "Minimum contribution required to contribute to this campaign",
        meta: "Minimum Contribution (wei)",
      },
      {
        header: requestCount,
        description: "A request to withdraw money from the contract.",
        meta: "Number of Requests",
      },
      {
        header: approversCount,
        description: "People who have already donated to this campaign.",
        meta: "Number of Approvers",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description: "The balance of this campaign.",
        meta: "Campaign Balance (ether)",
      },
    ];
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/request`}>
              <a>
                <Button primary>View Request</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export default CampaignShow;
