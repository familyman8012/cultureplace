import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { MutableRefObject, useCallback, useEffect } from "react";
import { searchStore } from "@src/mobx/store";

const SearchWrap = styled.div`
  position: relative;
  margin-bottom: 30px;
  z-index: 70;
  background: #f1f1f1;
  label,
  input[name="searchInput"],
  button {
    display: inline-block;

    color: #000;
    font-size: 14px;
    font-weight: normal;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 4px;
    text-align: center;
    box-sizing: border-box;
    padding: 7px 15px;
    cursor: pointer;
  }
  input[type="checkbox"] {
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  input[type="checkbox"]:checked + label {
    color: #ff005a;
    border: 1px solid #ff005a;
  }
  button {
    color: #fff;
    border: none;
    font-weight: normal;
  }
  .onSubmit {
    background: #4497ea;
  }
  .onReset {
    background: #000;
  }
`;

const SearchInputWrap = styled.div`
  padding: 10px 9px 15px;
  input[name="searchInput"] {
    width: 300px;
    text-align: left;
  }
`;

const FilterFindWrap = styled.div`
  > li {
    display: flex;
    padding: 8px 10px;
  }
`;

const filterFindList = [
  {
    title: "장소",
    option: ["강남", "신촌", "홍대", "이태원", "대학로", "종로", "온라인"],
    optionName: [""]
  },
  {
    title: "요일",
    option: [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일"
    ],
    optionName: [""]
  },
  {
    title: "관심분야",
    option: [
      "healing",
      "theater",
      "art",
      "music",
      "food",
      "movie",
      "fashion",
      "wisdom"
    ],
    optionName: [
      "힐링산책",
      "공연",
      "미술",
      "뮤직",
      "미식",
      "사진, 영상",
      "패션",
      "지식"
    ]
  }
];

function Index({ pageNum, refetch }: { pageNum: number; refetch: () => void }) {
  const handlerReset = useCallback(() => {
    searchStore.onInit(filterFindList);
    searchStore.onReset(pageNum);
    refetch();
  }, [pageNum, refetch]);

  const handlerApply = useCallback(() => {
    searchStore.onApply(pageNum);
    refetch();
  }, [pageNum, refetch]);

  useEffect(() => {
    searchStore.onInit(filterFindList);
    return () => {
      handlerReset();
    };
  }, [handlerReset]);

  return (
    <SearchWrap>
      <FilterFindWrap>
        {filterFindList.map((item, i: number) => {
          return (
            <li key={i}>
              {item.option.map((el, j) => (
                <div key={el}>
                  <input
                    type="checkbox"
                    id={el}
                    value={el}
                    checked={
                      searchStore.filterFind.every(
                        (el: string[]) => el.length === 0
                      )
                        ? false
                        : searchStore.filterFind[i].includes(el)
                    }
                    onChange={e =>
                      searchStore.onCheckboxChange(i, String(e.target.value))
                    }
                  />
                  {i !== 2 ? (
                    <label htmlFor={el}>{el}</label>
                  ) : (
                    <label htmlFor={el}>{item.optionName[j]}</label>
                  )}
                </div>
              ))}
            </li>
          );
        })}
      </FilterFindWrap>
      <SearchInputWrap>
        <input
          type="text"
          name="searchInput"
          placeholder="함께 하고 싶은 모임명,  팀리더를 검색해보세요."
          value={searchStore.searchInput}
          onChange={e => searchStore.onsearchInput(e)}
        />
        <button className="onSubmit" onClick={handlerApply}>
          적용
        </button>
        <button className="onReset" onClick={handlerReset}>
          검색조건초기화
        </button>
      </SearchInputWrap>
    </SearchWrap>
  );
}

export default observer(Index);
