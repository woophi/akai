import { getLanguage } from 'core/lib/lang';
import { ShopOrderModel } from 'core/models';
import { getCustomerOrder } from 'core/operations';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import { OrderLayout } from 'ui/cells/order-layout';
import { BoxGrid, BoxMain, Layout } from 'ui/index';

const CustomerOrder = ({ data }: { data: ShopOrderModel }) => {
  return (
    <Layout>
      <BoxMain>
        <BoxGrid>
          <OrderLayout data={data} />
        </BoxGrid>
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const orderId = String(query.orderId);

  let data = null;
  try {
    const lang = getLanguage(req);
    data = await getCustomerOrder(orderId, lang);
  } catch {}

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

export default CustomerOrder;
