const axios = require('axios');
const crypto = require('crypto-js');

// 환경 변수 설정
const SERVICE_ID = 'ncp-gov:sms:kr:753483589:total_solution'; // 프로젝트에 할당된 Service ID
const ACCESS_KEY = 'D958886BC1BB2349BD39'; // 네이버 클라우드 플랫폼에서 발급 받은 Access Key
const SECRET_KEY = 'AAAECB6767A9224D330F5B3165A90C8810ACF6DC'; // 네이버 클라우드 플랫폼에서 발급 받은 Secret Key
const SENDER_PHONE = '16616806'; // 등록된 발신자 전화번호
const TIMESTAMP = Date.now().toString(); // 현재 시간

// 시그니처 생성
const makeSignature = () => {
  const space = " ";                // one space
  const newLine = "\n";              // new line
  const method = "POST";             // method
  const url = `/sms/v2/services/${SERVICE_ID}/messages`; // url (include query string)
  const timestamp = TIMESTAMP;           // current timestamp (epoch)
  const accessKey = ACCESS_KEY;
  const secretKey = SECRET_KEY;           // secret key (from portal or Sub Account)

  const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();
  return hash.toString(crypto.enc.Base64);
};

// SMS 전송 함수
const sendSMS = async (recipientPhone, message) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://sens.apigw.gov-ntruss.com/sms/v2/services/${SERVICE_ID}/messages`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': TIMESTAMP,
        'x-ncp-iam-access-key': ACCESS_KEY,
        'x-ncp-apigw-signature-v2': makeSignature(),
      },
      data: {
        type: 'SMS',
        contentType: "COMM",
        countryCode: "82",
        from: SENDER_PHONE,
        content: message,
        messages: [
          {
            to: recipientPhone,
          },
        ],
      },
    });

    console.log('SMS 전송 성공:', response.data);
  } catch (error) {
    console.error('SMS 전송 실패:', error.response ? error.response.data : error.message);
  }
};

// SMS 전송 예제
sendSMS('your phone number', '여기에 메시지를 입력하세요');
