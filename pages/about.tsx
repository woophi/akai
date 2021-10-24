import * as React from 'react';
import { Layout, BoxMain, AboutLayout } from 'ui/index';
import { getBio } from 'core/operations';
import * as models from 'core/models';
import { i18next } from 'next-i18next';
import { getCookie } from 'core/cookieManager';

type LocalState = {
  data: models.BioModel
}
class About extends React.Component<unknown, LocalState> {
  state: LocalState = {
    data: {
      content: '',
      photo: ''
    }
  }

  async componentDidMount() {
    try {
      const currentLanguage = getCookie('akai_lng') || i18next.language;
      const data = await getBio(currentLanguage);
      this.setState({ data });
    } catch (e) {
      console.error('Error in about fetch', e);
    }
  }

  render() {
    const { data } = this.state;
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
