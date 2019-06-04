import * as React from 'react';
import { Layout, BoxMain, ContactLayout, Script } from 'ui/index';

class Contact extends React.PureComponent {

  componentDidMount () {
    const script = document.createElement("noscript");

    script.appendChild(<div><img src="https://mc.yandex.ru/watch/53919715" style={{position:'absolute', left:'-9999px'}} alt="" /></div> as any);

    document.body.appendChild(script);
}

  render() {
    return (
      <Layout>
        <BoxMain>
          <ContactLayout />
        </BoxMain>
        <Script>
          {
            () => {
              var scr = document.createElement('script'); scr.type = 'text/javascript'; scr.async = true; scr.charset = 'UTF-8';
              scr.src = '//app.mluvii.com/widget/OOWidget.js';
              (scr as any).$owidgetOnLoad = function (owidget) {
                if (!owidget.isSupported) { return; }
                owidget.init("295b1064-cf5b-4a5d-9e05-e7a74f86ae5e", null);
                owidget.connectToServer();
              };
              var ffs = document.getElementsByTagName('script')[0]; ffs.parentNode.insertBefore(scr, ffs);
            }
          }
        </Script>
        <Script>
          {
            () => {
              var ym;
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*(new Date() as any);k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(53919715, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true
              });
            }
          }
        </Script>
      </Layout>
    );
  }
}

export default Contact;
