import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link, Text } from "../routes";
function CampaignIndex(props) {
  console.log("campaigns", props.campaigns);

  const renderCampaigns = () => {
    const item = props.campaigns.map((address) => {
      return {
        header: address,
        description: (<Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>),
        fluid: true,
      };
    });
    return <Card.Group items={item} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary={true}
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
}

//uses server side rendering to call the campaign contracts (so good for slow devices)
CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
