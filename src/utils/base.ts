export const baseConfig: InjectType[] = [
  {
    id: '11111',
    url: '17u.cn',
    color: '#3488ff',
    title: 'APP配置',
    cookies: [
      `fastbookdate=;`,
      `gnjpapphead={%22Content-Type%22:%22application/json%22%2C%22tcplat%22:433%2C%22tcuserid%22:%22693272ee569ee938daa194637b4c9e9d%22%2C%22tcversion%22:%221.1.1%22%2C%22tcsessionid%22:%221b1c84e0-bd84-11ed-ab01-b9568d5f942e%22%2C%22tctracerid%22:%221b1c84e0-bd84-11ed-ab01-b9568d5f942e%22%2C%22tcsectoken%22:%22693272ee569ee938daa194637b4c9e9d%22%2C%22tcdeviceid%22:%2269A2BFC4-25B3-4810-BC93-3F7E7145D494%22%2C%22tcunionid%22:%22ohmdTt2a41oo8-PEcbFEkY5oRIAg%22%2C%22ext%22:%22{%5C%22platform%5C%22:%5C%22ios%5C%22%2C%5C%22appversion%5C%22:%5C%2210.5.3%5C%22%2C%5C%22sysversion%5C%22:%5C%2216.1.1%5C%22}%22};`,
      `saviorInfo={"platid":"10114","chid":"tciphone","tc_deviceid":"69A2BFC4-25B3-4810-BC93-3F7E7145D494","ecrd":"","v":"10.5.3","el_deviceid":"69A2BFC4-25B3-4810-BC93-3F7E7145D494","refid":"5866741","memberid":"I0_5cf79111acdca2e3623ebbeaed70d07e"};`,
      ` __tctmd=0.1; `,
      ` __tctmc=0.248135489;flightRefId=36849990;   __tctma=217272534.1670292153491328.1670292153261.1677823710703.1678183743908.30; _fid=lcj0c30a-d31d-4e0a-8c33-2bd7c94a82ae; ecid=99e060fe61a898c7e97237c69144153bd4d510e4316697f1200f8e332c5e6df8ae9ac2a46a96806a9bfb1f0c085515aca0bd552b464ff38c95848921c58c831e`
    ],
    scripts: [
      `window._tc_bridge_user.user_login = (p) => {
        p.callback({
            CBData: JSON.stringify({
                "status":"0",
                "memberInfo":{
                    "email": "847807673@qq.com",
                    "headImg": "http://pic5.40017.cn/02/000/01/60/rBANDFkZYVmAOdgRAAQAAIp9Rrk459.jpg",
                    "loginName": "18962159529",
                    "memberId": "0f585ab28c7c7b976a2ae8c831f07cf9",
                    "mobile": "18962159529",
                    "sex": "0",
                    "trueName": "测试账号",
                    "userName": "测试帐号莫update哈哈哈d "
                }
            }),
        });
      }`,
      `window._tc_bridge_user.get_device_info = (p) => {
        const CBData = {
          memberInfo: {
            memberId: "60ef95c70548008ae4dd70713ea278cb",
            unionId: "ohmdTt2a41oo8-PEcbFEkY5oRIAg",
            securityToken:
              "13-icJjai7XH1LAiH9PR39SHxPfXSVRLBNQJxtzhZCAsz8GvJPkYxUnojOb285pcB7MpAqRE9cIURZvl_Vdp39k24AAlXBnF-F9i9Uu4Z2GOvXT-Y_TDl-bhod1vzvolJ3",
          },
          deviceInfo: {
            "appVersionNumber": "10.6.2",
            "deviceId": "F1271D22-A3E3-4288-AFD1-C30490F55D36",
            "systemTimeZone": "Asia/Shanghai (GMT+8) offset 28800",
            "appAMT": "",
            "isPreInstall": "1",
            "systemDate": "2023-07-04",
            "freeRAM": "684096",
            "systemTime": "16:15:38",
            "screenSize": "1170x2532",
            "imei": "355890043919336",
            "navBarHeightPx": "104",
            "pushInfo": "3ee8224c0bf46ab04de69e5fc31d30859505cd03",
            "refid": "5866720",
            "abValues": {
                "testa":"A",
                "testB":"Z"
            },
            "viewMode": "1"
          },
          locationInfo: {},
        };
        p.callback({
          CBData: JSON.stringify(CBData),
        });
      };`
    ]
  },
  {
    id: '22222',
    url: '17u.cn',
    color: '#43B883',
    title: '后处理配置',
    cookies: [
      `CooperateTcWxUser=CooperateUserId=o498X0VEozdpYhTII3krJYqjlRY4&openid=o498X0VEozdpYhTII3krJYqjlRY4&MemberId=3hrsCMIOp76e0ICXfcsphQ%3d%3d&token=ZfOeS2YX9IStsHx-3-C4u7du2kqZtncuUkzYSEJcCdWPpJg0E7b7_VeI00GfR77UFOoPOAe7lFAhdaJLYQH3CUAvocBzLUoRb-_aKtV-circglhwf0jLz-nk2aMyLZhnmwUcY1AvGmu1ojM7ubzfIh4RiwB9_nqasSuzx73R2EEEA17IHMlxZpqUsQHmnrvBZMZqRWo9EFaBm6K-t63F0Q**4641&MemberSysId=33&Key=NCQ9cJRYPmnmrhNwFEOHFZ%2f%2f8Xa1IIo09OI8YR2zEm5Nj1duLnPD2g%3d%3d;`,
      `WxUser=openid=o498X0VEozdpYhTII3krJYqjlRY4&token=ZfOeS2YX9IStsHx-3-C4u7du2kqZtncuUkzYSEJcCdWPpJg0E7b7_VeI00GfR77UFOoPOAe7lFAhdaJLYQH3CUAvocBzLUoRb-_aKtV-circglhwf0jLz-nk2aMyLZhnmwUcY1AvGmu1ojM7ubzfIh4RiwB9_nqasSuzx73R2EEEA17IHMlxZpqUsQHmnrvBZMZqRWo9EFaBm6K-t63F0Q**4641&refreshtoken=24_0ulHLVLX0jJLbjFmarbZLO7AbcxENph8hfDPm6zPu41wez1l5FRfXpCxDGVBrCsLdZnPwjJoT_c6kO10wU-FSnDjEREc5Wb-yAfhJD-kex8&userid=3hrsCMIOp76e0ICXfcsphQ==&unionid=ohmdTt2a41oo8-PEcbFEkY5oRIAg&wxtcinfo=S2rQcjjs24Gvx6HJqQtXMNwzvTQEb5ZeICFn19RW8GBiUmwbZYIX3NRbzwDSN8ypNj2WDsKCYUapAVQ32tWpNvahyONllA7lBEWX4NqVwmkk530eO1Vg4AiiaKMi%252fFgA;`
    ],
    scripts: []
  }
];
