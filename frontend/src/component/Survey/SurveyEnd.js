import { Link } from "react-router-dom";
function Detail_Result({ surveyNum }) {
  return (
    <>
      <div className="survey">
        <div className="survey_main">
          <div className="survey_main_question">
            <span>질문 #{surveyNum} (결과 공유)</span>
            <span>이메일 주소를 적어주세요</span>
            <input type="email" placeholder="이메일을 적어주세요" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Detail_Result;
