import { css } from "@emotion/react";
import Layout from "@components/layouts";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import dayjs from "dayjs";
import Link from "next/link";

import { GetStaticProps } from "next";
import { dbConnect, Notice } from "../../pages/api";
import convert from "xml-js";

function Index({ item }: any) {
  const [showGenre, setShowGenre] = useState([]);
  const [showTitle, setShowTitle] = useState("뮤지컬");

  let InfoData = useCallback(
    (i: number, title: string) => {
      setShowGenre(item && JSON.parse(item[i]).elements[0].elements);
      setShowTitle(title);
    },
    [item]
  );

  console.log("showGenre", showGenre);

  return (
    <Layout>
      <div
        css={css`
          overflow: hidden;
          position: relative;
          height: 400px;
          background: url(/images/bg_tour1.jpg) no-repeat left top;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 55px;
            left: 50%;
            transform: translatex(-50%);
            h2,
            p {
              font-size: 48px;
              color: #fff;

              text-align: center;
            }
            .txt1 {
              position: relative;
              font-weight: bold;

              margin-bottom: 30px;
            }
            .txt2 {
              text-align: center;
              font-size: 20px;
            }
            .txt3 {
              margin-top: 30px;
              font-size: 12px;
            }
          `}
        >
          <h2>Seoul Culture Chart</h2>
          <p className="txt1">for you</p>
          <p className="txt2">
            컬쳐플레이스 회원들을 위해 매주 집계되는
            <br /> 각 분야의 예매별 순위 및 상세 정보를 제공합니다.
          </p>
          <p className="txt3">
            출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
          </p>
        </div>
      </div>
      {/* <div>
        컬쳐플레이스 회원분들을 위해, 현재 가장 인기있는
        <br /> 연극, 뮤지컬, 음악, 전시회에 대한 정보를 알려드립니다.
        <br />
        출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr) <br />
        최종집계 YYYY.MM.DD <br />
        집계대상 : 모든 공연 데이터 전송기관 <br />
        집계 데이터는 공연예술통합전산망 연계기관의 티켓판매시스템에서 발권된
        분량을 기준으로 제공함으로 해당 공연의 전체 관객 수와 차이가 있을 수
        있습니다.
        <ul
          css={css`
            display: flex;
            li {
              margin-right: 30px;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
          `}
        >
          <li onClick={() => InfoData(0, "연극")}>연극</li>
          <li onClick={() => InfoData(1, "뮤지컬")}>뮤지컬</li>
          <li onClick={() => InfoData(2, "음악(클래식)")}>음악(클래식)</li>
          <li onClick={() => InfoData(3, "음악(국악)")}>음악(국악)</li>
          <li onClick={() => InfoData(4, "음악(복합)")}>음악(복합)</li>
        </ul>
      </div> */}
      <div
        css={css`
          width: 980px;
          margin: 50px auto;
          .tit-heading-wrap {
            position: relative;
            height: 60px;
            margin-top: 30px;
            border-bottom: 3px solid #241d1e;
            h3 {
              display: inline-block;
              position: relative;
              height: inherit;
              margin: 0;
              background-image: none;
              color: #222;
              font-weight: 500;
              font-size: 36px;
              text-align: left;
              vertical-align: middle;
            }
            .submenu {
              position: absolute;
              top: 18px;
              right: 0;
              ul {
                overflow: hidden;
                li {
                  float: left;
                  margin-left: 15px;
                  &.on > a,
                  &:hover,
                  &:focus {
                    background: url(https://img.cgv.co.kr/r2014/images/common/ico/ico_arrow07.png)
                      no-repeat 0 3px;
                    color: #fb4357;
                  }
                  a {
                    display: inline-block;
                    padding-left: 13px;
                    font-weight: 500;
                    font-size: 14px;
                  }
                  &:first-of-type {
                    margin-left: 0;
                  }
                }
              }
            }
          }
          ol {
            overflow: hidden;
            width: 100%;
            padding-top: 30px;
          }
          ol > li {
            float: left;
            width: 197px;
            margin-left: 64px;
            padding-bottom: 70px;
            &:nth-of-type(1) {
              margin-left: 0;
            }
          }
          [class|="sect"][class*="chart"] .box-image {
            position: relative;
            width: 197px;
            min-height: 272px;
            margin-bottom: 10px;
          }

          .rank {
            display: block;
            height: 28px;
            margin-bottom: 4px;
            /* border: 6px solid #000000; */
            background: #333333;
            color: #ffffff;
            font-size: 19px;
            text-align: center;
            line-height: 28px;
          }

          ol li:nth-of-type(4n + 1) {
            margin-left: 0;
          }
          ol li:nth-of-type(1) .rank,
          ol li:nth-of-type(2) .rank,
          ol li:nth-of-type(3) .rank {
            background: #fb4357;
          }
          .box-image a {
            display: block;
          }
          .thumb-image {
            display: block;
            position: relative;
          }
          [class|="sect"][class*="chart"] .thumb-image > img {
            width: 100%;
            height: 260px;
          }
          .wrap-movie-chart .box-contents {
            height: 93px;
          }
          [class|="sect"][class*="chart"] > h4 + ol > li:first-of-type .title,
          [class|="sect"][class*="chart"] > h3 + ol > li:first-of-type .title {
            width: 90%;
          }
          [class|="sect"][class*="chart"] .title {
            font-size: 15px;
          }
          .title {
            display: block;
            color: #333333;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          [class|="sect"][class*="chart"] .txt-info {
            margin-top: 3px;
            height: 13px;
            color: #666666;
            font-weight: 500;
            white-space: nowrap;
          }
          .txt-info > strong {
            display: block;
            font-size: 11px;
          }
          .txt3 {
            display: flex;
            span {
              display: inline-block;
            }
          }
        `}
      >
        <div className="tit-heading-wrap">
          <h3>{showTitle}박스오피스</h3>
          <div className="submenu">
            <ul>
              <li onClick={() => InfoData(1, "뮤지컬")}>뮤지컬</li>
              <li className="on" onClick={() => InfoData(0, "연극")}>
                연극
              </li>
              <li onClick={() => InfoData(4, "음악(복합)")}>음악(복합)</li>
              <li onClick={() => InfoData(2, "음악(클래식)")}>음악(클래식)</li>
              <li onClick={() => InfoData(3, "음악(국악)")}>음악(국악)</li>
            </ul>
          </div>
        </div>
        <p
          className="txt3"
          css={css`
            margin-top: 10px;
          `}
        >
          <span>· 집계기간 : 최종집계 {dayjs().format("YYYYMMDD")}</span>{" "}
          <span
            css={css`
              margin-left: auto;
            `}
          >
            · 집계대상 : 모든 공연 데이터 전송기관
          </span>
        </p>
        <div className="sect-movie-chart">
          <ol>
            {showGenre.length === 0 ? (
              <div>로딩중</div>
            ) : (
              showGenre?.map(
                (
                  el: {
                    elements: {
                      elements: {
                        text: React.ReactChild;
                      }[];
                    }[];
                  },
                  i: React.Key
                ) => (
                  <li key={i}>
                    <div className="box-image">
                      <strong className="rank">
                        No.{el.elements[6].elements[0].text}
                      </strong>
                      <Link
                        href={`/info/${el.elements[9].elements[0].text}?title=${el.elements[5].elements[0].text}`}
                      >
                        <a>
                          <span className="thumb-image">
                            <img
                              src={`https://kopis.or.kr/${el.elements[8].elements[0].text}`}
                              alt={el.elements[5].elements[0].text + "포스터"}
                            />
                          </span>
                        </a>
                      </Link>
                    </div>

                    <div className="box-contents">
                      <Link href={`/info/${el.elements[9].elements[0].text}`}>
                        <a>
                          <strong className="title">
                            {el.elements[5].elements[0].text}
                          </strong>
                        </a>
                      </Link>
                      <span className="txt-info">
                        <strong>{el.elements[2].elements[0].text}</strong>
                      </span>
                      <span className="txt-info">
                        <strong>{el.elements[4].elements[0].text}</strong>
                      </span>
                    </div>
                  </li>
                )
              )
            )}
          </ol>
          <div>
            <p className="txt3">
              출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
              <br />
              · 집계기간 : 최종집계 YYYY.MM.DD / · 집계대상 : 모든 공연 데이터
              전송기관
              <br />
              집계 데이터는 공연예술통합전산망 연계기관의 티켓판매시스템에서
              <br /> 발권된 분량을 기준으로 제공함으로 해당 공연의 전체 관객
              수와 차이가 있을 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async ctx => {
  const servicekey = "0b6e49379ade4cf98c956ca55d40b5a4";
  const today = dayjs().format("YYYYMMDD");
  const info_url = (code: string) =>
    `http://kopis.or.kr/openApi/restful/boxoffice?service=${servicekey}&ststype=week&date=${today}&catecode=${code}&area=11`;

  const getInfoData = async () => {
    const axiosgetData = ["AAAA", "AAAB", "CCCA", "CCCC", "EEEA"];

    try {
      const getData = await Promise.all(
        axiosgetData.map(el => axios.get(info_url(el)))
      );
      return getData;
    } catch (e) {
      console.log(e);
    }
  };

  const result = await getInfoData().then(async getData => {
    const sendData = getData?.map(el => convert.xml2json(el.data));
    return sendData;
  });

  return {
    props: {
      item: result
    },
    revalidate: 60 * 60 * 24 //하루 지나면 재검증
  };
};
