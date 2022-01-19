import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { MutableRefObject, useEffect } from "react";
import { searchStore } from "@src/mobx/store";

const SearchWrap = styled.div`
  display: flex;
  position: relative;
  z-index: 70;
`;

const SearchInputWrap = styled.div`
  overflow: hidden;
  display: flex;
  width: 250px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 20px;
  input {
    width: 80%;
    line-height: 32px;
    border: none;
  }
  button {
    width: 20%;
    color: #fff;
    line-height: 32px;
    background: #ccc;
  }
`;

const FilterFindWrap = styled.ul`
  display: flex;
  > li {
    position: relative;
    border-radius: 3px;
    background-color: #7d7d7d;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    padding: 8px 10px;
    margin-right: 8px;
    height: 30px;
    cursor: pointer;
    color: #ffffff;
  }
`;

const LayerList = styled.ul<{ active: boolean }>`
  display: ${({ active }) => (active ? "block" : "none")};
  position: absolute;
  top: 42px;
  border-radius: 3px;
  box-shadow: rgb(0 0 0 / 10%) 1px 1px 10px 0px;
  background-color: rgb(255, 255, 255);
  min-width: 300px;
  padding: 16px 16px 6px;
  li {
    display: flex;
    align-items: center;
    color: #000;
    label {
      margin-left: 10px;
    }
  }
`;

const filterFindList = [
  { title: "장소", option: ["강남", "안국", "대학로", "온라인"] },
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
    ]
  },
  {
    title: "관심분야",
    option: [
      "movie",
      "music",
      "소극장",
      "서울걷기",
      "성장하기",
      "심리매력",
      "직접해보기",
      "이벤트"
    ]
  }
];

function Index({
  pageNum,
  refetch
}: {
  pageNum: MutableRefObject<number>;
  refetch: () => void;
}) {
  useEffect(() => {
    searchStore.onInit(filterFindList);
  }, []);

  const handlerApply = () => {
    searchStore.onApply(pageNum);
    refetch();
  };
  const handlerReset = () => {
    searchStore.onInit(filterFindList);
    searchStore.onReset(pageNum);
    refetch();
  };

  return (
    <SearchWrap>
      <SearchInputWrap>
        <input
          type="text"
          name="searchInput"
          value={searchStore.searchInput}
          onChange={e => searchStore.onsearchInput(e)}
        />
        <button onClick={handlerApply}>검색</button>
      </SearchInputWrap>
      <FilterFindWrap>
        {filterFindList.map((item, i: number) => {
          return (
            <li key={i}>
              <button onClick={() => searchStore.onViewSel(i)}>
                {item.title}
              </button>
              <LayerList active={i === searchStore.viewSelList ? true : false}>
                {item.option.map(el => (
                  <li key={el}>
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
                    <label htmlFor={el}>{el}</label>
                  </li>
                ))}
                <button onClick={handlerApply}>적용</button>
              </LayerList>
            </li>
          );
        })}
        <button onClick={handlerReset}>검색조건초기화</button>
      </FilterFindWrap>
    </SearchWrap>
  );
}

export default observer(Index);
