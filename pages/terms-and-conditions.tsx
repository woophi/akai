import { Box } from '@material-ui/core';
import { getLanguage } from 'core/lib/lang';
import { getTermsAndConditions } from 'core/operations';
import { GetServerSideProps } from 'next';
import { BoxGrid } from 'ui/atoms';
import { Layout } from 'ui/molecules';

const TC = ({ tandc }: { tandc: string }) => {
  return (
    <Layout title="Terms and conditions">
      <BoxGrid>
        <Box padding=".5rem" dangerouslySetInnerHTML={{ __html: tandc }} />
      </BoxGrid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let tandc = null;
  try {
    const lang = getLanguage(req);
    tandc = await getTermsAndConditions(lang);
  } catch (error) {
    console.error(error);
  }

  if (!tandc) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tandc },
  };
};

export default TC;
