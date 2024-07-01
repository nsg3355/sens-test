# 개발 환경
node 18

# 사전 준비
SENS API 신청하여 아래 정보가 필요 <br/>
const SERVICE_ID = 'ncp-gov:sms:kr:753483589:total_solution'; // 프로젝트에 할당된 Service ID <br/>
const ACCESS_KEY = 'D958886BC1BB2349BD39'; // 네이버 클라우드 플랫폼에서 발급 받은 Access Key <br/>
const SECRET_KEY = 'AAAECB6767A9224D330F5B3165A90C8810ACF6DC'; // 네이버 클라우드 플랫폼에서 발급 받은 Secret Key <br/>
const SENDER_PHONE = '16616806'; // 등록된 발신자 전화번호 <br/>

# 코드 수정
'your phone number' 부분의 핸드폰 번호를 입력하고 아래 터미널에서 실행

# 터미널
npm install
npm run start