import styled from "@emotion/styled";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Title from "../Title";
import SectionWrap from "../SectionWrap";

interface Idata {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

const data = {
  labels: ["남성", "여성"],
  datasets: [
    {
      label: "# of Votes",
      data: [12.5, 12.5],
      backgroundColor: ["#ff8400", "#ffb700"]
    }
  ]
};

const data2 = {
  labels: ["20대", "30대", "40대", "50대", "60대"],
  datasets: [
    {
      label: "# of Votes",
      data: [5, 5, 5, 5, 5],
      backgroundColor: ["#ff8400", "#ffb700", "#ffd900", "#a3ce50", "#26b995"]
    }
  ]
};

const options = {
  responsive: false,
  //tooltips 사용시
  rotation: 270,
  circumference: 180,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    },
    datalabels: {
      display: true,
      color: "#fff",
      backgroundColor: "#666666",
      formatter(value: number, context: any) {
        return `${context.chart.data.labels[context.dataIndex]} ${Math.round(
          (value / 25) * 100
        )}%`;
      }
    }
  }
};

const InfoMemberChartBox = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 7%);
  border: solid 1px rgba(0, 0, 0, 0.02);
  background-color: var(--white);
  padding: 16px 23px 0px 23px;
  canvas {
    margin: 0 auto 30px;
  }
  background: #fff;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 23px;
`;

const Btn = styled.div`
  height: 30px;
  line-height: 30px;
  margin-right: 4px;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.brand};
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.brand};
  border-radius: 4px;
  &.on {
    color: #fff;
    background: ${({ theme }) => theme.color.brand};
  }
`;

const BtnList = [
  { id: "btn1", title: "성별", selData: data },
  { id: "btn2", title: "연령", selData: data2 }
];

const InfoMemberChart = () => {
  Chart.register(ChartDataLabels);

  const [chart, setChart] = useState({
    data,
    onBtn: "btn1"
  });

  const handleViewChart = (data: Idata, onBtn: string) => {
    setChart({ data: data, onBtn: onBtn });
  };
  return (
    <>
      <SectionWrap>
        <Title>이번 시즌 이 클럽을 신청한 멤버는</Title>
        <InfoMemberChartBox>
          <Doughnut data={chart.data} options={options} />
        </InfoMemberChartBox>
        <BtnBox>
          {BtnList.map(btn => (
            <Btn
              key={btn.id}
              id={btn.id}
              className={chart.onBtn === btn.id ? "on" : ""}
              onClick={() => handleViewChart(btn.selData, btn.id)}
            >
              {btn.title}
            </Btn>
          ))}
        </BtnBox>
      </SectionWrap>
    </>
  );
};

export default InfoMemberChart;
