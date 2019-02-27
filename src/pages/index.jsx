import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Head from 'next/head';

import Title from '../components/Title';
import StoryList from '../components/StoryList';
import { AccountConsumer } from '../providers/AccountProvider';
import GTM from '../lib/gtm';
import withGTMConsumer from '../hoc/withGTMConsumer';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    const { gtm } = props;
    this.tracker = gtm.createTracker({
      page_path: '/',
      page_title: 'Home',
    });
  }

  componentDidMount() {
    this.tracker.pageLoad();
  }

  render() {
    return (
      <Container fluid>
        <Title value="Home" />
        <Row className="my-3">
          <Col className="mx-5">
            <AccountConsumer>
              {({ account }) => (
                <Fragment>
                  <h1 className="mb-0">
                    {account.name}
                  </h1>
                  {account.settings.siteVerificationMeta.length > 0 && (
                    <Head>
                      <meta name="google-site-verification" content={account.settings.siteVerificationMeta} />
                    </Head>
                  )}
                </Fragment>
              )}
            </AccountConsumer>
            <hr className="mb-4" />
            <StoryList first={10} />
          </Col>
        </Row>
      </Container>
    );
  }
}

IndexPage.propTypes = {
  gtm: PropTypes.instanceOf(GTM).isRequired,
};

export default withGTMConsumer(IndexPage);
