import * as React from 'react';
import { Layout, BoxMain, AboutLayout } from 'ui/index';
import { getBio } from 'core/operations';
import * as models from 'core/models';
import { i18next } from 'server/lib/i18n';

type LocalState = {
  data: models.BioModel
}
class About extends React.Component<LocalState, LocalState> {
  static async getInitialProps({ req }) {
    try {
      const currentLanguage = req === null ? i18next.language : req.language;
      const data = await getBio(currentLanguage);
      return { data };
    } catch (_) {
      return { data: {} }
    }
  }

  // componentDidMount() {

  // }

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
