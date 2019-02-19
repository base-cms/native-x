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
import { GTMTracker } from '../lib/gtm';

class IndexPage extends React.Component {
  componentDidMount() {
    const { accountKey } = this.props;
    const tracker = new GTMTracker(accountKey, {
      page_path: '/',
      page_title: 'Home',
    });
    tracker.pageview();
  }

  static async getInitialProps({ account }) {
    return { accountKey: account.key };
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
  accountKey: PropTypes.string.isRequired,
};

export default IndexPage;
