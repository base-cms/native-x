import React, { Fragment } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Head from 'next/head';

import Title from '../components/Title';
import StoryList from '../components/StoryList';
import { AccountConsumer } from '../providers/AccountProvider';
import { GTAGTracker } from '../lib/gtag';

export default () => {
  const tracker = new GTAGTracker({
    page_path: '/',
    page_title: 'Home',
  });
  return (
    <Container fluid>
      <Title value="Home" />
      {tracker.pageview()}
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
};
