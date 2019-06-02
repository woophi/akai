import * as React from 'react';
import { Layout, BoxMain, AboutLayout } from 'ui/index';
import { getBio } from 'core/operations';
import * as models from 'core/models';

type Props = {
  data: models.BioModel
}
class About extends React.PureComponent<Props> {
  static async getInitialProps() {
    // TODO: get from set language
    const data = await getBio('ru');

    return { data };
  }

  render() {
    const { data } = this.props;
    return (
      <Layout>
        <BoxMain>
          <AboutLayout content={data.content} photoUrl={data.photo} />
        </BoxMain>
      </Layout>
    );
  }
}

export default About;
