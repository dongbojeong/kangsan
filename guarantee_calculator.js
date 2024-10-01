// 특정 년도의 공휴일을 계산하는 함수 (예: 2024년)
function getHolidays(year) {
    return [
        `${year}-01-01`, // 신정
        `${year}-02-09`, `${year}-02-10`, `${year}-02-11`, // 설날 연휴
        `${year}-03-01`, // 삼일절
        `${year}-05-05`, // 어린이날
        `${year}-06-06`, // 현충일
        `${year}-08-15`, // 광복절
        `${year}-09-15`, `${year}-09-16`, `${year}-09-17`, // 추석 연휴
        `${year}-10-03`, // 개천절
        `${year}-12-25`,  // 성탄절
        `${year}-11-24`   // 예시로 든 일요일
    ];
}

// 날짜 차이를 일수로 계산하는 함수
function calculateDaysBetween(startDate, endDate) {
    const timeDiff = endDate - startDate;
    const dayDiff = timeDiff / (1000 * 3600 * 24); // 밀리초를 일수로 변환
    return Math.round(dayDiff);
}

// 날짜의 요일을 반환하는 함수
function getDayName(date) {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[date.getDay()];
}

// 휴일 여부를 확인하는 함수 (토요일, 일요일 또는 특정 년도의 공휴일 처리)
function isHoliday(date, holidays) {
    const day = date.getDay();
    const formattedDate = date.toISOString().split('T')[0];
    return day === 6 || day === 0 || holidays.includes(formattedDate); // 6 = 토요일, 0 = 일요일
}

// 휴일 다음 날로 만료일을 이동하는 함수
function adjustForHoliday(endDate, holidays) {
    while (isHoliday(endDate, holidays)) {
        endDate.setDate(endDate.getDate() + 1);
    }
    return endDate;
}

// 입찰 보증금 계산기
document.getElementById('bid-calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var bidStartDate = new Date(document.getElementById('bid_start_date').value);
    var bidSubmissionDate = new Date(document.getElementById('bid_submission_date').value);
    var bidType = document.getElementById('bid_type').value;
    var currentYear = bidStartDate.getFullYear();
    var holidays = getHolidays(currentYear);

    var bidPeriod = (bidType === 'construction') ? 90 : 30;
    var bidEndDate = new Date(bidStartDate);
    bidEndDate.setDate(bidEndDate.getDate() + bidPeriod);

    // 만료일이 공휴일이면 다음 영업일로 이동
    bidEndDate = adjustForHoliday(bidEndDate, holidays);

    var bidDays = calculateDaysBetween(bidStartDate, bidEndDate);
    document.getElementById('bid-start-date-result').textContent = bidStartDate.toISOString().split('T')[0];
    document.getElementById('bid-start-day-result').textContent = getDayName(bidStartDate);
    document.getElementById('bid-end-date-result').textContent = bidEndDate.toISOString().split('T')[0];
    document.getElementById('bid-end-day-result').textContent = getDayName(bidEndDate);
    document.getElementById('bid-days-result').textContent = bidDays + "일";
    document.getElementById('bid-result').style.display = 'block';
});

// 계약 보증금 계산기
document.getElementById('contract-calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var contractStartDate = new Date(document.getElementById('contract_start_date').value);
    var contractPeriodDays = parseInt(document.getElementById('contract_period_days').value);
    var currentYear = contractStartDate.getFullYear();
    var holidays = getHolidays(currentYear);

    var contractEndDate = new Date(contractStartDate);
    contractEndDate.setDate(contractEndDate.getDate() + contractPeriodDays);

    // 만료일이 공휴일이면 다음 영업일로 이동
    contractEndDate = adjustForHoliday(contractEndDate, holidays);

    var contractDays = calculateDaysBetween(contractStartDate, contractEndDate);
    document.getElementById('contract-start-date-result').textContent = contractStartDate.toISOString().split('T')[0];
    document.getElementById('contract-start-day-result').textContent = getDayName(contractStartDate);
    document.getElementById('contract-end-date-result').textContent = contractEndDate.toISOString().split('T')[0];
    document.getElementById('contract-end-day-result').textContent = getDayName(contractEndDate);
    document.getElementById('contract-days-result').textContent = contractDays + "일";
    document.getElementById('contract-result').style.display = 'block';
});

// 하자보수보증금 계산기
document.getElementById('defect-calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var acceptanceDate = new Date(document.getElementById('acceptance_date').value);
    var inspectionDate = new Date(document.getElementById('inspection_date').value);
    var defectResponsibilityPeriod = parseInt(document.getElementById('defect_responsibility_period').value);
    var defectStartDate = (acceptanceDate < inspectionDate) ? acceptanceDate : inspectionDate;
    var currentYear = defectStartDate.getFullYear();
    var holidays = getHolidays(currentYear);

    var defectEndDate = new Date(defectStartDate);
    defectEndDate.setDate(defectEndDate.getDate() + defectResponsibilityPeriod);

    // 만료일이 공휴일이면 다음 영업일로 이동
    defectEndDate = adjustForHoliday(defectEndDate, holidays);

    var defectDays = calculateDaysBetween(defectStartDate, defectEndDate);
    document.getElementById('defect-start-date-result').textContent = defectStartDate.toISOString().split('T')[0];
    document.getElementById('defect-start-day-result').textContent = getDayName(defectStartDate);
    document.getElementById('defect-end-date-result').textContent = defectEndDate.toISOString().split('T')[0];
    document.getElementById('defect-end-day-result').textContent = getDayName(defectEndDate);
    document.getElementById('defect-days-result').textContent = defectDays + "일";
    document.getElementById('defect-result').style.display = 'block';
});
