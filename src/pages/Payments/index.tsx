import { BSCol, BSGrid, Card, Container, Tab, Tabs } from '@appquality/appquality-design-system';
import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { TabFailedPayments } from 'src/pages/Payments/TabFailedPayments';
import { TabPendingPayments } from 'src/pages/Payments/TabPendingPayments';
import styled from 'styled-components';

const StyledTabs = styled.div`
  .cell {
    color: ${(p) => p.theme.variants.primary};
    font-weight: ${(p) => p.theme.typography.fontWeight.medium};
  }
`;

export default function AdminPayments() {
  const [activeTab, setActiveTab] = useState("pending");
  const { total } = useSelector(
    (state: GeneralState) => state.adminPayments.failedRequests,
    shallowEqual
  );

  return (
    <Container>
      <BSGrid>
        <BSCol size="col-lg-9 ">
          <Card className="aq-mb-3" bodyClass="">
            <StyledTabs>
              <Tabs
                active={activeTab}
                setActive={setActiveTab}
                className="aq-text-primaryVariant"
              >
                <Tab
                  id="pending"
                  title={<span className="aq-mx-3-lg">Pending</span>}
                >
                  <TabPendingPayments />
                </Tab>
                <Tab
                  id="failed"
                  title={
                    <span className="aq-mx-3-lg">
                      Failed
                      {total > 0 ? ` (${total})` : null}
                    </span>
                  }
                >
                  <TabFailedPayments />
                </Tab>
              </Tabs>
            </StyledTabs>
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          {/*<Card>*/}
          {/*  <div>Filters and Status</div>*/}
          {/*</Card>*/}
        </BSCol>
      </BSGrid>
    </Container>
  );
}
